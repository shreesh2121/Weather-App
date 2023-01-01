const temperateField = document.querySelector(".weather1");
const cityField = document.querySelector(".weather2 p");
const dateField = document.querySelector(".weather2 span");
const emojiField = document.querySelector(".weather3 img");
const weatherField = document.querySelector(".weather3 span");
const searchField = document.querySelector(".searchField");
const form = document.querySelector("form");

let target = "delhi";

const fetchdata = async (target) => {
  try {
    const url = `https://api.weatherapi.com/v1/current.json?key=4d84618360c14be99f445031222706&q=${target}`;

    const response = await fetch(url);
    const data = await response.json();

    const {
      current: {
        temp_c,
        condition: { text, icon },
      },
      location: { name, localtime },
    } = data;

    updateDom(temp_c, name, localtime, icon, text);
  } catch (error) {
    alert("Location not found");
  }
};

function updateDom(temperature, city, time, emoji, text) {
  temperateField.innerText = temperature;
  cityField.innerText = city;
  const exactTime = time.split(" ")[1];
  const exactDate = time.split(" ")[0];

  const exactDay = new Date(exactDate).getDay();

  dateField.innerText = `${exactTime} - ${getDayFullName(
    exactDay
  )} ${exactDate}`;
  emojiField.src = emoji;
  weatherField.innerText = text;
}

fetchdata(target);

function getDayFullName(num) {
  switch (num) {
    case 0:
      return "Sunday";
    case 1:
      return "Monday";
    case 2:
      return "Tuesday";
    case 3:
      return "Weday";
    case 4:
      return "Thursday";
    case 5:
      return "Friday";
    case 6:
      return "Saturday";

    default:
      "Don't know";
  }
}

const search = (e) => {
  e.preventDefault();

  target = searchField.value;

  fetchdata(target);
};

form.addEventListener("submit", search);
