
const weatherinput =  document.getElementById("weatherinput")
const btn =  document.getElementById("btn")
const apiKey = "16cd7si9qr4qutngwnddpv90vhby71djn4c81kqn";


 weatherinput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        btn.click();
    }
});
   btn.addEventListener("click" , async function(){
    const city = weatherinput.value.trim()
     if(city == ""){
       alert('please enter your city')
     
       return;
   }
   weatherinput.value = ""
 
   const georesponse = await fetch(
     `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`
   )

   const geoData = await georesponse.json()


   if(!geoData.results || geoData.results.length === 0 ){
     alert("please enter your correct city")
     return;
   }

 
   const latitude = geoData.results[0].latitude;
   const longitude = geoData.results[0].longitude


const url =
`https://www.meteosource.com/api/v1/free/point?lat=${latitude}&lon=${longitude}&sections=current,hourly&timezone=UTC&language=en&units=metric&key=${apiKey}`;

    async function  getweather() {
    try{
        const response = await fetch(url);

        if (!response.ok) {
    throw new Error("Weather data could not be loaded");
} 
        const data = await 
        response.json();

        
        const condiation = data.current.summary.toLowerCase();
          document.getElementById("weather-condiation").textContent = condiation

       

        const weatherimage = document.getElementById("weather-image")

        if(condiation.includes("partly sunny")){
            weatherimage.src = "../images/partly sunny.png"
        }
          else if(condiation.includes("thunderstorm")){
            weatherimage.src = "../images/thunderstorm.png"
        }
        else if(condiation.includes("snow")){
            weatherimage.src = "../images/snowy png.webp"
        }
                else if (condiation.includes("foggy")) {
              weatherimage.src = "../images/foggy.png";
              }
                  else if (condiation.includes("rain")) {
              weatherimage.src = "../images/rain.png";
              }
         else if(condiation.includes("cloud") || condiation.includes("overcast")){
            weatherimage.src = "../images/cloud-3d-render-on-transparent-background-free-png.webp"
        }
        else if(condiation.includes("sunny") || condiation.includes("clear")){
            weatherimage.src = "../images/sunny-icon-0.png"
        }
        
const bgvideo = document.getElementById("bg-video");

let videoPath = "../videp/video1.mp4";

if (condiation.includes("thunderstorm")) {
    videoPath = "../videp/thunderstorm.video.mp4";

} else if (condiation.includes("snow")) {
    videoPath = "../videp/snow.video.mp4";

} else if (condiation.includes("rain")) {
    videoPath = "../videp/rain.video.mp4";

} else if (condiation.includes("cloud") || condiation.includes("overcast")) {
    videoPath = "../videp/cloud.video.mp4";

} else if (condiation.includes("sunny") || condiation.includes("clear")) {
    videoPath = "../videp/sunny.video.mp4";
}




bgvideo.src = videoPath;
bgvideo.load();

bgvideo.play().catch(error => {
    console.log("Video error:", error);
});


        document.getElementById("temperature").textContent = data.current.temperature + "°C";
        document.getElementById("wind").textContent = data.current.wind.speed + "km/h";
        document.getElementById("latitude").textContent = latitude + "° N";
        document.getElementById("longitude").textContent = longitude + "° E";
        document.querySelector(".weatherbox h2").textContent = city + " weather";
       
        const humidityresponse = await 
        fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=relative_humidity_2m`
        )

        if (!humidityresponse.ok) {
    throw new Error("Could not get humidity");
}

        const humidityData = await 
        humidityresponse.json();
                document.getElementById("humidity").textContent = humidityData.current.relative_humidity_2m + "%";

    }   catch (error) {
          console.log(error.message)
    }
}


getweather()

   })

   
   

weatherinput.value = "Kabul";
btn.click()