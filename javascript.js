async function getWeather(city) {
    const rawData = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=3cd7c9b2e16fbaba921ae2be63178bf9`);
    const data = await rawData.json();
    console.log(data);
}
getWeather('Oakland');