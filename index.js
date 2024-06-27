const input=document.getElementById("input");
const card=document.getElementById("card");
const weatherthing=document.getElementById("weatherthings");
const api='c559580ea031baa974fd2f81bf3848b7';

weatherthing.addEventListener("submit",async event=>{
    event.preventDefault();
    let city=input.value;
    if(city)
    {   try
        {   let getweather=await Weather(city);
            displayWeather(getweather)
        }
        catch
        {   displayError("Enter correct city name");
        }
          
    }
    else
    {   displayError("Please Enter the city name");
    }
})

async function Weather(city)
{   const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api}`;
    const response=await fetch(url);
    
    if(!response.ok)
    {   throw new Error("could the data");
    }
    return response.json();
}
function displayWeather(data)
{   console.log(data);
    const {name:city,main:{temp,humidity},weather:[{description,id}]}=data;

    card.textContent="";
    card.style.display="block";
    
    const cities=document.createElement("h1");
    cities.textContent=city;
    cities.setAttribute("id","cityname");
    card.append(cities);
    const temperature=document.createElement("h3");
    temperature.textContent=`${(temp-272.15).toFixed(2)}°C`;
    temperature.setAttribute("id","temperature");
    card.append(temperature);
    const humdities=document.createElement("h3");
    humdities.textContent=`humidity:${humidity}%`;
    humdities.setAttribute("id","humidity");
    card.append(humdities);
    const describe=document.createElement("p");
    describe.textContent=`${description}`;
    describe.setAttribute("id","describe");
    card.append(describe);
   const emojies=document.createElement("p");
    emojies.textContent=getEmoji(id);
    emojies.setAttribute("id","emoji");
    card.append(emojies);
}
function getEmoji(id)
{   const date=new Date();
    switch(true)
    {   case (id>=200&&id<=300):            
            return `⛈️`;
        case (id>300&&id<=500):
            if(date.getHours()>=6&&date.getHours()<=18)
                return `🌦️`;
            else 
                return `🌧️`; 
        case (id>500&&id<=600):
            return `🌧️`;
        case (id>600&&id<700):
            return `❄️`;
        case (id>=700&&id<800):
            return `🌫️`;
        case (id==800):
            if(date.getHours()>=6&&date.getHours()<=18)
                return `☀️`;
            else 
                return `🌑`;
        default:
            return `🌩️`;
    }
}
function displayError(error)
{   const errorthings=document.createElement("p");
    errorthings.textContent=error;
    errorthings.setAttribute("id","things");
    card.textContent="";
    card.style.display="block";
    card.append(errorthings)
}