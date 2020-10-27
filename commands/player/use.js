module.exports.run = async (client, message, args) => {
    const re = message.re
    let euser = message.author.euser, item = await re.db.eitem.findOne({id: args[0]}).exec()
    if(!item) return message.channel.send("Unable to find that item!")
    if(!euser.inventory.items.find((x) => x.id == item.id)) return message.channel.send("You do not have that item!")

    let slots = euser.inventory.ships.find(x => x.id == item.id).slots
    
};
  
  module.exports.help = {
    name:`${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`,
    description:`Use an item`,
    syntax:`${__filename.split(`${__dirname}/`).pop().split(`.`).shift()} <item ID>`,
    alias:[],
    module:`${__dirname.split(`/`).pop()}`,
    access: {level: 0, mm: null}
  }
  