async function getWeather(city) {
    const rawData = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=3cd7c9b2e16fbaba921ae2be63178bf9`);
    const data = await rawData.json();
    return data;
}
function updateCity(city) {

}



const searchBar = document.getElementById('search');

document.getElementById('searchImg').addEventListener('click', () => {
    if(searchBar.value) {
        console.log(searchBar.value);
        searchBar.value = '';
    }
})

searchBar.addEventListener('keyup', (e)=> {
    if(e.keyCode === 13) {
        e.preventDefault();
        document.getElementById('searchImg').click();
    }
})
