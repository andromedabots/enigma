const re = require(`./resources.js`).data
const CronJob = re.vars.cron.CronJob
const cronjob = new CronJob("0 0 * * *", () => {
  cronlog(run())
})
cronjob.start()

const list = ["asteroids", "test"]

const cronlog = async (msg) => {
  re.client.channels.cache.get(re.config.cronlogs).send(msg)
  console.log(msg)
}

const asteroids = async () => {

  let locs = re.config.asteroidloc
  //TODO: finish this
}

const testcron = async () => {
  console.log("Test cron 1")
}

const run = async (limit = list) => {
  if (!limit) limit = list
  if (limit.includes("asteroids")) await asteroids()
  if (limit.includes("test")) await testcron()
  return `Cron ran successfully for: ${limit}`
}

module.exports = { run, list, cronjob, cronlog }

cronlog("Cron initalized")
