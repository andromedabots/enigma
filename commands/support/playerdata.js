module.exports.run = async (client, message, args) => {
    const re = message.re
    if (!args[0]) args[0] = message.author.id
    let user = re.fn.getuser(args.join(" "), message)
    let data = await re.db.eusers.findOne({ user: user.user.id }).exec()
    if (!data) return message.channel.send(`${user.user.tag} is not in the Enigma database yet!`)
    let embed = new re.Discord.MessageEmbed()
        .setTitle("Player Data for " + user.user.tag)
        .setDescription(`ID: ${user.user.id}\nCreated at ${user.user.createdTimestamp}`)
        .addField("Location", data.location, true)
        .addField("Currently Traveling?", data.travel, true)
        .addField("Balance", `${data.balance} EC`, true)
        .addField("Active Ship", data.ship, true)
        .addField("Ship Health", data.inventory.ships.find(x => x.id === data.ship).health, true)
    let bp = await re.fn.botperms(user.user.id, message)
    embed.addField("Permission Level", `${bp.level}: ${re.vars.botperms[bp.level]}`, true)
    let items = `${data.inventory.items.map(x => `${x.id}${x.custom ? " (Custom Item)" : ""}`).join(`\n`)}`
    embed.addField("Items:", `\`\`\`\n${items ? `${items}` : "No items in inventory"}\n\`\`\``)

    embed.setColor(re.config.color).setFooter("Information accurate as of").setTimestamp().setThumbnail(user.user.avatarURL({ dynamic: true }))
    message.channel.send(embed)
};

let cmdname = __filename.replace(new RegExp(`(${__dirname}/|.js)`, "g"), '')

module.exports.help = {
    name: cmdname,
    description: `See the data for a player`,
    syntax: `${cmdname} <user>`,
    alias: [],
    module: `${__dirname.split(`/`).pop()}`,
    access: { level: 3, mm: null }
}
