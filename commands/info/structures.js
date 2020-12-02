module.exports.run = async (client, message, args) => {
    const re = message.re
    let l = message.author.euser.location
    let alllocations = await re.db.estructure.find({ system: l }).exec()
    let embeds = [{ description: `** **\n`, fields:[] }]
    let asteroids = {}
    re.config.materials.forEach(x => asteroids[x] = [])
    //sigh
    for (let [i, structure] of alllocations.entries()) {
        if (i % 10 == 0 && !i == 0) embeds.push({ description: `** **\n` })
        let structurename = structure.type.split("_").map(x => re.func.capitalizeFirstLetter(x))
        switch (structure.type) { 
            case "asteroid":
                if (!asteroids[structure.material]) asteroids[structure.material] = [];
                asteroids[structure.material].push(structure.id)
                break;
            default:
                embeds[embeds.length - 1].description += `**${structure.name} | ${structurename.join(" ")}**\n`
        }
    }
    let asteroidslist = "";
    for (let materials in asteroids) {
        if (asteroids[materials].length > 0) asteroidslist += `${asteroids[materials].length} ${re.fn.capitalizeFirstLetter(materials)} Asteroid${asteroids[materials].length == 1 ? "" : "s"}\n`
    }

    if (asteroidslist.length > 0) embeds[0].fields.push({ name: "Asteroids:", value: asteroidslist })

    for (let [i, embed] of embeds.entries()) {
        if (!embed.description || embed.description == "** **\n") embed.description = `No ${asteroidslist.length > 0 ? "other " : ""}structures found!`
        embeds[i] = {
            title: `Structures in ${re.func.capitalizeFirstLetter(l)}`,
            color: re.config.color,
            description: embed.description,
            fields: embed.fields,
            footer: {
                text: `Page ${i + 1}/${embeds.length} | Information accurate as of`
            },
            timestamp: new Date()
        }
        embeds[i].description += "\n\n** **"
    }

    let m = await message.channel.send({ embed: embeds[0] })
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
