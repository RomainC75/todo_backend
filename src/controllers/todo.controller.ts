import { TodoInterface } from "../@types/todo.type";

const Todo = require("../models/Todo.model");

exports.postNewTodo = async (req, res, next) => {
  console.log("body : ", req.body);
  console.log("MIDDLE : ", req.user);
  try {
    const ans: TodoInterface = await Todo.create({
      ...req.body,
      userId: req.user._id,
    });
    res.status(400).json(ans);
  } catch (error) {
    next(error);
  }
};

exports.getTodos = async (req, res, next) => {
  try {
    const foundTodo: TodoInterface = await Todo.find({ userId: req.user._id });
    console.log(foundTodo);
    res.status(200).json(foundTodo);
  } catch (error) {
    next(error);
  }
};

exports.getTodo = async (req, res, next) => {
  try {
    const foundTodo: TodoInterface = await Todo.findById(req.params.todoId);
    if (!foundTodo) {
      next({ stack: "todo not found" });
    }
    if (foundTodo.userId.toString() !== req.user._id) {
      next({
        stack: "You do not have access to this todo ! ",
      });
    }
    res.status(200).json(foundTodo);
  } catch (error) {
    next(error);
  }
};

exports.deleteTodo = async (req, res, next) => {
  try {
    const foundTodo = await Todo.findById(req.params.todoId);
    if (!foundTodo) {
      next({ stack: "todo not found" });
    }
    if (foundTodo.userId.toString() !== req.user._id) {
      next({
        stack: "You do not have access to this todo ! ",
      });
    }
    await Todo.findByIdAndDelete(req.params.todoId);
    res.status(201).json({ message: "toto deleted" });
  } catch (error) {
    next(error);
  }
};

exports.updateTodo = async (req, res, next) => {
  try {
    const foundTodo:TodoInterface = await Todo.findById(req.params.todoId);
    console.log("foundTodo : ", foundTodo);
    if (!foundTodo) {
      next({ stack: "todo not found" });
    }
    if (foundTodo.userId.toString() !== req.user._id) {
      next({
        stack: "You do not have access to this todo ! ",
      });
    }
    const updatedTodo:TodoInterface = await Todo.findByIdAndUpdate(
      req.params.todoId,
      {
        ...req.body,
      },
      { new: true }
    );
    res.status(201).json(updatedTodo);
  } catch (error) {
    next(error);
  }
};
