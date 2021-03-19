"use strict";

let field = document.querySelector(".main-form__text");
let btn = document.querySelector(".main-form__submit");
let days = document.querySelector(".main-form__days");
let cityName = document.querySelector(".city-name h3");
let mainContent = document.querySelector(".main__content");
function displayWeatherBlocks(data) {
    console.log(data);
    cityName.textContent = field.value.split(",")[0];
    mainContent.innerHTML = "";

    for (let i = 0; i < data.length; i++) {
        let min =
            data[i].min_temp.toFixed(1) > 0
                ? "+" + data[i].min_temp.toFixed(1)
                : data[i].min_temp.toFixed(1);
        let max =
            data[i].max_temp.toFixed(1) > 0
                ? "+" + data[i].max_temp.toFixed(1)
                : data[i].max_temp.toFixed(1);
        let weatherPath = data[i].weather.description.includes("sun")
            ? "http://openweathermap.org/img/wn/01d@2x.png"
            : data[i].weather.description.includes("rain")
            ? "http://openweathermap.org/img/wn/09d@2x.png"
            : data[i].weather.description.includes("snow")
            ? "http://openweathermap.org/img/wn/13d@2x.png"
            : data[i].weather.description.includes("clouds")
            ? "http://openweathermap.org/img/wn/04d@2x.png"
            : data[i].weather.description.includes("lear")
            ? "http://openweathermap.org/img/wn/01d@2x.png"
            : data[i].weather.description.includes("mist")
            ? "http://openweathermap.org/img/wn/50d@2x.png"
            : "http://openweathermap.org/img/wn/02d@2x.png";
        let block = `
        <div class="content-block">
            <div class="content__date">${data[i].datetime}</div>
            <div><img src="${weatherPath}" alt=""></div>
            <div class="content__desc">${data[i].weather.description}</div>
            <div class="content__temp-min">
                <span>${min}</span>
                <span>°C</span>
            </div>
            <div class="content__temp-max">
                <span>${max}</span>
                <span>°C</span>
            </div>
        </div>`;
        mainContent.innerHTML += block;
    }
}

btn.addEventListener("click", () => {
    let data = field.value.split(",");
    const weaterAPI = `https://api.weatherbit.io/v2.0/forecast/daily?city=${data[0]},${data[1]}&key=1651fd9bf7f242eab3de7b13cb6ad8d9&lang=en&days=${days.value}`;
    fetch(weaterAPI)
        .then((response) => response.json())
        .then((data) => displayWeatherBlocks(data["data"]));
});
