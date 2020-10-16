module.exports.run = async (client, message, args) => {
    const re = message.re
    let jw = message.content.split(` `)[0].replace(message.prefix, ``)
    args = [args.join(` `)]
    if(args[0] === "on a trampoline") return message.channel.send("https://media.giphy.com/media/4OgjmBLgdFTP2/giphy.gif")
    if(message.author.euser.balance < (jw == "jump" ? 2000 : 10000)) return message.channel.send(`You don't have enough EC to be able to ${jw} anywhere!`)

    if(!args[0]) return message.channel.send(`You must choose a location to ${jw} to!`)

    let locdata = await re.db.emap.findOne({system: args[0].toLowerCase()}).exec()
    let clocdata = await re.db.emap.findOne({system: message.author.euser.location}).exec()
    let ship = await re.db.eship.findOne({id: message.author.euser.ship}).exec()
    if(!locdata) return message.channel.send(`That is not a location in Enigma!`)
    if(!clocdata.travelTo.includes(args[0].toLowerCase())) return message.channel.send(`You can't ${jw} there right now!`)
    if(!ship) return message.channel.send(`Your ship data has been corrupted, please contact the Enigma staff`)

    let endtime = (Date.now() + (jw == "jump" ? ship.speed : ship.speed / 2) * 1000) + 1000
    
    let mthingy = {
      embed: {
        title: `${re.func.capitalizeFirstLetter(jw)} in progress`,
        description: `${re.func.capitalizeFirstLetter(jw)}ing from ${re.func.capitalizeFirstLetter(message.author.euser.location)} to ${re.func.capitalizeFirstLetter(args[0])}\nShip: ${ship.name}`, /*\nTime Remaining: ${re.vars.ms(endtime - Date.now(), {long: true})}*/
        color: re.config.color,
        image: {
             url: 'http://andromedabots.tk/warp.gif' //'attachment://warp.gif'
        },
       }/*,
       files: [{
          attachment: '/home/andromeda/enigma/warp.gif',
          name: `warp.gif`
       }]*/
    }
    
    let m = await message.channel.send(`Time Remaining: ${re.vars.ms(endtime - Date.now(), {long: true})}`, mthingy)


    let jumptimer = setInterval(function () {
      if (Date.now() > endtime) {
        clearInterval(jumptimer)
      } else {
        mthingy.description = `${re.func.capitalizeFirstLetter(jw)}ing from ${re.func.capitalizeFirstLetter(message.author.euser.location)} to ${re.func.capitalizeFirstLetter(args[0])}\nShip: ${ship.name}\nTime Remaining: ${re.vars.ms(endtime - Date.now(), {long: true})}`
        m.edit(`Time Remaining: ${re.vars.ms(endtime - Date.now(), {long: true})}`, mthingy)
        console.log(endtime - Date.now(), re.vars.ms(endtime - Date.now(), {long: true}))
      }
    }, 30000) 

    await re.db.eusers.findOneAndUpdate({user: message.author.id}, {travel: true}).exec()

    await re.fn.sleep(((jw == "jump" ? ship.speed : ship.speed / 2) * 1000) + 1000)

    await m.delete()
    
    message.channel.send('', {
        embed: {
          title: `${re.func.capitalizeFirstLetter(jw)} complete`,
          description: `You are now in ${re.func.capitalizeFirstLetter(args[0])}`,
          color: re.config.color
        }
    })

    await re.db.eusers.findOneAndUpdate({user: message.author.id}, {location: args[0].toLowerCase(), travel: false}).exec()
    

};
  
  module.exports.help = {
    name:`${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`,
    description:`Jump to a new location`,
    syntax:`${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`,
    alias:[],
    module:`${__dirname.split(`/`).pop()}`,
    access: {level: 0, mm: null}
  }
  