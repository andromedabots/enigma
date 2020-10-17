module.exports.run = async (client, message, args) => {
    const re = message.re
    let s = [], l = message.author.euser.location, p = [], embeds = [new re.Discord.MessageEmbed().setDescription("")], sort = ""
    let loc = await re.db.estructure.find({system: message.author.euser.location}).exec()
    loc.forEach(x => s.push(x.type))
    if(!s.includes("station")) return message.channel.send("You must be in a system with a Station to do this!")
  
    let market = await re.db.emarket.find().exec()

    if(!args[0] || args[0] == "sort"){

      if(args[0] == "sort"){
        if(args[1] == "lowest"){
          market = await re.db.emarket.find().sort({price : "ascending"}).exec()
          sort = "Sorted by price in ascending order"
        } else if(args[1] == "highest"){
          market = await re.db.emarket.find().sort({price : "descending"}).exec()
          sort = "Sorted by price in descending order"
        } else if(args[1] == "oldest"){
          market = await re.db.emarket.find().sort({createdAt : "ascending"}).exec()
          sort = "Sorted by time listed in ascending order"
        } else if(args[1] == "newest"){
          market = await re.db.emarket.find().sort({createdAt : "descending"}).exec()
          sort = "Sorted by time listed in descending order"
        } else {
          return message.channel.send("Invalid sort type")
        }
      }

    for (var [i, x] of market.entries()) {
      if (i % 10 == 0) embeds.push(new re.Discord.MessageEmbed().setDescription(""))
      embeds[embeds.length - 1].fields.push({name: x.item, value: `Seller: ${re.client.users.cache.get(x.seller) ? re.client.users.cache.get(x.seller).tag : "Unknown User"}\nPrice: ${x.price} EC\nListed at: ${`${x.createdAt}`.replace("GMT+0000 (Coordinated Universal Time)", "UTC")}`})
    }

    for (var [i, embed] of embeds.entries()) {
      embed.setTitle(`Enigma Global Market`)
        .setColor(re.config.color)
        .setFooter(`Page ${i + 1}/${embeds.length} | Information accurate as of`)
        .setTimestamp()
        .setDescription(sort ? sort : `Use \`${message.prefix}market sort <type>\` to sort the market. Type can be one of highest, lowest, oldest, newest`)
    }

    let m = await message.channel.send(embeds[0])
    re.fn.paginator(message.author.id, m, embeds, 0)

  } else if(args[0] == ""){

  } else {
    
  }
};
  
  module.exports.help = {
    name:`${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`,
    description:`Repair your ship in the Enigma`,
    syntax:`${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`,
    alias:[],
    module:`${__dirname.split(`/`).pop()}`,
    access: {level: 0, mm: null}
  }
  