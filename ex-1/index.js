const fs = require("fs");
const cors = require("cors");
const express = require("express");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/submit_feedback", (req, res) => {
  const { name, email, feedback } = req.body;
  const newFeedback = {
    name,
    email,
    feedback,
  };

  fs.readFile("./feedbacks.json", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Error reading feedback file" });
    }

    const feedbacks = JSON.parse(data);
    feedbacks.push(newFeedback);

    fs.writeFile(
      "./feedbacks.json",
      JSON.stringify(feedbacks, null, 2),
      (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: "Error writing feedback" });
        }
        res.status(200).json({ message: "Feedback submitted successfully" });
      }
    );
  });
});

const port = 5500;
app.listen(port, () => {
  console.log("App is running");
});
