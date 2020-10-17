module.exports.run = async (client, message, args) => {
    const re = message.re
    let embeds = []
    let query = await re.db.eship.find({hidden: false}).exec()

    for (var [i, x] of query.entries()) {
      if (i % 10 == 0) embeds.push(new re.Discord.MessageEmbed().setDescription(""))
      embeds[embeds.length - 1].fields.push({name: `${x.name} - \`${x.id}\``, value: `Damage: ${x.damage}\nAttack Speed: ${x.attack_speed}\nHealth: ${x.health}\nShield: ${x.shield}\nSlots: ${x.slots}\nSpeed: ${x.speed}`})
    }

    for (var [i, embed] of embeds.entries()) {
      embed.setTitle(`All Ships`)
        .setColor(re.config.color)
        .setFooter(`Page ${i + 1}/${embeds.length} | Information accurate as of`)
        .setTimestamp()
    }

    let m = await message.channel.send(embeds[0])
    re.fn.paginator(message.author.id, m, embeds, 0)
};
  
  module.exports.help = {
    name:`${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`,
    description:`List the players in your current location`,
    syntax:`${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`,
    alias:[],
    module:`${__dirname.split(`/`).pop()}`,
    access: {level: 0, mm: null}
  }
  