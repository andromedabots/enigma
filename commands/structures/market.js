module.exports.run = async (client, message, args) => {
  const re = message.re
  let s = [],
    l = message.author.euser.location,
    p = [],
    embeds = [new re.Discord.MessageEmbed().setDescription("")],
    sort = ""
  let loc = await re.db.estructure
    .find({ system: message.author.euser.location })
    .exec()
  loc.forEach((x) => s.push(x.type))
  if (!s.includes("station"))
    return message.channel.send(
      "You must be in a system with a Station to do this!"
    )

  let market = await re.db.emarket.find().exec()

  if (!args[0] || args[0] == "sort") {
    if (args[0] == "sort") {
      if (args[1] == "lowest") {
        market = await re.db.emarket.find().sort({ price: "ascending" }).exec()
        sort = "Sorted by price lowest to highest"
      } else if (args[1] == "highest") {
        market = await re.db.emarket.find().sort({ price: "descending" }).exec()
        sort = "Sorted by price highest to lowest"
      } else if (args[1] == "oldest") {
        market = await re.db.emarket
          .find()
          .sort({ createdAt: "ascending" })
          .exec()
        sort = "Sorted by time listed oldest to newest"
      } else if (args[1] == "newest") {
        market = await re.db.emarket
          .find()
          .sort({ createdAt: "descending" })
          .exec()
        sort = "Sorted by time listed newest to oldest"
      } else {
        return message.channel.send("Invalid sort type")
      }
    }

    for (var [i, x] of market.entries()) {
      if (i % 10 == 0)
        embeds.push(new re.Discord.MessageEmbed().setDescription(""))
      embeds[embeds.length - 1].fields.push({
        name: x.item,
        value: `Seller: ${
          re.client.users.cache.get(x.seller)
            ? re.client.users.cache.get(x.seller).tag
            : "Unknown User"
        }\nPrice: ${x.price} EC\nListed at: ${`${x.createdAt}`.replace(
          "GMT+0000 (Coordinated Universal Time)",
          "UTC"
        )}`,
      })
    }

    for (var [i, embed] of embeds.entries()) {
      embed
        .setTitle(`Enigma Global Market`)
        .setColor(re.config.color)
        .setFooter(
          `Page ${i + 1}/${embeds.length} | Information accurate as of`
        )
        .setTimestamp()
        .setDescription(
          sort
            ? sort
            : `Use \`${message.prefix}market sort <type>\` to sort the market. Type can be one of highest, lowest, oldest, newest`
        )
    }

    let m = await message.channel.send(embeds[0])
    re.fn.paginator(message.author.id, m, embeds, 0)
  } else if (args[0] == "list") {
    let itemname = args[1],
      price = parseInt(args[2], 10)
    if (!itemname) message.channel.send("Please specify an item!")
    let item = await re.db.eitems.findOne({ name: itemname }).exec()
    if (!item) message.channel.send("Unable to find that item!")
    if (!price) message.channel.send(`${args[2]} is not a valid price!`)
    let prompt = await message.channel.send(
      `Are you sure you want to list one ${item.name} for ${price} EC?`
    )
    await prompt.react("👍")
    await prompt.react("👎")
    let reactions = await prompt
      .awaitReactions(
        (r, u) =>
          (r.emoji == "👍" || r.emoji == "👎") && u.id == message.author.id,
        { time: 30 * 1000, max: 1, errors: ["time"] }
      )
      .catch(() => {})
    if (!reactions) {
      m.reactions.clearAll()
      return await m.edit("Prompt timed out")
    }

    await re.db.emarket({
      seller: message.author.id, 
      price: price, 
      item: item.id
    }).save()
    m.reactions.clearAll()
    m.edit(`Success! You have listed one ${item.name} for ${price} EC!`)
  } else {
  }
}

module.exports.help = {
  name: `${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`,
  description: `Repair your ship in the Enigma`,
  syntax: `${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`,
  alias: [],
  module: `${__dirname.split(`/`).pop()}`,
  access: { level: 0, mm: null },
}
