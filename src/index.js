const state = {
  selectedLocation: 'Hell',
  selectedUnit: 'metric',
  currentName: '',
  currentDesc: '',
  currentIconUrl: '',
  currentTemp: '',
  currentFeelsLike: '',
  currentCountry: '',
};

const inputEl = document.querySelector('#location-input');
const searchBtn = document.querySelector('#search-btn');

const mainEl = document.querySelector('main');

const locationEl = document.querySelector('#location');
const weatherIconEl = document.querySelector('#weather-icon');
const tempEl = document.querySelector('#temp');
const weatherDescEl = document.querySelector('#weather-desc');

const cBtn = document.querySelector('#C-btn');
const fBtn = document.querySelector('#F-btn');

const loadingOverlay = document.querySelector('#loading-overlay');

function filterWeatherData(weatherData) {
  const entriesArr = Object.entries(weatherData);
  const filteredEntriesArr = entriesArr.filter(([key]) => {
    if (key === 'weather' || key === 'main' || key === 'name' || key === 'sys') {
      return true;
    }
    return false;
  });

  const filteredWeatherData = {};
  filteredEntriesArr.forEach(([key, value]) => {
    filteredWeatherData[key] = value;
  });

  return filteredWeatherData;
}

async function getWeatherData(location, unit) {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${unit}&appid=179bae8745da1a9cdaae471cc6487a0f`;
    const response = await fetch(url);
    const weatherData = await response.json();
    const filteredWeatherData = filterWeatherData(weatherData);
    return filteredWeatherData;
  } catch (error) {
    throw new Error('Error occured');
  }
}

function updateCurrentState(weatherData) {
  state.currentName = weatherData.name;
  state.currentDesc = weatherData.weather[0].description;
  state.currentIconUrl = `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`;
  state.currentTemp = Math.round(weatherData.main.temp);
  state.currentFeelsLike = Math.round(weatherData.main.feels_like);
  state.currentCountry = weatherData.sys.country;
}

function renderData() {
  locationEl.textContent = `${state.currentName}, ${state.currentCountry}`;
  weatherIconEl.setAttribute('src', state.currentIconUrl);

  let unitText;
  if (state.selectedUnit === 'metric') {
    unitText = '°C';
  } else if (state.selectedUnit === 'imperial') {
    unitText = '°F';
  }
  tempEl.textContent = `${state.currentTemp}${unitText}`;

  weatherDescEl.textContent = `Feels like ${state.currentFeelsLike}${unitText}. ${state.currentDesc}`;
}

searchBtn.addEventListener('click', async () => {
  loadingOverlay.style.display = 'flex';
  state.selectedLocation = inputEl.value;
  const weatherData = await getWeatherData(state.selectedLocation, state.selectedUnit);
  if (state.selectedLocation === '' || Object.entries(weatherData).length === 0) {
    mainEl.classList.add('display-none');
    loadingOverlay.style.display = 'none';
    return;
  }

  mainEl.classList.remove('display-none');
  updateCurrentState(weatherData);
  loadingOverlay.style.display = 'none';
  renderData();
});

inputEl.addEventListener('keydown', async (e) => {
  if (e.key === 'Enter') {
    loadingOverlay.style.display = 'flex';
    state.selectedLocation = inputEl.value;
    const weatherData = await getWeatherData(state.selectedLocation, state.selectedUnit);
    if (state.selectedLocation === '' || Object.entries(weatherData).length === 0) {
      mainEl.classList.add('display-none');
      loadingOverlay.style.display = 'none';
      return;
    }

    mainEl.classList.remove('display-none');
    updateCurrentState(weatherData);
    loadingOverlay.style.display = 'none';
    renderData();
  }
});

cBtn.addEventListener('click', () => {
  const inputInvalid = mainEl.classList.contains('display-none');
  if (!inputInvalid && state.selectedUnit !== 'metric') {
    state.selectedUnit = 'metric';
    cBtn.classList.add('selected');
    fBtn.classList.remove('selected');
    state.currentTemp = Math.round((5 / 9) * (state.currentTemp - 32));
    state.currentFeelsLike = Math.round((5 / 9) * (state.currentFeelsLike - 32));
    renderData();
  }
});

fBtn.addEventListener('click', () => {
  const inputInvalid = mainEl.classList.contains('display-none');
  if (!inputInvalid && state.selectedUnit !== 'imperial') {
    state.selectedUnit = 'imperial';
    fBtn.classList.add('selected');
    cBtn.classList.remove('selected');
    state.currentTemp = Math.round((9 / 5) * state.currentTemp + 32);
    state.currentFeelsLike = Math.round((9 / 5) * state.currentFeelsLike + 32);
    renderData();
  }
});

getWeatherData(state.selectedLocation, state.selectedUnit).then((weatherData) => {
  updateCurrentState(weatherData);
  renderData();
});
