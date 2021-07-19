const launches = new Map()

let latesFlightNumber = 100

const launch = {
    fightNumber: 100,
    mission: "kepler Exploration X",
    rocket: 'Explorer IS1',
    launchDate: new Date('December 27, 2030'), // stored it like data obj
    target: 'Kepler-442 b',
    customer: ['MUN', 'NASA'],
    upcoming: true,
    success: true
}

launches.set(launch.fightNumber, launch)

function existLaunchWithId(launchId) {
    return launches.has(launchId)
}

function getAllLaunches() {
    return Array.from(launches.values())
}

function addNewLaunch(launch) {
    latesFlightNumber++
    launches.set(
        latesFlightNumber, 
        Object.assign(launch, { // new will be overwrite in launche, so return a new obj in here with fightNumber like a key
            success: true,
            upcoming: true,
            customer: ['MUN', 'NASA'],
            fightNumber: latesFlightNumber, 
    }))
}

function abortLaunchId(launchId) {
    console.log(launches);
    const aborted = launches.get(launchId)
    aborted.upcoming = false
    aborted.success = false

    return aborted
}


module.exports = {
    getAllLaunches,
    addNewLaunch,
    existLaunchWithId,
    abortLaunchId,
}