module.exports.run = async (client, message, args) => {
    const re = message.re
    let allloc = await re.db.emap.find().exec()
    console.log(allloc)
    let l = message.author.euser.location, xl = allloc[l].structures, embeds = [new re.Discord.MessageEmbed().setDescription("No structures found!")]

    for (var [i, x] of xl.entries()) {
      if (i % 10 == 0 && !i == 0) embeds.push(new re.Discord.MessageEmbed().setDescription(""))
      //embeds[embeds.length - 1].description += `<@${x}> - ${re.client.users.cache.get(x) ? re.client.users.cache.get(x).username : "Unknown User"}\n`
      embeds[embeds.length - 1].description += `${x}\n`
    }

    for (var [i, embed] of embeds.entries()) {
      embed.setTitle(`Structures in ${re.func.capitalizeFirstLetter(l)}`)
        .setColor(re.config.color)
        .setFooter(`Page ${i + 1}/${embeds.length} | Information accurate as of`)
        .setTimestamp()
    }

    let m = await message.channel.send(embeds[0])
    re.fn.paginator(message.author.id, m, embeds, 0)
};
  
  module.exports.help = {
    name:`${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`,
    description:`List the structures in your current location`,
    syntax:`${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`,
    alias:["nearby"],
    module:`${__dirname.split(`/`).pop()}`,
    access: {level: 0, mm: null}
  }
  