/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
port=5000;
let newDate = d.getMonth()+1 +'.'+ d.getDate()+'.'+ d.getFullYear();

//API
const myAPIKey= "33d36a7ddd531be6a2d410ed63e4f338";

let url = null;
const generate= document.querySelector("#generate");

generate.addEventListener("click",   ()=>{
    const ZIPCode= document.querySelector("#zip").value;
    const feelings= document.querySelector("#feelings").value;
    url= `https://api.openweathermap.org/data/2.5/weather?zip=${ZIPCode}&appid=${myAPIKey}&units=metric`;
    fetch(url)
        .then(function(data){
             return data.json();
        })
        .then((jsonData)=>{
            return jsonData.main.temp;
    })
        .then((temperature)=>{
            sendDataToServer(temperature,feelings);
    })
        .then(()=>{
            retrieveDataFromServer();
        })
        .catch((err)=>{
            console.log(err);
        })
})


function sendDataToServer(temp, feelings)
{
    fetch('http://127.0.0.1:5000/saveWeatherInfo'//`localhost:${port}/saveWeatherInfo`
     , {
        method: "POST",
        credentials: "same-origin",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            date: newDate,
            temp,
            feelings
        })


    })
}


function retrieveDataFromServer()
{
    fetch('http://127.0.0.1:5000/getWeatherInfo')
        .then((savedData)=>{
            return savedData.json();
        })
        .then((savedData)=>{
            console.log(savedData);
            return savedData;
        })
        .then((data)=>{
            document.querySelector("#date").innerHTML= `<p>Date is: ${data.date} </p>`;
            document.querySelector("#temp").innerHTML= `<p>Temprature is: ${data.temp} </p>`;
            document.querySelector("#content").innerHTML= `<p>feelings is: ${data.feelings} </p>`;
        })



}



