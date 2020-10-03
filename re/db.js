const mongoose = require("mongoose")
const fs = require("fs")

mongoose.connect(process.env.MONGOOSE, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useFindAndModify: false,
        useCreateIndex: true
});

module.exports = {}

const routeFiles = fs.readdirSync(__dirname + '/routes').filter(file => file.endsWith('.js'))
for (const file of routeFiles) {
	const route = require(`./routes/${file}`)
	module.exports[`${file.split(`.`).shift()}`] = route
}

Object.filter = (obj, predicate) => 
  Object.keys(obj)
        .filter( key => predicate(obj[key]) )
        .reduce( (res, key) => (res[key] = obj[key], res), {} );