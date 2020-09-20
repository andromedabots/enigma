module.exports.run = async (client, message, args) => {
    const re = message.re
    
    let euser = await re.db.eusers.findOne({ user: message.author.id }).exec()
    if(euser) return message.channel.send("You're already in the Enigma!")

    // let voul = Object.keys(Object.filter(re.l, x => x.map == "voulat"))
    // let loc = re.fn.getRandom(0, voul.length)

    voul = ["nexus"], loc = 0

    euser = {
      user: message.author.id,
      location: voul[loc]
    }
    await re.db.eusers(euser).save()

    message.react("✅")
    message.channel.send(euser)
    console.log(euser)


};
  
  module.exports.help = {
    name:`${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`,
    description:`Join the Enigma`,
    syntax:`${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`,
    alias:["initalize", "join"],
    module:`${__dirname.split(`/`).pop()}`,
    access: {level: 0, mm: null}
  }
  