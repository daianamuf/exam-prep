document
  .getElementById("feedbackForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const feedback = document.getElementById("feedback").value;

    try {
      const res = await fetch("http://localhost:5500/submit_feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, feedback }),
      });

      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await res.json();
      document.getElementById("message").innerText = data.message;
    } catch (err) {
      console.error("error: ", err);
      document.getElementById("message").innerText =
        "An error occured while sending feedback";
    }
  });
