module.exports.run = async (client, message, args) => {
	const re = message.re

	let euser = await re.db.eusers.findOne({ user: message.author.id }).exec()
	if (euser) return message.channel.send("You're already in the Enigma!")

	// let voul = Object.keys(Object.filter(re.l, x => x.map == "voulat"))
	// let loc = re.fn.getRandom(0, voul.length)

	voul = [
		"veilan",
		"imia",
		"kenox",
		"whuv",
		"deia",
		"zyrneus",
		"remsea",
		"valquin",
		"nexus",
		"sennar",
		"iantus",
		"talmdai",
		"dikarva",
		"jynadi",
		"lahilkeil",
	]
	let loc = re.fn.getRandom(0, voul.length)

	euser = {
		user: message.author.id,
		location: voul[loc],
		inventory: {
			ships: [{id: "federalvoyager", custom: false}]
		}
	}
	await re.db.eusers(euser).save()

	message.channel.send(
		new re.Discord.MessageEmbed()
			.setTitle("Welcome to the Enigma!")
			.setDescription("Paradox is gonna write a cool intro for here even though I haven't told him yet!\n")
			.setColor(re.config.color)
			.setFooter(`You are now in ${re.func.capitalizeFirstLetter(euser.location)} as of`)
			.setTimestamp()
	)
}

module.exports.help = {
	name: `${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`,
	description: `Join the Enigma`,
	syntax: `${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`,
	alias: ["initalize", "join"],
	module: `${__dirname.split(`/`).pop()}`,
	access: { level: 0, mm: null },
}
