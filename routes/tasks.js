const auth = require("../middleware/auth");
const { Project } = require("../models/project");
const { Task, validateTask } = require("../models/task");
const express = require("express");
const router = express.Router();

router.post("/", auth, async (req, res) => {
  const { error } = validateTask(req.body.task);
  if (error) return res.status(400).send(error.details[0].message);
  const project = await Project.findById(req.body.projectId);

  const task = new Task();
  task.title = req.body.task.title;
  task.type = req.body.task.type;
  task.description = req.body.task.description;
  task.priority = req.body.task.priority;
  task.assignedTo = req.body.task.assignedTo;
  task.status = req.body.task.status;
  task.closedOn = "";

  project.tasks.push(task);

  await project.save();
  res.send({ task, projectId: req.body.projectId });
});

router.put("/:id", auth, async (req, res) => {
  const { error } = validateTask(req.body.task);
  if (error) return res.status(400).send(error.details[0].message);

  const project = await Project.findById(req.body.projectId);
  const taskIndex = project.tasks.findIndex(
    (t) => t._id.toString() === req.params.id.toString()
  );

  project.tasks[taskIndex].title = req.body.task.title;
  project.tasks[taskIndex].type = req.body.task.type;
  project.tasks[taskIndex].description = req.body.task.description;
  project.tasks[taskIndex].priority = req.body.task.priority;
  project.tasks[taskIndex].assignedTo = req.body.task.assignedTo;
  project.tasks[taskIndex].status = req.body.task.status;

  if (req.body.task.status === "Closed") {
    project.tasks[taskIndex].closedOn = Date.now();
  }

  if (req.body.task.status !== "Closed") {
    project.tasks[taskIndex].closedOn = "";
  }

  await project.save();
  res.send({ task: project.tasks[taskIndex], projectId: req.body.projectId });
});

router.delete("/:id", auth, async (req, res) => {
  const project = await Project.findById(req.body.projectId);

  const taskIndex = project.tasks.findIndex(
    (t) => t._id.toString() === req.params.id.toString()
  );

  const task = project.tasks[taskIndex];
  project.tasks.splice(taskIndex, 1);

  await project.save();
  res.send({ projectId: req.body.projectId, task });
});

module.exports = router;
