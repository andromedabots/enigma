module.exports.run = async (client, message, args) => {
    const re = message.re
    
    message.channel.send(new re.Discord.MessageEmbed().setColor(re.config.color).setDescription(`You currently have ${message.author.euser.balance} EC`))

    //message.channel.send(`You currently have ${message.author.euser.balance} EC.`)


};
  
  module.exports.help = {
    name:`${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`,
    description:`See your balance`,
    syntax:`${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`,
    alias:["bal", "cash", "ec"],
    module:`${__dirname.split(`/`).pop()}`,
    access: {level: 0}
  }
  