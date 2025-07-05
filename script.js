document.getElementById("live-date").textContent = "📅 " + new Date().toDateString();
const events = ["🌕 Full Moon", "🚀 Mars rising", "🌠 Meteor shower"];
events.forEach(e => {
  document.getElementById("daily-events").innerHTML += `<li>${e}</li>`;
});
const weekDays = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
const weekEvents = ["Lunar eclipse","","Venus bright","New Moon","ISS visible","","Meteor Shower"];
weekDays.forEach((d,i) => {
  document.getElementById("weekly-calendar").innerHTML += `<div class='bg-gray-800 p-2 rounded'><strong>${d}</strong><br>${weekEvents[i]}</div>`;
});
document.getElementById("prediction-text").textContent = "A perfect night for stargazing.";
fetch("https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY")
  .then(res => res.json())
  .then(data => {
    document.getElementById("apod-container").innerHTML = `<h4>${data.title}</h4><img src='${data.url}' class='rounded my-2' /><p>${data.explanation}</p>`;
  });
fetch("http://api.open-notify.org/iss-now.json")
  .then(res => res.json())
  .then(data => {
    const pos = data.iss_position;
    document.getElementById("satellite-data").textContent = `Lat: ${pos.latitude}, Lon: ${pos.longitude}`;
  });
document.getElementById("toggle-chat").addEventListener("click", () => {
  document.getElementById("chat-box").classList.toggle("hidden");
});
document.getElementById("event-date").addEventListener("change", function () {
  const selected = this.value;
  fetch("space_events.json")
    .then(res => res.json())
    .then(data => {
      const event = data[selected];
      document.getElementById("event-details").innerHTML = event
        ? `<p>🌌 ${event}</p>`
        : "No recorded astronomical event on this day.";
    });
});
const today = new Date().toISOString().split("T")[0];
document.getElementById("event-date").value = today;
document.getElementById("event-date").dispatchEvent(new Event("change"));
document.getElementById("event-date").addEventListener("change", function () {
  const selectedDate = this.value;
  fetch("daily_space_events_1975_2025")
    .then(res => res.json())
    .then(data => {
      const event = data[selectedDate];
      document.getElementById("event-details").textContent =
        event ? `🌠 ${event}` : "No recorded event on this date.";
    });
});
document.getElementById("event-date").addEventListener("change", function () {
  const selectedDate = this.value;

  fetch("daily_space_events_1975_2025.json")
    .then((res) => res.json())
    .then((data) => {
      const event = data[selectedDate];
      const display = document.getElementById("event-result");
      if (event) {
        display.textContent = `🚀 ${event}`;
      } else {
        display.textContent = "No event recorded on this day.";
      }
    })
    .catch((err) => {
      console.error("Error loading space events:", err);
    });
});


