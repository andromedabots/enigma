const re = require(`../../resources.js`).data
module.exports.run = async (client, message, args) => {
	let structure = {
		system: "",
		name: "",
		id: "",
		type: "",
	}

	let m = await message.channel.send(
		"Yay its time to make a new structure! What do you want to call this structure?"
	)
	while (!structure.name) {
		let input = await m.channel
			.awaitMessages((msg) => msg.author.id == message.author.id, {
				time: 30 * 1000,
				max: 1,
				errors: ["time"],
			})
			.catch(() => {})
		if (!input) return await m.edit("Prompt timed out.")
		input = input.first().content
		structure.name = input
	}

	structure.id = structure.name.toLowerCase().replace(/[^a-z0-9\_\-]/g, "")

	while (!structure.system) {
		await m.edit("What system is this structure in?")
		input = await m.channel
			.awaitMessages((msg) => msg.author.id == message.author.id, {
				time: 30 * 1000,
				max: 1,
				errors: ["time"],
			})
			.catch(() => {})
		if (!input) return await m.edit("Prompt timed out.")
		input = input.first().content
		let scheck = await re.db.emap.findOne({ system: input }).exec()
		if (!scheck) {
			m.edit("System not found! Please try again")
		} else {
			structure.system = input
		}
	}

	while (!structure.type) {
		await m.edit("What type of structure is this?")
		input = await m.channel
			.awaitMessages((msg) => msg.author.id == message.author.id, {
				time: 30 * 1000,
				max: 1,
				errors: ["time"],
			})
			.catch(() => {})
		if (!input) return await m.edit("Prompt timed out.")
		input = input.first().content
		if (
			![
				"station",
				"star",
				"faction_empire",
				"delta_forge",
				"citadel",
				"anomaly",
				"trading_station",
				"planet",
				"colosseum",
				"black_market",
				"auction_house",
				"government",
				"arcade",
				"pub",
				"dock",
				"diplomacy_hub",
				"archive",
				"pulse",
				"paragon",
				"ruin",
				"asteroid",
				"temple",
				"quantum_forge",
				"university",
				"hostile_wreck",
			].includes(input)
		) {
			return m.edit("That is an invalid type, please try again!")
		} else {
			structure.type = input
		}
	}
	await re.db.structures(structure).save()
	m.edit("Success!")
}

module.exports.help = {
	name: `${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`,
	description: "Add a structure to the Enigma database",
	syntax: `${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`,
	alias: [],
	module: `${__dirname.split(`/`).pop()}`,
	access: { level: 4 },
}
