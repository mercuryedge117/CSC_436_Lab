const express = require("express");
const jwt = require("jsonwebtoken");
const Todo = require("../models/Todo");

const privateKey = process.env.JWT_PRIVATE_KEY;

const router = express.Router();

router.use(function (req, res, next) {
  if (req.header("Authorization")) {
    try {
      req.payload = jwt.verify(req.header("Authorization"), privateKey, {
        algorithms: ["RS256"],
      });
    } catch (error) {
      /// log the error inside!
      return res.status(401).json({ error: error.message });
    }
  } else {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
});

router.post("/", async function (req, res) {
    const todo = new Todo({
      title: req.body.title,
      content: req.body.content,
      author: req.body.author,
      dateCreated: req.body.dateCreated,
      complete: req.body.complete,
      authorID: req.payload.id,
    });
    return todo
      .save()
      .then((savedTodo) => {
        return res.status(201).json({
          title: savedTodo.title,
          content: savedTodo.content,
          author: req.body.author,
          dateCreated: savedTodo.dateCreated,
          complete: savedTodo.complete,
          id: savedTodo._id,
        });
      })
      .catch((error) => {
        return res.status(500).json({ error: "Something is went wrong." });
      });
});

router.get("/", async function (req, res, next) {
    const todos = await Todo.find().where("authorID").equals(req.payload.id).exec();
    return res.status(200).json({ todos: todos });
});

router.delete("/:id", async function (req, res, next) {
  const todo = await Todo.findByIdAndDelete(req.params.id).exec();
  return res.status(200).json({ todo });
});

router.patch("/:id", async function (req, res, next) {
  const todo = await Todo.findByIdAndUpdate(req.params.id, 
    { complete: req.body.complete, 
      dateCompleted: req.body.dateCompleted}).exec();
  return res.status(200).json({ todo });
});

module.exports = router;