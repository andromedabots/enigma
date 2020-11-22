const Discord = require(`discord.js`)
const client = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "USER"] })
const merge = require("deepmerge")
const gdb = require("../global/db.js")

let localconfig = require("./config.json")
const globalconfig = require("../global/config.json")
const newconfig = merge(globalconfig, localconfig)

const vars = require("../global/vars.js")
vars.config = newconfig

let localdb = require("./re/db.js")
const db = merge(localdb, gdb)

const fn = require("../global/fn.js")
// const locations = require("./locations.js")
const locations = db.emap

const prefix = newconfig.prefix

const locales = require("../global/i18n.js")

vars.botperms = {
  0: "Player",
  1: "Beta Testers",
  2: "Enigma Premium",
  3: "Enigma Staff",
  4: "OAEEO Member",
  5: "Enigma Team",
  6: "Enigma Leadership",
}

fn.botperms = async function (userid, message) {
  if (userid instanceof message.re.Discord.GuildMember) userid = userid.id
  if (userid instanceof message.re.Discord.User) userid = userid.id
  let perms = {
    level: 0,
    eval: false,
    bot: false,
  }
  let permmem = message.guild
    ? message.guild.members.cache.get(userid)
    : message.client.users.cache.get(userid)
  let enigmamem = message.client.guilds.cache
    .get(message.re.config.server)
    .members.cache.get(userid)
  if (enigmamem && enigmamem.roles.cache.has(message.re.config.betarole))
    perms.level = 1
  if (enigmamem && enigmamem.roles.cache.has(message.re.config.premiumrole))
    perms.level = 2
  if (enigmamem && enigmamem.roles.cache.has(message.re.config.staffrole))
    perms.level = 3
  if (enigmamem && enigmamem.roles.cache.has(message.re.config.barole))
    perms.level = 4
  if (enigmamem && enigmamem.roles.cache.has(message.re.config.devrole))
    perms.level = 5
  if (enigmamem && enigmamem.roles.cache.has(message.re.config.devrole))
    perms.level = 5
  if (enigmamem && enigmamem.roles.cache.has(message.re.config.leaderrole))
    perms.level = 6
  if (["380455396281810955", "661946737065197586", message.re.config.ownerID].includes(permmem.user.id))
    perms.eval = true
  if (permmem.user.bot)
    perms = {
      level: 0,
      eval: false,
      bot: true,
    }
  return perms
}

exports.data = {
  vars,
  fn,
  func: fn,
  prefix,
  db,
  locations,
  l: locations,
  client,
  Discord,
  locales,
  config: newconfig,
  moment: require("moment"),
}

exports.data.list = Object.getOwnPropertyNames(exports.data)
