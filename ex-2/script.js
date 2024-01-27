const town = document.querySelector(".town");
const infoBox = document.querySelector(".info-box");
const heading = document.querySelector(".heading");

const getWeather = async function (city) {
  try {
    const res = await fetch(`http://localhost:3000/weather/${city}`);

    if (!res.ok) {
      throw new Error(`Eroare: status ${res.status} `);
    }
    const data = await res.json();
    console.log(data);
    const html = `
    <p class="temp">${data.temp} grade Celsius</p>
    <p class="state">${data.state}</p>`;
    infoBox.innerHTML = html;
    town.innerHTML = data.town;
  } catch (err) {
    console.error("Eroare la preluarea datelor meteo");
    infoBox.innerHTML = "Eroare la preluarea datelor meteo";
    heading.innerHTML = "";
  }
};

getWeather("brasov");
