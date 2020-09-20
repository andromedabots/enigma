const re = require(`../resources.js`).data

re.client.on("messageUpdate", (oldmsg, newmsg) => {
  newmsg.thisisedit = true
  if(oldmsg.content != newmsg.content) re.client.emit("message", newmsg)
});