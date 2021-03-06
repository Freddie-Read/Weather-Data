const APIKey : string = "";

type locationType = { latitude : number, longitude : number};
type formData = 
{ 
    name : string, region : string, latitude : number, longitude : number, localTime : string,
    temp : number, isDay : boolean,
    text : string, icon : string,
    feelsLike : number
}

var btn : HTMLButtonElement = document.getElementById("btn") as HTMLButtonElement;
var input : HTMLInputElement = document.getElementById("location") as HTMLInputElement;
var container : HTMLDivElement = document.getElementById("displayWeather") as HTMLDivElement;

btn.addEventListener("click", function() : void 
{
    var location : string[] = input.value.split(",")

    fetchData({ latitude : +location[0], longitude : +location[1]});    
})

async function fetchData(currLocation : locationType)
{
    let response : any = await fetch(`http://api.weatherapi.com/v1/current.json?key=${APIKey}&q=${currLocation.latitude},${currLocation.longitude}`);
    let data : any = await response.json();
        
    let currWeather : formData = 
    {
        name : data.location.name, region : data.location.region, latitude : data.location.lat, longitude : data.location.lon, localTime :data.location.localtime,
        temp : data.current.temp_c, isDay : data.current.is_day, 
        text : data.current.condition.text, icon : data.current.condition.icon,
        feelsLike : data.current.feelslike_c
    };
    console.log(currWeather.icon);
    renderHTML(currWeather);        
}
    
function renderHTML(currWeather : formData)
{
    var htmlString : string = 
    `<h1>${currWeather.name}, ${currWeather.region} (${currWeather.latitude}, ${currWeather.longitude})</h1><br>
    <img src = "${currWeather.icon}"><br>
    <p>It is: ${currWeather.text}<br>
    Time: ${currWeather.localTime}<br>
    Temp: ${currWeather.temp} (Feels Like: ${currWeather.feelsLike})<br>
    </p>`;

    console.log(currWeather.icon);
    
    container.insertAdjacentHTML("beforeend", htmlString);
}
