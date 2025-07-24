const birthdate = document.getElementById('birthdate');
const calculatedBtn = document.getElementById('calculatedButton');
const result = document.getElementById('result');
let birthDateValue = null;
let secondsInterval = null;
console.log("Script loaded successfully");

calculatedBtn.addEventListener("click", function (event) {
    event.preventDefault();
    const birthdateString = birthdate.value;
    birthDateValue = new Date(birthdateString);
    const ageinmilliseconds = Date.now() - birthDateValue.getTime();
    const ageinseconds = Math.round(ageinmilliseconds / 1000);
    const ageinminutes = Math.round(ageinseconds / 60);
    const ageinhours = Math.round(ageinminutes / 60);
    const ageindays = Math.round(ageinhours / 24);
    const ageinyears = (ageindays / 365.25).toFixed(2);
    const ageinmonths = (ageindays / 30.44).toFixed(2);
    let blinks = Math.round(ageinseconds / 5);
    let breaths = Math.round(ageinseconds / 4);
    let heartbeats = Math.round(ageinseconds * 1.2);
    const steps = Math.round(ageindays * 5534);
    const sleep = Math.round(ageindays * 8);
    let calories = Math.round(ageindays * 2575);
    const water = Math.round(ageindays * 2);
    const peopleDied = Math.round(ageindays * 0.000007);
    const inflationRate = 0.03;
    const inflationSinceBirth = (1 * Math.pow(1 + inflationRate, ageinyears)).toFixed(2);
    document.getElementById("form").classList.add("hidden");
    document.getElementById("label").classList.add("hidden");
    document.getElementById("birthdate").classList.add("hidden");
    document.getElementById("calculatedButton").classList.add("hidden");
    document.getElementById("temph2").classList.add("hidden");
    document.getElementById("result").classList.remove("hidden");1
    history.replaceState(null, "", location.href);

    // Populate result elements
    document.getElementById("ageYears").textContent = `Your age is: ${ageinyears}, keep scrolling to see more stats!`;
    document.getElementById("ageMonths").textContent = `If you convert it to months, it's now: ${ageinmonths}`;
    document.getElementById("ageDays").textContent = `Congrats, you have survived: ${ageindays} days`;
    document.getElementById("secondsAlive").textContent = `Let's make it to seconds, now you have made it ${ageinseconds} seconds alive, oh Yeah!, it increases every second!`;
    document.getElementById("blinks").textContent = `You're blinking every 5 second, in total you have blinked ${blinks} times`;
    document.getElementById("heartbeats").textContent = `Estimated heartbeats: ${heartbeats}`;
    document.getElementById("breaths").textContent = `Estimated breaths: ${breaths}`;
    document.getElementById("stepsWalked").textContent = `Steps walked: ${steps}, walk daily to stay healthy!`;
    document.getElementById("sleepTime").textContent = `Sleep time ${sleep} hours, 1/3 of your life, you are sleeping!`;
    document.getElementById("caloriesConsumed").textContent = `Estimated calories consumed: ${calories}`;
    document.getElementById("waterDrunk").textContent = `Liters of water drunk: ${water}, if you stay hydrated!`;
    document.getElementById("inflationValue").textContent = `$1 at your birth was worth $${inflationSinceBirth}`;
    document.getElementById("deathsSinceBirth").textContent = `Congrats you've made it till today, because 5% people cant make it`;
    if (secondsInterval) clearInterval(secondsInterval);

    secondsInterval = setInterval(() => {
        const now = Date.now();
        const ageInSeconds = Math.floor((now - birthDateValue.getTime()) / 1000);
        document.getElementById("secondsAlive").textContent = `Let's make it to seconds, now you have made it ${ageInSeconds.toLocaleString()} seconds alive, oh Yeah!, it increases every second!`;


        // Update blinks (every 5 seconds)
        blinks = Math.round(ageInSeconds / 5);
        document.getElementById("blinks").textContent =
            `You're blinking every 5 second, in total you have blinked ${blinks.toLocaleString()} times`;

        // Update heartbeats (1.2 per second)
        heartbeats = Math.round(ageInSeconds * 1.2);
        document.getElementById("heartbeats").textContent =
            `Your estimated heartbeat, ${heartbeats.toLocaleString()}, it's an estimate, to be honest all of these are estimates!`;

        // Update breaths (every 4 seconds)
        breaths = Math.round(ageInSeconds / 4);
        document.getElementById("breaths").textContent =
            ` You have breathen ${breaths.toLocaleString()} times`;

        // Update calories (2000 per day)
        // Calories: ~1 calorie burned every 43.2 seconds
        const secondsPerCalorie = 43.2;
        const caloriesBurned = Math.floor(ageInSeconds / secondsPerCalorie);

        document.getElementById("caloriesConsumed").textContent =
            `You've burned about ${caloriesBurned.toLocaleString()} calories just by existing!`;

    }, 1000);

    // After setting all results — activate scroll-based visibility
    const stats = result.querySelectorAll(".stat");

    function getClosestToCenter() {
        const containerRect = result.getBoundingClientRect();
        const containerCenter = containerRect.top + containerRect.height / 2;

        let closest = null;
        let closestDistance = Infinity;

        stats.forEach(stat => {
            const rect = stat.getBoundingClientRect();
            const statCenter = rect.top + rect.height / 2;
            const distance = Math.abs(containerCenter - statCenter);

            if (distance < closestDistance) {
                closestDistance = distance;
                closest = stat;
            }
        });

        return closest;
    }

    function updateVisibility() {
        const visibleStat = getClosestToCenter();

        stats.forEach(stat => {
            if (stat === visibleStat) {
                stat.classList.add("fade-in");
                stat.classList.remove("fade-out");
            } else {
                stat.classList.remove("fade-in");
                stat.classList.add("fade-out");
            }
        });
    }

    result.addEventListener("scroll", updateVisibility);
    updateVisibility(); // Initial call
});
