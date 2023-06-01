const temperatureContent = document.getElementById("temperature");
const humidityContent = document.getElementById("humidity");
const particulateMatterContent = document.getElementById("particulateMatter");

function display_ct6() {
    let x = new Date()
    let ampm = x.getHours() >= 12 ? ' PM' : ' AM';
    hours = x.getHours() % 12;
    hours = hours ? hours : 12;
    let x1 = x.getMonth() + 1 + "/" + x.getDate() + "/" + x.getFullYear();
    x1 = x1 + " - " + hours + ":" + x.getMinutes() + ":" + x.getSeconds() + ":" + ampm;
    document.getElementById('ct6').innerHTML = x1;
    display_c6();
}

function display_c6() {
    let refresh = 1000;
    mytime = setTimeout('display_ct6()', refresh)
}

display_c6()

fetchData();

async function fetchData() {
    try {
        const response = await fetch("https://smartventilator-9cac8-default-rtdb.firebaseio.com/database.json");
        const data = await response.json();
        temperatureContent.innerText = `${data?.simpleVentilator?.sensors?.temperature} *C`
        humidityContent.innerText = `${data?.simpleVentilator?.sensors?.humidity} %`
        particulateMatterContent.innerText = `${data?.simpleVentilator?.sensors?.particulateMatter} ppm`
    } catch (e) {
        console.log(e.message)
    }
}

window.addEventListener('load', function () {
    // Your document is loaded.
    const fetchInterval = 10000; // 10 seconds.

    // Invoke the request every 10 seconds.
    setInterval(fetchData, fetchInterval);
});


let toggle = document.querySelector(".toggle");
let text = document.querySelector(".text");

function Animatedtoggle(){
    toggle.classList.toggle("active");

    if(toggle.classList.contains("active")){
        text.innerHTML = "ON";
    }
    else{
        text.innerHTML = "OFF"
    }
}