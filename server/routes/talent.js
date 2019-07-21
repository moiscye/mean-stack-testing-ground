const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Talent = require("../models/Talent");

//REGISTER OUR ROUTES --------------------------------------

router
  .route("/")

  //create a talent (access at POST http://localhost:8000/api/talent)

  .post(async (req, res) => {
    console.log("post");
    console.log(req.body);
    const talentObject = req.body;
    const newTalent = new Talent(talentObject);
    try {
      await newTalent.save();
      res.send(newTalent);
    } catch (error) {
      res.send(error);
    }
  })

  .get(async (req, res) => {
    try {
      const talents = await Talent.find().sort("lastName");
      res.send(talents);
    } catch (error) {
      res.send(error);
    }
  });

router
  .route("/:id")

  .get(async (req, res) => {
    try {
      const talent = await Talent.findById(req.params.id);
      res.send(talent);
    } catch (error) {
      res.send(error);
    }
  })

  .put(async (req, res) => {
    try {
      const talent = await Talent.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true }
      );
      res.send(talent);
    } catch (error) {
      res.send(error);
    }
  })

  .delete(async (req, res) => {
    console.log(req.params.id);

    try {
      const talent = await Talent.findOneAndDelete({ _id: req.params.id });
      res.send(talent);
    } catch (error) {
      res.send(error);
    }
  });
module.exports = router;
