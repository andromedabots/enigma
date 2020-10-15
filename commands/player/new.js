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
			.setDescription(`The anomaly economy grows. It's a dark world out there. Conflict everywhere - they call it the final years of sanity. Enigmatic activity is the new normal. It's up to you what you do in this strange universe: the fate of existence is truly uncertain. For an detailed beginners guide, visit this link: <coming soon>\nYou will start at a random station in Voulat or Avaritia, in a Federal Corvette.\nGood luck - and be wary - you never know what dark things could be waiting to be discovered...`)
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
