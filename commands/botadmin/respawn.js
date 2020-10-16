module.exports.run = async (client, message, args) => {
    const re = message.re
    args = [args[0], args.slice(1).join(` `)]

    if(!args[0]) return message.channel.send(`Please specify a user`)
    if(!args[1]) return message.channel.send(`Please specify a location`)

    let user = re.fn.getuser(args[0], message)
    let locdata = await re.db.emap.findOne({system: args[1].toLowerCase()}).exec()
    if(!locdata) return message.channel.send(`${args[1]} is not a location in Enigma!`)
    
   
    await re.db.eusers.findOneAndUpdate({user: user.id}, {location: args[1].toLowerCase(), travel: false}).exec()
    
    message.channel.send(`Successfully respawned <@${user.id}> (${user.id}) in \`${args[1].toLowerCase()}\``)

};
  
  module.exports.help = {
    name:`${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`,
    description:`Respawn a user`,
    syntax:`${__filename.split(`${__dirname}/`).pop().split(`.`).shift()} <user> <location>`,
    alias:[],
    module:`${__dirname.split(`/`).pop()}`,
    access: { level: 4 },
  }
  