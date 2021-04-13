/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (() => {

eval("const state = {\n  selectedLocation: 'Hell',\n  selectedUnit: 'metric',\n  currentName: '',\n  currentDesc: '',\n  currentIconUrl: '',\n  currentTemp: '',\n  currentFeelsLike: '',\n  currentCountry: '',\n};\n\nconst inputEl = document.querySelector('#location-input');\nconst searchBtn = document.querySelector('#search-btn');\n\nconst mainEl = document.querySelector('main');\n\nconst locationEl = document.querySelector('#location');\nconst weatherIconEl = document.querySelector('#weather-icon');\nconst tempEl = document.querySelector('#temp');\nconst weatherDescEl = document.querySelector('#weather-desc');\n\nconst cBtn = document.querySelector('#C-btn');\nconst fBtn = document.querySelector('#F-btn');\n\nconst loadingOverlay = document.querySelector('#loading-overlay');\n\nfunction filterWeatherData(weatherData) {\n  const entriesArr = Object.entries(weatherData);\n  const filteredEntriesArr = entriesArr.filter(([key]) => {\n    if (key === 'weather' || key === 'main' || key === 'name' || key === 'sys') {\n      return true;\n    }\n    return false;\n  });\n\n  const filteredWeatherData = {};\n  filteredEntriesArr.forEach(([key, value]) => {\n    filteredWeatherData[key] = value;\n  });\n\n  return filteredWeatherData;\n}\n\nasync function getWeatherData(location, unit) {\n  try {\n    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${unit}&appid=179bae8745da1a9cdaae471cc6487a0f`;\n    const response = await fetch(url);\n    const weatherData = await response.json();\n    const filteredWeatherData = filterWeatherData(weatherData);\n    return filteredWeatherData;\n  } catch (error) {\n    throw new Error('Error occured');\n  }\n}\n\nfunction updateCurrentState(weatherData) {\n  state.currentName = weatherData.name;\n  state.currentDesc = weatherData.weather[0].description;\n  state.currentIconUrl = `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`;\n  state.currentTemp = Math.round(weatherData.main.temp);\n  state.currentFeelsLike = Math.round(weatherData.main.feels_like);\n  state.currentCountry = weatherData.sys.country;\n}\n\nfunction renderData() {\n  locationEl.textContent = `${state.currentName}, ${state.currentCountry}`;\n  weatherIconEl.setAttribute('src', state.currentIconUrl);\n\n  let unitText;\n  if (state.selectedUnit === 'metric') {\n    unitText = '°C';\n  } else if (state.selectedUnit === 'imperial') {\n    unitText = '°F';\n  }\n  tempEl.textContent = `${state.currentTemp}${unitText}`;\n\n  weatherDescEl.textContent = `Feels like ${state.currentFeelsLike}${unitText}. ${state.currentDesc}`;\n}\n\nsearchBtn.addEventListener('click', async () => {\n  loadingOverlay.style.display = 'flex';\n  state.selectedLocation = inputEl.value;\n  const weatherData = await getWeatherData(state.selectedLocation, state.selectedUnit);\n  if (state.selectedLocation === '' || Object.entries(weatherData).length === 0) {\n    mainEl.classList.add('display-none');\n    loadingOverlay.style.display = 'none';\n    return;\n  }\n\n  mainEl.classList.remove('display-none');\n  updateCurrentState(weatherData);\n  loadingOverlay.style.display = 'none';\n  renderData();\n});\n\ninputEl.addEventListener('keydown', async (e) => {\n  if (e.key === 'Enter') {\n    loadingOverlay.style.display = 'flex';\n    state.selectedLocation = inputEl.value;\n    const weatherData = await getWeatherData(state.selectedLocation, state.selectedUnit);\n    if (state.selectedLocation === '' || Object.entries(weatherData).length === 0) {\n      mainEl.classList.add('display-none');\n      loadingOverlay.style.display = 'none';\n      return;\n    }\n\n    mainEl.classList.remove('display-none');\n    updateCurrentState(weatherData);\n    loadingOverlay.style.display = 'none';\n    renderData();\n  }\n});\n\ncBtn.addEventListener('click', () => {\n  const inputInvalid = mainEl.classList.contains('display-none');\n  if (!inputInvalid && state.selectedUnit !== 'metric') {\n    state.selectedUnit = 'metric';\n    cBtn.classList.add('selected');\n    fBtn.classList.remove('selected');\n    state.currentTemp = Math.round((5 / 9) * (state.currentTemp - 32));\n    state.currentFeelsLike = Math.round((5 / 9) * (state.currentFeelsLike - 32));\n    renderData();\n  }\n});\n\nfBtn.addEventListener('click', () => {\n  const inputInvalid = mainEl.classList.contains('display-none');\n  if (!inputInvalid && state.selectedUnit !== 'imperial') {\n    state.selectedUnit = 'imperial';\n    fBtn.classList.add('selected');\n    cBtn.classList.remove('selected');\n    state.currentTemp = Math.round((9 / 5) * state.currentTemp + 32);\n    state.currentFeelsLike = Math.round((9 / 5) * state.currentFeelsLike + 32);\n    renderData();\n  }\n});\n\ngetWeatherData(state.selectedLocation, state.selectedUnit).then((weatherData) => {\n  updateCurrentState(weatherData);\n  renderData();\n});\n\n\n//# sourceURL=webpack://weather-app/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.js"]();
/******/ 	
/******/ })()
;