const api = {
  //THIS IS an OBJECT, THATS WHY WE WRITE IT LIKE THIS
  //link till slash, after 2.5
  endpoint: "https://api.openweathermap.org/data/2.5/",
  //KEY
  key: "6534c5e39d030252f3e4e49996bff19c",
}
const input = document.querySelector("#input")
input.addEventListener("keypress", enter)
//1 IF - 13/ENTER
//2 - SEARCH
function enter(e) {
  if (e.keyCode === 13) {
    //TO ACCES INFO FROM INPUT (what user types) WE WRITE (input.value)
    getInfo(input.value)
  }
}
//1-WRITING FUNCTION AND CONNECTING IT WITH ENTER KEY
//getting info from api.
//2-note: if we leave this function empty without any parameters inside (), our info will not be stored anywhere. Thats why we give a parameter(data) to this function.
//3- we need to create const so info stored there.
//We creating function which will be responsible for searching data.
async function getInfo(data) {
  const res = await fetch(
    `${api.endpoint}weather?q=${data}&units=metric&appID=${api.key}`
  )
  const result = await res.json()
  //4- Creating function which will be responsible for displaying result of search on our app
  //First we got access to all info through search. Now we add this paramether (result) to display this information on the app.
  displayResult(result)
}
function displayResult(result) {
  let city = document.querySelector("#city")
  city.textContent = `${result.name}, ${result.sys.country}`
  //date
  getOurDate()
  let temperature = document.querySelector("#temperature")
  temperature.innerHTML = `${Math.round(result.main.temp)}<span>°</span>`
  let feelsLike = document.querySelector("#feelsLike")
  feelsLike.innerHTML =
    "Feels like:" + " " + `${Math.round(result.main.feels_like)}<span>°</span>`
  let conditions = document.querySelector("#conditions")
  conditions.textContent = `${result.weather[0].main}`
  let variations = document.querySelector("#variations")
  variations.innerHTML =
    "Min: " +
    `${Math.round(result.main.temp_min)}<span>°</span> ` +
    "Max: " +
    `${Math.round(result.main.temp_max)}<span>°</span>`
}
function getOurDate() {
  //1-Todays date(poluchaem dostup ko vsei date)
  const myDate = new Date()
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ]
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]
  //2-Day
  let day = days[myDate.getDay()]
  //3- Date
  let todayDate = myDate.getDate()
  //4- Month
  let month = months[myDate.getMonth()]
  //5-Year
  let year = myDate.getFullYear()
  //
  let showDate = document.querySelector("#date")
  showDate.textContent = `${day} ` + `${todayDate} ` + `${month} ` + `${year}`
}
