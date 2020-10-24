module.exports.run = async (client, message, args) => {
    const re = message.re
    let user = re.fn.getuser(args.join(" "), message)
    if(!user) user = re.fn.getuser(message.author.id, message)
    let data = await re.db.eusers.findOne({user: user.user.id}).exec()
    if(!data) return message.channel.send(`${user.user.tag} is not in the Enigma database yet!`)
    let embed = new re.Discord.MessageEmbed()
    .setTitle("Player Data for " + user.user.tag)
    .setDescription(`ID: ${user.user.id}\nCreated at ${user.user.createdAt.replace("GMT+0000 (Coordinated Universal Time)", "UTC")}`)
    .addField("Location", data.location, true)
    .addField("Currently Traveling?", data.travel, true)
    .addField("Balance", `${data.balance} EC`, true)
    .addField("Active Ship", data.ship, true)
    .addField("Ship Health", data.inventory.ships.find(x => x.id === data.ship).health, true)
    let bp = await re.fn.botperms(user.user.id, message)
    embed.addField("Permission Level", `${bp.level}: ${re.vars.botperms[bp.level]}`, true)
    let items = `${data.inventory.items.map(x => `${x.id}${x.custom ? " (Custom Item)" : ""}`).join(`\n`)}`
    embed.addField("Items:", `\`\`\`\n${items ? `${items}` : "No items in inventory"}\n\`\`\``)

    embed.setColor(re.config.color).setFooter("Information accurate as of").setTimestamp().setThumbnail(user.user.avatarURL({dynamic: true}))
    message.channel.send(embed)
};
  
  module.exports.help = {
    name:`${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`,
    description:`See the data for a player`,
    syntax:`${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`,
    alias:[],
    module:`${__dirname.split(`/`).pop()}`,
    access: {level: 3, mm: null}
  }
  