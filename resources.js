const Discord = require(`discord.js`)
const client = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "USER"] })
const merge = require('deepmerge')
const db = require("../global/db.js")

let localconfig = require("./config.json")
const globalconfig = require("../global/config.json")
const config = merge(localconfig, globalconfig)

let localvars = {
  config: config
}
const globalvars = require("../global/vars.js")
const vars = merge(localvars, globalvars)


const fn = require("../global/fn.js")
// const locations = require("./locations.js")
const locations = db.emap

const prefix = config.prefix

vars.botperms = {
  0: "Basic User",
  1: "Server Staff Member",
  2: "Server Moderator",
  3: "Server Administrator",
  4: "Bot Administrator",
  5: "Global Administrator",
  6: "Bot Owner"
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
  config: vars.config,
  moment: require("moment")
}

exports.data.list = Object.getOwnPropertyNames(exports.data)