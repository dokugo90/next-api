const express = require("express");
const cors = require('cors');
var multer = require('multer');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
//const path = require('path');
var upload = multer();
const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));


// for parsing multipart/form-data
app.use(upload.array());
app.use(express.static('public'))


app.use(cors());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();});

    /*mongoose.connect("mongodb://localhost:27017/nextjs", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});*/

mongoose.connect("mongodb+srv://dokugo:daber1010@cluster0.sc2ckht.mongodb.net/nextjs", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const testSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    }
})

const testModel = mongoose.model("usersmsgs", testSchema)

app.get("/", (req, res) => {
    res.json({
        "testing": "Successfully retrieved data"
    })
})

app.get("/data", (req, res) => {
    testModel.find(function(err, data) {
        if (err) {
            console.log(err)
        } else {
           res.json(data)
            console.log("Sent Data")
        }
    })
})

app.get("/user/63e17e47e13036ecc6dff5fb", (req, res) => {
    testModel.find({ _id: req.params.id},function(err, data) {
        if (err) {
            console.log(err)
        } else {
           res.json(data)
            console.log("Sent Data")
        }
    })
})

app.listen(process.env.PORT || 5000);

module.exports = app