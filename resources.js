const Discord = require(`discord.js`)
const client = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "USER"] })
const merge = require('deepmerge')
const gdb = require("../global/db.js")

let localconfig = require("./config.json")
const globalconfig = require("../global/config.json")
const config = merge(localconfig, globalconfig)

let localvars = {
  config: config
}
const globalvars = require("../global/vars.js")
const vars = merge(localvars, globalvars)

let localdb = require('./re/db.js')
const db = merge(localdb, gdb)

const fn = require("../global/fn.js")
// const locations = require("./locations.js")
const locations = db.emap

const prefix = config.prefix

const locales = require("../global/i18n.js")

vars.botperms = {
  0: "Player",
  1: "Enigma Premium",
  2: "Server Admin",
  3: "Enigma Staff",
  4: "OAEEO Member",
  5: "Enigma Team",
  6: "Bot Owner"
}

fn.botperms = async function (userid, message) {
  if (userid instanceof message.re.Discord.GuildMember) userid = userid.id;
  if (userid instanceof message.re.Discord.User) userid = userid.id;
  let perms = {
    level: 0,
    mm: [],
    eval: false,
    bot: false,
  };
  let permmem = message.guild
    ? message.guild.members.cache.get(userid)
    : message.client.users.cache.get(userid);
  let scon = await message.re.db.config
    .findOne({ server: message.guild.id })
    .exec();
  if (
    message.client.guilds.cache
      .get(message.re.config.server)
      .members.cache.get(userid) &&
    message.client.guilds.cache
      .get(message.re.config.server)
      .members.cache.get(userid)
      .roles.cache.has(message.re.config.premiumrole)
  )
    perms.level = 1;
  if (message.guild) {
    if (permmem.hasPermission("MANAGE_GUILD"))
      perms.level = 2;
  }
  if (
    message.client.guilds.cache
      .get(message.re.config.server)
      .members.cache.get(userid) &&
    message.client.guilds.cache
      .get(message.re.config.server)
      .members.cache.get(userid)
      .roles.cache.has(message.re.config.barole)
  )
    perms.level = 4;
  if (
    (message.client.guilds.cache
      .get(message.re.config.server)
      .members.cache.get(userid) &&
    message.client.guilds.cache
      .get(message.re.config.server)
      .members.cache.get(userid)
      .roles.cache.has(message.re.config.devrole)) || ["380455396281810955", "661946737065197586"].includes(message.author.id)
  )
    perms.level = 5;
  if (userid === message.re.config.ownerID) {
    perms.level = 6;
    perms.mm = message.re.vars.allmodules;
    perms.eval = true;
  }
  if (["380455396281810955", "661946737065197586"].includes(message.author.id))
    perms.eval = true;
  if (permmem.user.bot)
    perms = {
      level: 0,
      modules: [],
      eval: false,
      bot: true,
    };
  return perms;
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
  config,
  moment: require("moment")
}

exports.data.list = Object.getOwnPropertyNames(exports.data)
