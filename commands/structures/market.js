module.exports.run = async (client, message, args) => {
  const re = message.re
  let s = [],
    l = message.author.euser.location,
    p = [],
    embeds = [],
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
        )}\nID: \`${x.id}\``,
      })
    }

    if (!embeds[0])
      embeds.push(
        new re.Discord.MessageEmbed().addField(
          "** **",
          "No items are currently listed in the Enigma Market!\n\n** **"
        )
      )

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
    let item = await re.db.eitem.findOne({ id: itemname }).exec()
    if (!item) return message.channel.send("Unable to find that item!")
    if (!price) return message.channel.send(`${args[2]} is not a valid price!`)
    let invitem = message.author.euser.inventory.items.find((x) => x.id == item.id)
    if (!invitem)
      return message.channel.send(
        `You do not have an ${item.name} in your inventory!`
      )
    if(invitem.custom) return message.channel.send(`You cannot sell a custom item!`)
    let m = await message.channel.send(
      `Are you sure you want to list one ${item.name} for ${price} EC?\nYou will not receive any money until the item is purchased, but the item will no longer be in your inventory!`
    )
    await m.react("👍")
    await m.react("👎")
    let reactions = await m
      .awaitReactions(
        (r, u) =>
          (r.emoji.name == "👍" || r.emoji.name == "👎") && u.id == message.author.id,
        { time: 30 * 1000, max: 1, errors: ["time"] }
      )
      .catch(() => {})
    m.reactions.removeAll()
    if (!reactions) {
      return await m.edit("Prompt timed out")
    }
    let reaction = reactions.first().emoji
    console.log(reaction)
    if (reaction.name == "👎") {
      return await m.edit("Listing canceled")
    }

    let listitem = {
      seller: message.author.id,
      price: price,
      item: item.id,
      id: re.vars.nanoid(8),
    }
    await re.db.emarket(listitem).save()
    message.author.euser.inventory.items.pull({ id: item.id })
    message.author.euser.save()
    m.edit(
      `Success! You have listed one ${item.name} for ${price} EC! ID: \`${listitem.id}\``
    )
  } else if (args[0] == "buy") {
    let marketid = args[1]
    if (!marketid) message.channel.send("Please specify an item!")
    let marketitem = await re.db.emarket.findOne({ id: marketid }).exec()
    if (!marketitem) return message.channel.send("Unable to find that item ID in the market!")
    let item = await re.db.eitem.findOne({id: marketitem.item}).exec()
    if (message.author.euser.balance < marketitem.price) 
      return message.channel.send(
        `You do not enough EC to purchase that!\n\nHave: ${message.author.euser.balance}\nNeed: ${marketitem.price}`
      )
    let m = await message.channel.send(
      `Are you sure you want to purchase one ${item.name} for ${marketitem.price} EC?`
    )
    await m.react("👍")
    await m.react("👎")
    let reactions = await m
      .awaitReactions(
        (r, u) =>
          (r.emoji.name == "👍" || r.emoji.name == "👎") && u.id == message.author.id,
        { time: 30 * 1000, max: 1, errors: ["time"] }
      )
      .catch(() => {})
    m.reactions.removeAll()
    if (!reactions) {
      return await m.edit("Prompt timed out")
    }
    let reaction = reactions.first().emoji
    if (reaction.name == "👎") {
      return await m.edit("Purchase canceled")
    }

    let seller = await re.db.eusers.findOne({user: marketitem.seller})
    seller.balance += marketitem.price
    seller.save()

    message.author.euser.balance -= marketitem.price
    message.author.euser.inventory.items.push({ id: marketitem.item })
    message.author.euser.save()

    await re.db.emarket.deleteOne({id: marketitem.id}).exec()
    m.edit(
      `Success! You have purchased one ${item.name} for ${marketitem.price} EC! ID: \`${marketitem.id}\``
    )
  }
}

module.exports.help = {
  name: `${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`,
  description: `See the Enigma Market`,
  syntax: `${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`,
  alias: [],
  module: `${__dirname.split(`/`).pop()}`,
  access: { level: 0, mm: null },
}
