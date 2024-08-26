const WEATHER_API_TOKEN = "" // YOUR API KEY HERE (for some reason)
const URI = `http://apiadvisor.climatempo.com.br/api/v1/forecast/locale/3477/days/270?token=${WEATHER_API_TOKEN}`;

const HAPPINESS_THRESHOLD = 18;
const BERABLE_TRESHOLD = 25;

const THERMOMETER_GAIN_ICON =  "<span class=\"material-symbols-outlined\">thermometer_gain</span>";
const THERMOMETER_MINUS_ICON = "<span class=\"material-symbols-outlined\">thermometer_minus</span>";
const CALENDAR_ICON = "<span class=\"material-symbols-outlined\">calendar_month</span>"

fetch(URI)
    .then(response => response.json())
    .then(responseJson => {

        console.log(responseJson);

        const fifteenDaysWeather = responseJson.data.slice(0, 15);

        document.getElementById("title").innerHTML += ` em ${responseJson.name}!`; 

        const blocks = document.querySelectorAll('.block');

        blocks.forEach((block, index) => {
                
            const { date: DayDate, temperature: { max: DayMaxTemp, min: DayMinTemp } } = fifteenDaysWeather[index];

            const paragraphs = block.querySelectorAll('.text-content p');

            const date = new Date(Date.parse(DayDate.replace('-', ' ')));

            paragraphs[0].innerHTML = `${CALENDAR_ICON} ${date.toDateString()}`;
            paragraphs[1].innerHTML = `${THERMOMETER_GAIN_ICON} Max: ${DayMaxTemp}º`;
            paragraphs[2].innerHTML = `${THERMOMETER_MINUS_ICON} Min: ${DayMinTemp}º`;


            blockImage = block.getElementsByTagName('img')[0];

            if (parseInt(DayMaxTemp) > BERABLE_TRESHOLD) {
                blockImage.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcqX1y4reo4wVEMfu53871t0Sv7v-vb9A31Q&s";
            } else if (parseInt(DayMaxTemp) > HAPPINESS_THRESHOLD) {
                blockImage.src = "https://cdn-icons-png.flaticon.com/512/158/158420.png";
            } else {
                blockImage.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQilahueN_sF9N0AOquT4rFL1o_qcsttwB3Gg&s";
            }
        });
    }).catch(error =>{
        console.error('Error fetching weather data:', error);
    });
