const re = require(`../resources.js`).data
re.client.on("guildCreate", async guild => {
  console.log(`New Guild: ${guild.name} (${guild.id})\n - Member Count: ${guild.memberCount}`)
  re.client.emit("botlog", `New Guild: ${guild.name} (${guild.id})\n - Member Count: ${guild.memberCount}`)
  re.client.user.setActivity(`${re.client.users.cache.size} members in ${re.client.guilds.cache.size} servers use ${re.config.prefix} help.`, { type: 'WATCHING' })
});
