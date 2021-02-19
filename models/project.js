const mongoose = require("mongoose");
const { taskSchema } = require("./task");
const Joi = require("joi");

const Project = mongoose.model(
  "Project",
  new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    tasks: [{ type: taskSchema }],
    users: [{ type: String, required: true }],
  })
);

function validateProject(task) {
  const schema = Joi.object({
    _id: Joi.objectId(),
    __v: Joi.number(),
    title: Joi.string().required(),
    description: Joi.string(),
    tasks: Joi.array(),
    users: Joi.array(),
  });

  return schema.validate(task);
}

exports.Project = Project;
exports.validate = validateProject;
