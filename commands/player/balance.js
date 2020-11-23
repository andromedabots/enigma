module.exports.run = async (client, message, args) => {
    const re = message.re

    message.channel.send(new re.Discord.MessageEmbed().setColor(re.config.color).setDescription(`You currently have ${message.author.euser.balance} EC`))

    //message.channel.send(`You currently have ${message.author.euser.balance} EC.`)


};

let cmdname = __filename.replace(new RegExp(`(${__dirname}/|.js)`, "g"), '')

module.exports.help = {
    name: cmdname,
    description: `See your balance`,
    syntax: `${cmdname}`,
    alias: ["bal", "cash", "ec"],
    module: `${__dirname.split(`/`).pop()}`,
    access: { level: 0 }
}
