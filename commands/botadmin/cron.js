module.exports.run = async (client, message, args) => {
    const re = message.re
    let msg = re.cron.run(args ? args : undefined)
    message.channel.send(msg)
    re.cron.cronlog(`${msg} - Manually triggered by ${message.author.tag}`)
}

let cmdname = __filename.replace(new RegExp(`(${__dirname}/|.js)`, "g"), '')

module.exports.help = {
    name: cmdname,
    description: "Run cron on the bot",
    syntax: `${cmdname} <section>`,
    alias: ["cronjob"],
    module: `${__dirname.split(`/`).pop()}`,
    access: { level: 6 },
}
