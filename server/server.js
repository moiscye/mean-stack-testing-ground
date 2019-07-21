//base setup

//requiring the packages we need
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const mongoose = require("mongoose");

const app = express(); //define our app useing express

//configure the app to use body parser
//this will let us get the data from POST
//app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());
const port = process.env.PORT || 8000; //set up port

//setting up DB
mongoose.connect("mongodb://localhost/myDB", { useNewUrlParser: true });

const router = express.Router();

const talent = require("./routes/talent");
const todo = require("./routes/todo");
//all routes will be prefix wil /api
app.use("/api/talent", talent);
app.use("/api/todo", todo);

//Test route to make sure everything is working(access at GET http://localhost:8000/api)

//router.get("/", (req, res) => res.json({ message: "Welcome to out app! " }));

//REGISTER OUR ROUTES --------------------------------------

// router
//   .route("/talent")

//   //create a talent (access at POST http://localhost:8000/api/talent)

//   .post(async (req, res) => {
//     console.log("post");
//     console.log(req.body);
//     const talentObject = req.body;
//     const newTalent = new Talent(talentObject);
//     try {
//       await newTalent.save();
//       res.send(newTalent);
//     } catch (error) {
//       res.send(error);
//     }
//   })

//   .get(async (req, res) => {
//     try {
//       const talents = await Talent.find().sort("lastName");
//       res.send(talents);
//     } catch (error) {
//       res.send(error);
//     }
//   });

// router
//   .route("/talent/:id")

//   .get(async (req, res) => {
//     try {
//       const talent = await Talent.findById(req.params.id);
//       res.send(talent);
//     } catch (error) {
//       res.send(error);
//     }
//   })

//   .put(async (req, res) => {
//     try {
//       const talent = await Talent.findOneAndUpdate(
//         { _id: req.params.id },
//         req.body,
//         { new: true }
//       );
//       res.send(talent);
//     } catch (error) {
//       res.send(error);
//     }
//   });

app.listen(port, () => console.log(`listening on port ${port}`));
