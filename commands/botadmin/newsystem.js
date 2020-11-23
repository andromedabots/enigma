const re = require(`../../resources.js`).data
module.exports.run = async (client, message, args) => {
    return message.channel.send(
        `\`\`\`js\n*eval re.db.emap({\n  system: "",\n  map: "",\n  structures: [],\n  warpTo: [],\n  travelTo: []\n}).save()\`\`\`\nFill out this command and sent it to add a system!\nItems in \`[]\` should be listed like this: \`["item1", "item2", "item3"]\`\ntravelTo is for locations you can jump to, warpTo is for locations you can warp to.\nStructures should only use any of the following:\n\`\`\`js\n["station", "star", "faction_empire", "delta_forge", "citadel", "anomaly", "trading_station", "planet", "colosseum", "black_market", "auction_house", "government", "arcade", "pub", "dock", "diplomacy_hub", "archive", "pulse", "paragon", "ruin", "asteroid", "temple", "quantum_forge", "university", "hostile_wreck"]\`\`\`.`
    )

    let item = {
        system: "",
        map: "",
        structures: [],
        warpTo: [],
        travelTo: [],
    }

    let m = await message.channel.send(
        "Yay its time to make a new system! What do you want to call this system? (All lowercase, no punctuation)"
    )
    let input = await m.channel
        .awaitMessages((msg) => msg.author.id == message.author.id, {
            time: 30 * 1000,
            max: 1,
            errors: ["time"],
        })
        .catch(() => { })
    if (!input) return await message.channel.send("Prompt timed out.")
    input = input.first().content
    item.name = input

    item.id = item.name.toLowerCase().replace(/[^a-z0-9\_\-]/g, "")

    // m = await message.channel.send("How much should this item cost?")
    await message.channel.send("What map is this system in?")
    input = await m.channel
        .awaitMessages((msg) => msg.author.id == message.author.id, {
            time: 30 * 1000,
            max: 1,
            errors: ["time"],
        })
        .catch(() => { })
    if (!input) return await message.channel.send("Prompt timed out.")
    input = input.first().content
    item.price = parseInt(input, 10)

    // m = await message.channel.send("How much should this item damage?")
    await message.channel.send("How much should this item damage?")
    input = await m.channel
        .awaitMessages((msg) => msg.author.id == message.author.id, {
            time: 30 * 1000,
            max: 1,
            errors: ["time"],
        })
        .catch(() => { })
    if (!input) return await message.channel.send("Prompt timed out.")
    input = input.first().content
    item.damage = parseInt(input, 10)

    // m = await message.channel.send("How much should this item heal?")
    await message.channel.send("How much should this item heal?")
    input = await m.channel
        .awaitMessages((msg) => msg.author.id == message.author.id, {
            time: 30 * 1000,
            max: 1,
            errors: ["time"],
        })
        .catch(() => { })
    if (!input) return await message.channel.send("Prompt timed out.")
    input = input.first().content
    item.heal = parseInt(input, 10)

    // m = await message.channel.send("How much health should this item add?")
    await message.channel.send("How much health should this item add?")
    input = await m.channel
        .awaitMessages((msg) => msg.author.id == message.author.id, {
            time: 30 * 1000,
            max: 1,
            errors: ["time"],
        })
        .catch(() => { })
    if (!input) return await message.channel.send("Prompt timed out.")
    input = input.first().content
    item.addhealth = parseInt(input, 10)

    message.channel.send(JSON.stringify(item, null, 4), { code: "fix" })
    re.dbs.items.set(message.guild.id + "." + item.id, item)
}

let cmdname = __filename.replace(new RegExp(`(${__dirname}/|.js)`, "g"), '')

module.exports.help = {
    name: cmdname,
    description: "Add a system to the Enigma database",
    syntax: `${cmdname} <user> <balance>`,
    alias: [],
    module: `${__dirname.split(`/`).pop()}`,
    access: { level: 4 },
}