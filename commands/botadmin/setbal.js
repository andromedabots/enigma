module.exports.run = async (client, message, args) => {
	const re = message.re
	let user = re.fn.getuser(args[0], message)
	if(!user) return message.channel.send("You must specify a person to set the balance of!")
	let bal = parseInt(args[1])
	if(!bal) return message.channel.send(`Invalid number! Please make sure you specify a vaild number to set the balance as!`)

	await re.db.eusers.findOneAndUpdate({user: user.id}, {balance: bal})
	message.channel.send(`You have successfully set ${user.user.tag}'s balance to ${bal}!`)
}

module.exports.help = {
	name: `${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`,
	description: "Set the balance of another user",
	syntax:`${__filename.split(`${__dirname}/`).pop().split(`.`).shift()} <user> <balance>`,
	alias: ["setbalance"],
	module: `${__dirname.split(`/`).pop()}`,
	access: { level: 4 },
}
