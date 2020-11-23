module.exports.run = async (client, message, args) => {
    const re = message.re
    let l = message.author.euser.location, p = [], embeds = []
    let query = await re.db.eusers.find({ location: l }).exec()
    query.forEach(x => p.push(x.user))

    for (var [i, x] of p.entries()) {
        if (i % 10 == 0) embeds.push(new re.Discord.MessageEmbed().setDescription(""))
        //embeds[embeds.length - 1].description += `<@${x}> - ${re.client.users.cache.get(x) ? re.client.users.cache.get(x).username : "Unknown User"}\n`
        embeds[embeds.length - 1].description += `${re.client.users.cache.get(x) ? re.client.users.cache.get(x).tag : "Unknown User"}${message.tags.showids ? ` - \`${x}\`` : ""}\n`
    }

    for (var [i, embed] of embeds.entries()) {
        embed.setTitle(`Players in ${re.func.capitalizeFirstLetter(l)}`)
            .setColor(re.config.color)
            .setFooter(`Page ${i + 1}/${embeds.length} | Information accurate as of`)
            .setTimestamp()
    }

    let m = await message.channel.send(embeds[0])
    re.fn.paginator(message.author.id, m, embeds, 0)
};

let cmdname = __filename.replace(new RegExp(`(${__dirname}/|.js)`, "g"), '')

module.exports.help = {
    name: cmdname,
    description: `List the players in your current location`,
    syntax: `${cmdname}`,
    alias: [],
    module: `${__dirname.split(`/`).pop()}`,
    access: { level: 0 }
}
