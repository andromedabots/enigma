module.exports.run = async (client, message, args) => {
    const re = message.re
    let args2 = args.join(" ").toLowerCase()
    if(!args2) args2 === message.author.euser.location

    let files = await re.vars.fs.readdirSync("/home/andromeda/enigma/maps");
    let file = args2 + ".jpg"
    let names = [], prettynames = []
    files.forEach(x => {
      names.push(x.replace(".jpg", ""))
      prettynames.push(re.fn.capitalizeFirstLetter(x.replace(".jpg", "")))
    })
    if(!files.includes(file)) return message.channel.send("Location not found! Valid locations are " + prettynames.join(", "))

    message.channel.send('', {
      embed: {
        title: re.fn.capitalizeFirstLetter(args[0]) + " Map",
        color: re.config.color,
        image: {
             url: 'attachment://' + file
        },
        footer: {text: `You are currently in ${re.func.capitalizeFirstLetter(message.author.euser.location)}`}
       },
       files: [{
          attachment: '/home/andromeda/enigma/maps/' + file,
          name: file
       }]
    })
    

};
  
  module.exports.help = {
    name:`${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`,
    description:`Get a map from the Enigma`,
    syntax:`${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`,
    alias:["maps", "location"],
    module:`${__dirname.split(`/`).pop()}`,
    access: {level: 0, mm: null}
  }
  