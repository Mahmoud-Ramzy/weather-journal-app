/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth()+1)+'.'+ d.getDate()+'.'+ d.getFullYear();
// let newDate = Date();
//API Key from open weather
const myKey="fa0ca5851267f9e80e1191d4a10b3158";
//Url of API call
let URL ="https://api.openweathermap.org/data/2.5/weather?zip=";
//get the zip code
let zipCode=document.getElementById("zip");
//get country code
let countryCode=document.getElementById("country");
//feeling
let feeling=document.getElementById("feelings");
//server
let server ="http://127.0.0.1:8000"
document.querySelector("#generate").addEventListener('click',()=>{
    let ApiUrl=`${URL}${zipCode.value},${countryCode.value}&units=metric&appid=${myKey}`;
    //get temperature in celsius degree
    console.log(ApiUrl);
    getWeather(ApiUrl).then( (AllData)=>{
        if(AllData)//to be
        {
            const data={ //destruct the Alldata to needed data 
                newDate,
                name:AllData["name"],//country name
                temperature:Math.round(AllData.main.temp),//temperature
                weather:AllData.weather[0].description,//weather description
                icon:AllData.weather[0].icon,//weather description icon
                feeling:feeling.value
            }
            const icon = `https://openweathermap.org/img/wn/${data.icon}@2x.png`;
            document.querySelector("img").setAttribute("src",icon);

            postData(`${server}/addData`,data);
            sleep(50);
            document.querySelector(".entry").style.display="flex";
        }
    } ). then(updatingUI);
})
const getWeather = async function(url){
    try{
        const response = await fetch(url);//fetch the data from the url
        const weatherData= await response.json();//get the data as object
        if(weatherData.cod!==200){//if cod !=200 then there is an error
            //div in center as pop-up window 
            document.getElementById("err").innerHTML=`<p>${weatherData.message}</p>`;
            document.getElementById("err").style.display="flex";
            document.getElementById("err").style.opacity=  1;
            fade(document.getElementById("err"));
            throw weatherData.message; //return the error message 
        }
        return weatherData;//if it is correct then return the weather data
    }catch(error){
        console.log(error);
    }
}
//method to post the data
const postData = async ( url = "", data = {})=>{
    console.log(data);
        const response = await fetch(url, {
        method: 'POST', //Get, Post, Delete, etc
        credentials: 'same-origin',//include, same-origin, etc
        headers: {
            'Content-Type': 'application/json',
        },
     // Body data type must match "Content-Type" header        
        body: JSON.stringify(data), //body data type stringify
    });

    try {
        const newData = await response.json();
        console.log(newData);
        console.log('Saved correctly');
        return newData;
        }catch(error) {
        console.log("error", error);//handle error
        }
    }

//
const updatingUI= async()=>{
        const result = await fetch(`${server}/weather`);
        try{
        const newDataToShow = await result.json();
        console.log(newDataToShow);

        document.querySelector("#date").innerHTML= newDataToShow.newDate;
        document.querySelector("#city").innerHTML= newDataToShow.name;
        document.querySelector("#temp").innerHTML= `${newDataToShow.temperature} degree &#8451`;
        document.querySelector("#description").innerHTML= newDataToShow.weather;
        document.querySelector("#content").innerHTML= newDataToShow.feeling;
    }
    catch(error){
        console.log(error);
    }
}

//function to fade out the error message.
function fade(element) {
    var op = 1;  // initial opacity
    var timer = setInterval(function () {
        if (op <= 0.25){
            clearInterval(timer);
            element.style.display = 'none';
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= op * 0.18;
    }, 300);
}

function sleep(milliseconds) {
    const time = Date.now();
    let cuurTime = null;
    do {
    cuurTime = Date.now();
    } while (cuurTime - time < milliseconds);
}