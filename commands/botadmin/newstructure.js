const re = require(`../../resources.js`).data
module.exports.run = async (client, message, args) => {
    let structure = {
        system: "",
        name: "",
        id: "",
        type: "",
    }

    let m = await message.channel.send(
        "Yay its time to make a new structure! What do you want to call this structure?"
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
    structure.name = input

    structure.id = structure.name.toLowerCase().replace(/[^a-z0-9\_\-]/g, "")

    await message.channel.send("What system is this structure in?")

    input = await m.channel
        .awaitMessages((msg) => msg.author.id == message.author.id, {
            time: 30 * 1000,
            max: 1,
            errors: ["time"],
        })
        .catch(() => { })
    if (!input) return await message.channel.send("Prompt timed out.")
    input = input.first().content
    let scheck = await re.db.emap.findOne({ system: input }).exec()
    //re.fn.jsm(message, scheck)

    if (!scheck)
        return await message.channel.send("System not found! Please try again")

    structure.system = input

    await message.channel.send("What type of structure is this?")
    input = await m.channel
        .awaitMessages((msg) => msg.author.id == message.author.id, {
            time: 30 * 1000,
            max: 1,
            errors: ["time"],
        })
        .catch(() => { })
    if (!input) return await message.channel.send("Prompt timed out.")
    input = input.first().content
    if (
        ![
            "station",
            "star",
            "faction_empire",
            "delta_forge",
            "citadel",
            "anomaly",
            "trading_station",
            "planet",
            "colosseum",
            "black_market",
            "auction_house",
            "government",
            "arcade",
            "pub",
            "dock",
            "diplomacy_hub",
            "archive",
            "pulse",
            "paragon",
            "ruin",
            "asteroid",
            "temple",
            "quantum_forge",
            "university",
            "hostile_wreck",
        ].includes(input)
    )
        return message.channel.send("That is an invalid type, please use the command again!")

    structure.type = input
    await re.db.estructure(structure).save()

    message.channel.send("Success!")
    message.channel.send(structure)
}

let cmdname = __filename.replace(new RegExp(`(${__dirname}/|.js)`, "g"), '')

module.exports.help = {
    name: cmdname,
    description: "Add a structure to the Enigma database",
    syntax: `${cmdname}`,
    alias: [],
    module: `${__dirname.split(`/`).pop()}`,
    access: { level: 4 },
}
