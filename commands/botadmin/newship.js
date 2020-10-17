const re = require(`../../resources.js`).data
module.exports.run = async (client, message, args) => {
	let ship = {
		name: "",
		id: "",
		damage: 0,
		attack_speed: 0,
		health: 0,
		shield: 0,
		slots: 0,
		speed: 0,
	}

	let m = await message.channel.send(
		"Yay its time to make a new ship! What do you want to call this ship?"
	)

	let input = await m.channel
		.awaitMessages((msg) => msg.author.id == message.author.id, {
			time: 30 * 1000,
			max: 1,
			errors: ["time"],
		})
		.catch(() => {})
	if (!input) return await message.channel.send("Prompt timed out.")
	input = input.first().content
	ship.name = input

	ship.id = ship.name.toLowerCase().replace(/[^a-z0-9\_\-]/g, "")

	await message.channel.send("What is the base health of this ship?")
	input = await m.channel
		.awaitMessages((msg) => msg.author.id == message.author.id, {
			time: 30 * 1000,
			max: 1,
			errors: ["time"],
		})
		.catch(() => {})
	if (!input) return await message.channel.send("Prompt timed out.")
	input = parseInt(input.first().content)
	if (!input && input != 0)
		return message.channel.send(input + " is an invalid number!")
	ship.health = parseInt(input)

	await message.channel.send("What is the speed of this ship?")
	input = await m.channel
		.awaitMessages((msg) => msg.author.id == message.author.id, {
			time: 30 * 1000,
			max: 1,
			errors: ["time"],
		})
		.catch(() => {})
	if (!input) return await message.channel.send("Prompt timed out.")
	input = parseInt(input.first().content)
	if (!input && input != 0)
		return message.channel.send(input + " is an invalid number!")
	ship.speed = parseInt(input)

	await message.channel.send("What is the total number of slots on this ship?")
	input = await m.channel
		.awaitMessages((msg) => msg.author.id == message.author.id, {
			time: 30 * 1000,
			max: 1,
			errors: ["time"],
		})
		.catch(() => {})
	if (!input) return await message.channel.send("Prompt timed out.")
	input = parseInt(input.first().content)
	if (!input && input != 0)
		return message.channel.send(input + " is an invalid number!")
	ship.slots = parseInt(input)

	await re.db.eship(ship).save()

	message.channel.send("Success!")
	message.channel.send(ship)
}

module.exports.help = {
	name: `${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`,
	description: "Add a ship to the Enigma database",
	syntax: `${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`,
	alias: [],
	module: `${__dirname.split(`/`).pop()}`,
	access: { level: 4 },
}
