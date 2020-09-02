const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const md5 = require("md5");

const app = express();

app.set('view engine' , 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));

mongoose.connect("mongodb://localhost:27017/collegeProject" , { useUnifiedTopology: true, useNewUrlParser: true});

app.listen(3000 ,function(req,res)
{
	console.log("Started");
});
