module.exports.run = async (client, message, args) => {
    const re = message.re
    let s = []
    let loc = await re.db.estructure.find({system: message.author.euser.location}).exec()
    loc.forEach(x => s.push(x.type))
    if(!s.includes("station")) return message.channel.send("You must be in a system with a Station to do this!")

    message.channel.send("yay repair stuff here")
};
  
  module.exports.help = {
    name:`${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`,
    description:`Repair your ship in the Enigma`,
    syntax:`${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`,
    alias:[],
    module:`${__dirname.split(`/`).pop()}`,
    access: {level: 0, mm: null}
  }
  