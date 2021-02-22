const mongoose = require("mongoose");
const Joi = require("joi");
const taskSchema = new mongoose.Schema({
  type: { type: String, required: true, minLength: 3 },
  title: { type: String, required: true },
  description: { type: String },
  created: { type: String, required: true, default: Date.now() },
  closedOn: { type: String },
  priority: { type: String, required: true },
  assignedTo: { type: String },
  status: { type: String, required: true },
});

const Task = mongoose.model("Task", taskSchema);

function validateTask(task) {
  const schema = Joi.object({
    _id: Joi.objectId(),
    __v: Joi.number(),
    type: Joi.string().required(),
    title: Joi.string().required(),
    description: Joi.string().allow(""),
    created: Joi.string(),
    closedOn: Joi.string().allow(""),
    priority: Joi.string().required(),
    assignedTo: Joi.string().allow(""),
    status: Joi.string().required(),
  });

  return schema.validate(task);
}

exports.Task = Task;
exports.taskSchema = taskSchema;
exports.validateTask = validateTask;
