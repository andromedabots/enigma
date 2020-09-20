module.exports.run = async (client, message, args) => {
    const re = message.re
    if(message.author.euser.balance < 2000) return message.channel.send("You don't have enough EC to be able to warp anywhere!")

    if(!args[0]) return message.channel.send("You must choose a location to warp to!")

    let locdata = re.l[args[0]]
    let clocdata = re.l[message.author.euser.location]
    if(!locdata) return message.channel.send("Invalid location")
    if(!clocdata.warpTo.includes(args[0])) return message.channel.send("You can't warp there right now!")

    
    
    
    let m = await message.channel.send('', {
      embed: {
        title: `Warp in progress`,
        description: `Warping from ${re.func.capitalizeFirstLetter(message.author.euser.location)} to ${re.func.capitalizeFirstLetter(args[0])}`,
        color: re.config.color,
        image: {
             url: 'attachment://warp.gif'
        },
       },
       files: [{
          attachment: '/home/andromeda/enigma/warp.gif',
          name: "warp.gif"
       }]
    })

    await re.fn.sleep(10000)

    await m.delete()
    
    message.channel.send('', {
        embed: {
          title: `Warp complete`,
          description: `You are now in ${re.func.capitalizeFirstLetter(args[0])}`,
          color: re.config.color
        }
    })

    await re.db.eusers.findOneAndUpdate({user: message.author.id}, {location: args[0]}).exec()
    

};
  
  module.exports.help = {
    name:`${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`,
    description:`Warp to a new location`,
    syntax:`${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`,
    alias:["travel"],
    module:`${__dirname.split(`/`).pop()}`,
    access: {level: 0, mm: null}
  }
  