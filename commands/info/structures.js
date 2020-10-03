module.exports.run = async (client, message, args) => {
    const re = message.re
    let allloc = await re.db.emap.find().exec()
    let l = message.author.euser.location
    let xll = await re.db.emap.findOne({system: l}).exec()
    if(!xll) return message.channel.send(`An error has occured. You appear to be in an invalid location.\n\`\`\`diff\n- ${message.author.euser.location}\n\`\`\``)
    let xl = xll.structures
    console.log(xl)
    let embeds = [new re.Discord.MessageEmbed().setDescription("** **\n")]

    for (var [i, x] of xl.entries()) {
      if (i % 10 == 0 && !i == 0) embeds.push(new re.Discord.MessageEmbed().setDescription("** **\n"))
      let structure = await re.db.estructure.findOne({id: x}).exec()
      //embeds[embeds.length - 1].description += `<@${x}> - ${re.client.users.cache.get(x) ? re.client.users.cache.get(x).username : "Unknown User"}\n`
      let ft1 = structure.type.split("_"), ft2 = []
      ft1.forEach(x => ft2.push(re.func.capitalizeFirstLetter(x)))
      embeds[embeds.length - 1].description += `**${structure.name} | ${ft2.join(" ")}**\n`
    }

    for (var [i, embed] of embeds.entries()) {
      if(!embed.description) embed.description = "No structures found!"
      embed.setTitle(`Structures in ${re.func.capitalizeFirstLetter(l)}`)
        .setColor(re.config.color)
        .setFooter(`Page ${i + 1}/${embeds.length} | Information accurate as of`)
        .setTimestamp()
      embed.description += "\n\n\n** **"
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
  