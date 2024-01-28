/* eslint-disable no-undef */
const { json } = require("body-parser");
const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const projects = JSON.parse(fs.readFileSync(`${__dirname}/projects.json`));

app.get("/projects", (req, res) => {
  res.status(200).json({
    status: "succes",
    data: { projects },
  });
});

app.post("/projects", (req, res) => {
  const newProject = req.body;

  newProject.id = Date.now().toString();

  projects.push(newProject);

  fs.writeFileSync(`${__dirname}/projects.json`, JSON.stringify(projects));

  res.status(201).json({
    status: "success",
    data: { project: newProject },
  });
});

app.put("/projects/:id", (req, res) => {
  const { id } = req.params;
  const updatedProjectData = req.body;

  const projectIndex = projects.findIndex((p) => p.id.toString() === id);
  if (projectIndex === -1) {
    return res.status(404).send("project not found");
  }

  projects[projectIndex] = { ...projects[projectIndex], ...updatedProjectData };

  fs.writeFileSync(`${__dirname}/projects.json`, JSON.stringify(projects));

  res.status(200).json({
    status: "success",
    data: { project: projects[projectIndex] },
  });
});

app.delete("/projects/:id", (req, res) => {
  const { id } = req.params;

  const projectIndex = projects.findIndex((p) => p.id.toString() === id);
  if (projectIndex === -1) {
    return res.status(404).send("project not found");
  }

  projects.splice(projectIndex, 1);
  fs.writeFileSync(`${__dirname}/projects.json`, JSON.stringify(projects));

  res.status(200).json({
    status: "success",
    message: "Project deleted succesfully",
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
