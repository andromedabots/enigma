const re = require(`../resources.js`).data;
let messagefunc = require("../../global/message.js");
const { jsm } = require("../../global/fn.js");
const { Discord } = require("../../global/vars.js");
re.client.on("message", async message => {
    message.re = re
    if(message.author && message.author.bot) return

    let scon = await re.db.config.findOne({ server: message.guild.id }).exec()
    if(!scon){
        scon = {server: message.guild.id}
        re.db.config(scon).save()
    }

    if(message.channel.id === scon.egchat && !message.content.startsWith(scon.prefix[re.client.user.id])){
        let gc = []
        let query = await re.db.config.find().exec()
        query.forEach(x => {
            if(x && x != message.channel.id) gc.push(x.egchat)
        })
        let embed = new re.Discord.MessageEmbed().setFooter(`Sent from #${message.channel.name} in ${message.guild.name}`).setColor(re.config.color).setDescription(message.content).setAuthor(message.author.tag, message.author.avatarURL())
        gc.forEach(x => {
            let c = re.client.channels.cache.get(x)
            if(c && c.id != message.channel.id) c.send(embed)
        })
        message.react("✅")
    }

    let noe = false, prefix = scon.prefix[re.client.user.id], command = message.content.slice(prefix.length).trim().split(/ /).shift().toLowerCase();
    let euser = await re.db.eusers.findOne({ user: message.author.id }).exec()
    // message.locale = euser.locale || "en"

    if(!euser && message.content.startsWith(prefix)) noe = true
    if(noe && message.content.startsWith(prefix) && !["ping", "help", "new", "eval", "restart"].includes(command)) return message.channel.send("You haven't yet joined the Enigma!")
    if(noe && !["ping", "help", "new", "eval"].includes(command)) return

    message.author.euser = euser

    await messagefunc(message, re)
});