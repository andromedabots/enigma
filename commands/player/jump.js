module.exports.run = async (client, message, args) => {
    const re = message.re
    args = [args.join(" ")]
    if(message.author.euser.balance < 2000) return message.channel.send("You don't have enough EC to be able to jump anywhere!")

    if(!args[0]) return message.channel.send("You must choose a location to jump to!")

    let locdata = await re.db.emap.findOne({system: args[0].toLowerCase()}).exec()
    let clocdata = await re.db.emap.findOne({system: message.author.euser.location}).exec()
    let ship = await re.db.eship.findOne({id: message.author.euser.ship}).exec()
    if(!locdata) return message.channel.send("Invalid location")
    if(!clocdata.travelTo.includes(args[0].toLowerCase())) return message.channel.send("You can't jump there right now!")
    if(!ship) return message.channel.send("Your ship data has been corrupted, please contact the Enigma staff")
    
    let m = await message.channel.send('', {
      embed: {
        title: `Jump in progress`,
        description: `Jumping from ${re.func.capitalizeFirstLetter(message.author.euser.location)} to ${re.func.capitalizeFirstLetter(args[0])}\nShip: ${ship.name}\nEstimated Time: ${re.vars.ms((ship.speed / 2) * 1000, {long: true})}`,
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

    await re.db.eusers.findOneAndUpdate({user: message.author.id}, {travel: true}).exec()

    await re.fn.sleep((ship.speed / 2) * 1000)

    await m.delete()
    
    message.channel.send('', {
        embed: {
          title: `Jump complete`,
          description: `You are now in ${re.func.capitalizeFirstLetter(args[0])}`,
          color: re.config.color
        }
    })

    await re.db.eusers.findOneAndUpdate({user: message.author.id}, {location: args[0].toLowerCase(), travel: false}).exec()
    

};
  
  module.exports.help = {
    name:`${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`,
    description:`Warp to a new location`,
    syntax:`${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`,
    alias:["travel"],
    module:`${__dirname.split(`/`).pop()}`,
    access: {level: 0, mm: null}
  }
  