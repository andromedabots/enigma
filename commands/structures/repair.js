module.exports.run = async (client, message, args) => {
    const re = message.re
    let s = []
    let loc = await re.db.estructure.find({ system: message.author.euser.location }).exec()
    loc.forEach(x => s.push(x.type))
    if (!s.includes("station")) return message.channel.send("You must be in a system with a Station to do this!")

    message.channel.send("yay repair stuff here")
};

let cmdname = __filename.replace(new RegExp(`(${__dirname}/|.js)`, "g"), '')

module.exports.help = {
    name: cmdname,
    description: `Repair your ship in the Enigma`,
    syntax: `${cmdname}`,
    alias: [],
    module: `${__dirname.split(`/`).pop()}`,
    access: { level: 0 }
}
