const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Todo = require("../models/Todo");

//REGISTER OUR ROUTES --------------------------------------

router
  .route("/")

  //create a todo (access at POST http://localhost:8000/api/todo)

  .post(async (req, res) => {
    console.log("post");
    console.log(req.body);
    const todoObject = req.body;
    const newTodo = new Todo(todoObject);
    try {
      await newTodo.save();
      res.send(newTodo);
    } catch (error) {
      res.send(error);
    }
  })

  .get(async (req, res) => {
    try {
      const todos = await Todo.find();
      res.send(todos);
    } catch (error) {
      res.send(error);
    }
  });

router
  .route("/:id")

  .get(async (req, res) => {
    try {
      const todo = await Todo.findById(req.params.id);
      res.send(todo);
    } catch (error) {
      res.send(error);
    }
  })

  .put(async (req, res) => {
    try {
      const todo = await Todo.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true }
      );
      res.send(todo);
    } catch (error) {
      res.send(error);
    }
  })

  .delete(async (req, res) => {
    try {
      const todo = await Todo.findOneAndDelete({ _id: req.params.id });
      res.send(todo);
    } catch (error) {
      res.send(error);
    }
  });
module.exports = router;
