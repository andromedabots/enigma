module.exports.run = async (client, message, args) => {
    const re = message.re
    let user = re.fn.getuser(args.join(" "), message)
    if(!user) user = re.fn.getuser(message.author.id, message)
    let data = await re.db.eusers.findOne({user: user.user.id}).exec()
    if(!data) return message.channel.send(`${user.user.tag} is not in the Enigma database yet!`)
    if(data.location != message.author.euser.location) return message.channel.send("You can only see the stats of people in your current location!")
    let embed = new re.Discord.MessageEmbed()
    .setTitle(user.user.tag + "'s Enigma Stats")
    .addField("Location", re.func.capitalizeFirstLetter(data.location), true)
    .addField("Balance", `${data.balance} EC`, true)
    .addField("Active Ship", data.ship, true)
    .addField("Ship Health", data.inventory.ships.find(x => x.id === data.ship).health, true)

    embed.setColor(re.config.color).setFooter("Information accurate as of").setTimestamp().setThumbnail(user.user.avatarURL({dynamic: true}))
    message.channel.send(embed)
};
  
  module.exports.help = {
    name:`${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`,
    description:`See the stats for a player`,
    syntax:`${__filename.split(`${__dirname}/`).pop().split(`.`).shift()} <user>`,
    alias:[],
    module:`${__dirname.split(`/`).pop()}`,
    access: {level: 3, mm: null}
  }
  