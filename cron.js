const re = require(`./resources.js`).data
const cronjob = re.vars.cron.schedule("0 0 * * *", () => {
  run()
})
cronjob.start()

const list = ["asteroids"]

const asteroids = () => {
    let locs = re.config.asteroidloc
    //TODO: finish this
}

const run = (limit = list) => {
    if(limit.includes("asteroids")) asteroids()
}

module.exports = {run, list, cronjob}


