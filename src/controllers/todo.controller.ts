const Todo = require("../models/Todo.model");

exports.postNewTodo = async (req, res, next) => {
  try {
    console.log("body : ", req.body);
    console.log("==>", Todo);
    const ans = await Todo.create(req.body);
    console.log("===========================");
    console.log("ans : ", ans);
    res.status(400).json(req.body);
  } catch (error) {
    next(error);
  }
};

exports.getTodos = async (req, res, next) => {
    try {
        const ans = await Todo.find({})
        res.status(200).json(ans)
    } catch (error) {
        next(error)
    }
};
