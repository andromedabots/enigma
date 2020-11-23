module.exports.run = async (client, message, args) => {
    const re = message.re
    let ship = await re.db.eship.findOne({ id: message.author.euser.ship }).exec()
    let uship = message.author.euser.inventory.ships.find(x => x.id == message.author.euser.ship)

    let embed = new re.Discord.MessageEmbed()
        .setTitle(`${message.author.username}'s Ship`)
        .setDescription(`Name: ${ship.name}\nHealth: ${uship.health}/${ship.health}\nSlots used: ${uship.slots.length}/${ship.slots}\nSpeed: ${ship.speed}`)
        .setFooter("Information accurate as of")
        .setTimestamp()
        .setColor(re.config.color)

    message.channel.send(embed)
};

let cmdname = __filename.replace(new RegExp(`(${__dirname}/|.js)`, "g"), '')

module.exports.help = {
    name: cmdname,
    description: `Get the details of your ship`,
    syntax: `${cmdname}`,
    alias: [],
    module: `${__dirname.split(`/`).pop()}`,
    access: { level: 0 }
}
