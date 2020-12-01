module.exports.run = async (client, message, args) => {
    const re = message.re
    let run = []
    args.forEach(x => {
        if(re.cron.list.includes(x)) run.push(x)
    })
    if(run.length == 0 && args.length > 0) return message.channel.send("No vaild cron tasks found")
    let msg = await re.cron.run(run.length > 0 ? run : re.cron.list)
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
