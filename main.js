const app = document.querySelector('.weather-app');
const temp = document.querySelector('.temp');
const dateOutput = document.querySelector('.date');
const timeOutput = document.querySelector('.time');
const conditionOutput = document.querySelector('.condition');
const nameOutput = document.querySelector('.name');
const icon= document.querySelector('.icon');
const CloudOutput= document.querySelector('.cloud');
const HumidityOutput= document.querySelector('.humidity');
const WindOutput= document.querySelector('.wind');
const form = document.getElementById('locationInput');
const search = document.querySelector('.search');
const btn = document.querySelector('.submit');
const cities = document.querySelectorAll('.city');
// const iconId = document.querySelector('.weather');
const iconId = document.getElementById('image');

let cityInput = "Jamshedpur";

cities.forEach((city) => {
    city.addEventListener('click', (e) => {
        cityInput = e.target.innerHTML;
        fetchWeatherData();
        press();
        app.style.opacity = "0";
    });
})

form.addEventListener('submit', (e) => {
    // e.preventDefault();
    if(search.value.length == 0){
        error();
        alert('Please type in a city name');
    }else{
        cityInput= search.value;
        fetchWeatherData();
        press();
        search.value="";
        app.style.opacity = "0";
    }
    e.preventDefault();
});
function dayOfTheWeek(day,month,year) {
    const weekday=[
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];
    return weekday[new Date(`${day}/${month}/${year}`).getDay()];
};
function fetchWeatherData()
{
    fetch(`https://api.weatherapi.com/v1/current.json?key=e614a8df0f6c4eee933231055252601&q=${cityInput}`)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        CloudOutput.innerHTML = data.current.cloud + "%"
        HumidityOutput.innerHTML = data.current.humidity + "%"
        WindOutput.innerHTML = data.current.wind_mph + "mph"
        temp.innerHTML = data.current.temp_c+ "&#176;";
        conditionOutput.innerHTML = data.current.condition.text;

        const date =  data.location.localtime;
        const y = parseInt(date.substr(0,4));
        const d = parseInt(date.substr(5,2));
        const m = parseInt(date.substr(8,2));
        const time= date.substr(11);
        dateOutput.innerHTML =`${dayOfTheWeek(d, m ,y)} ${m} / ${d} / ${y}`;
        timeOutput.innerHTML = time;
        nameOutput.innerHTML = data.location.name;
        // const iconId = data.current.condition.icon.substr("//cdn.weatherapi.com/weather/64x64/".length);
        // icon.src="images/"+iconId;
        const a = data.current.condition.text;
        iconId.src="images/"+ a+".png";
        CloudOutput.innerHTML = data.current.cloud + "%";
        HumidityOutput.innerHTML= data.current.humidity + "%";
        WindOutput.innerHTML = data.current.wind_kph + "km/h";

        let timeOfDay = "day";{
            const code = data.current.condition.code;
            if (!data.current.is_day){
                timeOfDay = "night";
            }
            
            if(code == 1000) {
                app.style.backgroundImage =`url(./${timeOfDay}/clear.jpg)`;
                btn.style.background="#e5ba92";
                if(timeOfDay == "night")
                    {
                    btn.style.background = "#181e27";
                }
            }
            else if(
                code == 1003 ||
                code == 1006 ||
                code == 1009 ||
                code == 1030 ||
                code == 1069 ||
                code == 1087 ||
                code == 1135 ||
                code == 1273 ||
                code == 1276 ||
                code == 1279 ||
                code == 1282
            ) {
                app.style.backgroundImage = `url(./${timeOfDay}/cloudy.jpg)`;
                btn.style.background= "#E7D283";
                if(timeOfDay === "night"){
                    btn.style.background= "#181e27";
                }
            }
            else if(
                code== 1063 ||
                code== 1069 ||
                code== 1072 ||
                code== 1150 ||
                code== 1153 ||
                code== 1180 ||
                code== 1183 ||
                code== 1186 ||
                code== 1189 ||
                code== 1192 ||
                code== 1195 ||
                code== 1204 ||
                code== 1207 ||
                code== 1240 ||
                code== 1243 ||
                code== 1246 ||
                code== 1249 ||
                code== 1252 
            ){
                app.style.backgroundImage=`url(./${timeOfDay}/rainy.jpg)`;
                btn.style.background = "#325c80";
            }else{
                app.style.backgroundImage=`url(./${timeOfDay}/snowy.jpg)`;
                btn.style.background = "#4d72aa";
                if(timeOfDay == "night"){
                    btn.style.background = "#1b1b1b";
                }
            }
            app.style.opacity ="1";
            
        }
    })
    .catch(() => {
        app.style.opacity="1";
    });
    
}
fetchWeatherData();

app.style.opacity="1";

async function press() {
    try {
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=e614a8df0f6c4eee933231055252601&q=${cityInput}`);
        const data = await response.json();

        const text = `The temperature at ${cityInput} is ${data.current.temp_c} degrees Celsius with ${data.current.condition.text} conditions`;

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.pitch = 1;

        
        window.speechSynthesis.speak(utterance);
    } catch (error) {
        console.error("Error fetching weather data:", error);
        const utterance = new SpeechSynthesisUtterance("Please type in a valid city name.");
        window.speechSynthesis.speak(utterance);
    }
}



async function error(){
    const text="Please type in a city name"
    const utterance= new SpeechSynthesisUtterance(text);
    utterance.pitch=1;
    window.speechSynthesis.speak(utterance);
}

