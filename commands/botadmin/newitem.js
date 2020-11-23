const re = require(`../../resources.js`).data
module.exports.run = async (client, message, args) => {
    let item = {
        name: "",
        id: "",
        type: "",
        action: {},
        slots: 1,
    }

    let m = await message.channel.send(
        "Yay its time to make a new item! What do you want to call this item?"
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

    await message.channel.send("What type of item is this?")
    input = await m.channel
        .awaitMessages((msg) => msg.author.id == message.author.id, {
            time: 30 * 1000,
            max: 1,
            errors: ["time"],
        })
        .catch(() => { })
    if (!input) return await message.channel.send("Prompt timed out.")
    input = input.first().content
    if (!["weapon", "shield", "material", "artifact"].includes(input))
        return message.channel.send(
            "That is an invalid type, please use the command again!"
        )

    item.type = input
    if (item.type == "weapon") item.action.isWeapon = true
    if (item.type == "artifact") item.action.isWeapon = true

    if (item.type == "shield") {
        await message.channel.send(
            "How much shield does this item add? If this is a special shield, say 0"
        )
        input = await m.channel
            .awaitMessages((msg) => msg.author.id == message.author.id, {
                time: 30 * 1000,
                max: 1,
                errors: ["time"],
            })
            .catch(() => { })
        if (!input) return await message.channel.send("Prompt timed out.")
        input = parseInt(input.first().content, 10)
        item.action.addShield = input
    }

    await message.channel.send("How many slots does this item use?")
    input = await m.channel
        .awaitMessages((msg) => msg.author.id == message.author.id, {
            time: 30 * 1000,
            max: 1,
            errors: ["time"],
        })
        .catch(() => { })
    if (!input) return await message.channel.send("Prompt timed out.")
    input = parseInt(input.first().content, 10)
    item.slots = input

    await re.db.eitem(item).save()

    message.channel.send("Success!")
    message.channel.send(item)
}

let cmdname = __filename.replace(new RegExp(`(${__dirname}/|.js)`, "g"), '')

module.exports.help = {
    name: cmdname,
    description: "Add a item to the Enigma database",
    syntax: `${cmdname}`,
    alias: [],
    module: `${__dirname.split(`/`).pop()}`,
    access: { level: 4 },
}
