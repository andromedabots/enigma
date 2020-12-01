module.exports.run = async (client, message, args) => {
    const re = message.re
    let l = message.author.euser.location
    let xl = await re.db.estructure.find({ system: l }).exec()
    console.log(xl)
    let embeds = [new re.Discord.MessageEmbed().setDescription("** **\n")]

    for (var [i, structure] of xl.entries()) {
        if (i % 10 == 0 && !i == 0) embeds.push(new re.Discord.MessageEmbed().setDescription("** **\n"))
        //embeds[embeds.length - 1].description += `<@${x}> - ${re.client.users.cache.get(x) ? re.client.users.cache.get(x).username : "Unknown User"}\n`
        let ft1 = structure.type.split("_"), ft2 = []
        ft1.forEach(x => ft2.push(re.func.capitalizeFirstLetter(x)))

        // when you move this command to the new UI, just leave this check like this (:
        if(structure.type == "asteroid"){
            embeds[embeds.length - 1].description += `**${structure.name} | ${ft2.join(" ")}**\n`
        } else {
            embeds[embeds.length - 1].description += `**${structure.name} | ${ft2.join(" ")}**\n`
        }
    }

    for (var [i, embed] of embeds.entries()) {
        if (!embed.description) embed.description = "No structures found!"
        embed.setTitle(`Structures in ${re.func.capitalizeFirstLetter(l)}`)
            .setColor(re.config.color)
            .setFooter(`Page ${i + 1}/${embeds.length} | Information accurate as of`)
            .setTimestamp()
        embed.description += "\n\n\n** **"
    }

    let m = await message.channel.send(embeds[0])
    re.fn.paginator(message.author.id, m, embeds, 0)
};

let cmdname = __filename.replace(new RegExp(`(${__dirname}/|.js)`, "g"), '')

module.exports.help = {
    name: cmdname,
    description: `List the structures in your current location`,
    syntax: `${cmdname}`,
    alias: ["nearby"],
    module: `${__dirname.split(`/`).pop()}`,
    access: { level: 0 }
}
