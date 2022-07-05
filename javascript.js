async function getWeather(city) {
  try {
    const rawData = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=3cd7c9b2e16fbaba921ae2be63178bf9&units=imperial`);
    const data = await rawData.json();
    return data;
  } catch (e) {
    console.log(e);
  }
}
async function getImage(query) {
  const res = await fetch(`https://api.unsplash.com/search/photos?client_id=cf3qwBVWad_a_okzh3uH2F82IXA3hYLcbAgZFoMDj2w&page=1&query=${query}`);
  const resjson = await res.json();
  return resjson.results[0].urls.full;
}
function formatAMPM(date) {
  let hours = date.getUTCHours();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours %= 12;
  hours = hours || 12; // the hour '0' should be '12'
  const strTime = `${hours}:` + '00' + ` ${ampm}`;
  return strTime;
}
function updateCity(data) {
  if (data.cod != 200) {
    alert(data.message);
    return false;
  }

  getImage(data.name).then((res) => {
    document.body.style.background = `linear-gradient( rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1) ), url('${res}')`;
  });
  console.log(data);
  const stats = document.getElementById('stats');
  const d = new Date((data.dt + data.timezone) * 1000);
  console.log(d.toUTCString());
  const weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  stats.children[0].innerHTML = `${weekday[d.getUTCDay()]} ${formatAMPM(d)}`;
  stats.children[1].innerHTML = `Wind Speed: ${data.wind.speed} mph`;
  stats.children[2].innerHTML = `Humidity: ${data.main.humidity}%`;
  stats.children[3].innerHTML = `Pressure: ${data.main.pressure} hPa`;
  const mainInfo = document.getElementById('mainInfo');
  mainInfo.children[0].innerHTML = `${data.name}, ${data.sys.country}`;
  mainInfo.children[1].innerHTML = `${Math.floor(data.main.temp)}°`;
  mainInfo.children[2].innerHTML = data.weather[0].description;
  mainInfo.children[3].innerHTML = `H: ${Math.floor(data.main.temp_max)}°`;
  mainInfo.children[4].innerHTML = `L: ${Math.floor(data.main.temp_min)}°`;
  return true;
}
getWeather('New York').then((data) => { updateCity(data); });

const searchBar = document.getElementById('search');

document.getElementById('searchImg').addEventListener('click', () => {
  if (searchBar.value) {
    getWeather(searchBar.value).then((data) => {
      updateCity(data);
    });
    searchBar.value = '';
  }
});
searchBar.addEventListener('keyup', (e) => {
  if (e.keyCode === 13) {
    e.preventDefault();
    document.getElementById('searchImg').click();
  }
});
