const re = require(`./resources.js`).data
const CronJob = re.vars.cron.CronJob
const cronjob = new CronJob("0 0 * * *", async () => {
  cronlog(await run())
}, null, true, 'America/New_York');
cronjob.start()

const list = ["asteroids", "test"]

const cronlog = async (msg) => {
  re.client.channels.cache.get(re.config.cronlogs).send(msg)
  console.log(msg)
}

const asteroids = async () => {
  let alla = await re.db.estructure.find({ type: "asteroid" }).exec()
  if (alla.length >= 200) return `- Asteroid count already at 200`
  let astdo = 200 - alla.length,
    asteroidloc = re.config.asteroidloc
  for (let i = alla; i <= 200; i++) {
    let id = re.fn.twoid(), material = re.config.materials[re.fn.getRandom(0, 7)]
    asteroid = {
      name: `${re.fn.capitalizeFirstLetter(material)} Asteroid`,
      id: `asteroid${id}`,
      system: asteroidloc.voulat[re.fn.getRandom(0, asteroidloc.voulat.length)],
      type: "asteroid",
      material: material
    }
    console.log(asteroid)
    await re.db.estructure(asteroid).save()
  }
  return `+ Added ${astdo} asteroids`
}

const testcron = async () => {
  console.log("Test cron 1")
  return `+ Test success!`
}

const run = async (limit) => {
  let log = ""
  if (!limit) limit = list
  if (limit.includes("asteroids")) log += (await asteroids()) + "\n"
  if (limit.includes("test")) log += (await testcron()) + "\n"
  return `Cron ran successfully for: ${limit.join(
    ", "
  )}\n\`\`\`diff\n${log}\n\`\`\``
}

module.exports = { run, list, cronjob, cronlog }

console.log("Cron initalized")
