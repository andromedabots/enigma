const re = require(`./resources.js`).data
const CronJob = re.vars.cron.CronJob;
const cronjob = new CronJob("0 0 * * *", () => {
  cronlog(run())
});
cronjob.start()

const list = ["asteroids"]

const cronlog = (msg) => {
  re.client.channels.cache.get(re.config.cronlogs).send(msg)
  console.log(msg)
}

const asteroids = () => {
    let locs = re.config.asteroidloc
    //TODO: finish this
}

const run = (limit = list) => {
    if(limit.includes("asteroids")) asteroids()
    return `Cron ran successfully for: ${limit}`
}

module.exports = {run, list, cronjob}

cronlog("Cron initalized")
