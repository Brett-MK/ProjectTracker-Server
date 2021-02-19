const auth = require("../middleware/auth");
const { Project, validate } = require("../models/project");
const express = require("express");
const router = express.Router();

router.get("/", auth, async (req, res) => {
  const projects = await Project.find({ users: req.authId });
  res.send(projects);
});

router.get("/:id", async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (!project)
    return res.status(404).send("The project with the given ID was not found");

  res.send(project);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const project = new Project();
  project.title = req.body.title;
  project.description = req.body.description;
  project.users = [req.authId];

  await project.save();
  res.send(project);
});

router.put("/:id", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const project = await Project.findById(req.params.id);
  if (!project)
    return res.status(404).send("The project with the given ID was not found");

  project.title = req.body.title;
  project.description = req.body.description;
  project.tasks = req.body.tasks;

  await project.save();
  res.send(project);
});

router.delete("/:id", auth, async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project)
    return res.status(404).send("The project with the given ID was not found");

  await Project.deleteOne({ _id: req.params.id });
  res.send(project);
});

module.exports = router;
