const re = require(`../resources.js`).data

re.client.on("messageDelete", (message) => {
  //re.dbs.snipe.set(message.channel.id, {"author": message.author, "content": message.content, "time": message.createdAt})
});