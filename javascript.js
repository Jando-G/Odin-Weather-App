async function getWeather(city) {
    const rawData = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=3cd7c9b2e16fbaba921ae2be63178bf9`);
    const data = await rawData.json();
    return data;
}
let name = getWeather('Oakland').then(data => {
    console.log(data)
})