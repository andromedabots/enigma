const re = require(`../../resources.js`).data
module.exports.run = async (client, message, args) => {
	return message.channel.send(
		`\`\`\`js\n*eval re.db.emap({\n  system: "",\n  map: "",\n  structures: [],\n  warpTo: [],\n  travelTo: []\n}).save()\`\`\`\nFill out this command and sent it to add a system!\nItems in \`[]\` should be listed like this: \`["item1", "item2", "item3"]\`\ntravelTo is for locations you can jump to, warpTo is for locations you can warp to.\nStructures should only use any of the following:\n\`\`\`js\n["station", "star", "faction_empire", "delta_forge", "citadel", "anomaly", "trading_station", "planet", "colosseum", "black_market", "auction_house", "government", "arcade", "pub", "dock", "diplomacy_hub", "archive", "pulse", "paragon", "ruin", "asteroid", "temple", "quantum_forge", "university", "hostile_wreck"]\`\`\`.`
	)

	let item = {
		system: "",
		map: "",
		structures: [],
		warpTo: [],
		travelTo: [],
	}

	let m = await message.channel.send(
		"Yay its time to make a new system! What do you want to call this system? (All lowercase, no punctuation)"
	)
	let input = await m.channel
		.awaitMessages((msg) => msg.author.id == message.author.id, {
			time: 30 * 1000,
			max: 1,
			errors: ["time"],
		})
		.catch(() => {})
	if (!input) return await m.edit("Prompt timed out.")
	input = input.first().content
	item.name = input

	item.id = item.name.toLowerCase().replace(/[^a-z0-9\_\-]/g, "")

	// m = await message.channel.send("How much should this item cost?")
	await m.edit("What map is this system in?")
	input = await m.channel
		.awaitMessages((msg) => msg.author.id == message.author.id, {
			time: 30 * 1000,
			max: 1,
			errors: ["time"],
		})
		.catch(() => {})
	if (!input) return await m.edit("Prompt timed out.")
	input = input.first().content
	item.price = parseInt(input, 10)

	// m = await message.channel.send("How much should this item damage?")
	await m.edit("How much should this item damage?")
	input = await m.channel
		.awaitMessages((msg) => msg.author.id == message.author.id, {
			time: 30 * 1000,
			max: 1,
			errors: ["time"],
		})
		.catch(() => {})
	if (!input) return await m.edit("Prompt timed out.")
	input = input.first().content
	item.damage = parseInt(input, 10)

	// m = await message.channel.send("How much should this item heal?")
	await m.edit("How much should this item heal?")
	input = await m.channel
		.awaitMessages((msg) => msg.author.id == message.author.id, {
			time: 30 * 1000,
			max: 1,
			errors: ["time"],
		})
		.catch(() => {})
	if (!input) return await m.edit("Prompt timed out.")
	input = input.first().content
	item.heal = parseInt(input, 10)

	// m = await message.channel.send("How much health should this item add?")
	await m.edit("How much health should this item add?")
	input = await m.channel
		.awaitMessages((msg) => msg.author.id == message.author.id, {
			time: 30 * 1000,
			max: 1,
			errors: ["time"],
		})
		.catch(() => {})
	if (!input) return await m.edit("Prompt timed out.")
	input = input.first().content
	item.addhealth = parseInt(input, 10)

	message.channel.send(JSON.stringify(item, null, 4), { code: "fix" })
	re.dbs.items.set(message.guild.id + "." + item.id, item)
}

module.exports.help = {
	name: `${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`,
	description: "Add a system to the Enigma database",
	syntax:`${__filename.split(`${__dirname}/`).pop().split(`.`).shift()} <user> <balance>`,
	alias: [],
	module: `${__dirname.split(`/`).pop()}`,
	access: { level: 4 },
}