const mongoose = require("mongoose");
const Joi = require("joi");
const taskSchema = new mongoose.Schema({
  type: { type: String, required: true, minLength: 3 },
  title: { type: String, required: true },
  description: { type: String, required: true },
  created: { type: String, required: true, default: Date.now() },
  priority: { type: String, required: true },
  assignedTo: { type: String, required: true },
  status: { type: String, required: true },
});

const Task = mongoose.model("Task", taskSchema);

function validateTask(task) {
  const schema = Joi.object({
    _id: Joi.objectId(),
    __v: Joi.number(),
    type: Joi.string().required(),
    title: Joi.string().required(),
    description: Joi.string().required(),
    created: Joi.string(),
    priority: Joi.string().required(),
    assignedTo: Joi.string().required(),
    status: Joi.string().required(),
  });

  return schema.validate(task);
}

exports.Task = Task;
exports.taskSchema = taskSchema;
exports.validateTask = validateTask;
