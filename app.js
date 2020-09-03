const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const md5 = require("md5");

const app = express();

app.set('view engine' , 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));

mongoose.connect("mongodb://localhost:27017/collegeProject" , { useUnifiedTopology: true, useNewUrlParser: true});

var isLoggedIn=false;
var namme = "";

const userSchema = mongoose.Schema({
    email:String,
    name:String,
    password:String,
    admin:Number
});

const User = mongoose.model("User",userSchema);

app.get("/" , function(req,res)
{
	res.render("main");
});

app.get("/signIn" , function(req,res)
{
	res.render("signIn");
});

app.get("/signUp" , function(req,res)
{
	res.render("signUp");
});

app.get("/home" , function(req,res)
{
	if(!isLoggedIn)
	{
		res.redirect("/signIn");
	}
	res.render("home" , {name:namme});
})

app.post("/register" , function(req,res)
{
    const mail = req.body.email;
    User.findOne({email:mail} , function(err,found)
    {
        if(found)
        {
            res.render("register");
        }
        else
        {
            const user = new User({
                name:req.body.name,
                email:req.body.email,
                password:md5(req.body.password),
                admin:0
            })
            user.save(function(err)
            {
                if(err)
                {
                    console.log(err)
                }
                else
                {
					isLoggedIn=true;
					namme=(req.body.name);
                    res.redirect("/home");
                }
            });
        }
    });
});

app.post("/login" , function(req,res)
{
    const email = req.body.email;
    const password = md5(req.body.password);
    User.findOne({email:email},function(err,foundUser){
        if(err)
        {
            console.log(err);
        }
        else
        {
            if(foundUser)
            {
                if(foundUser.password===password)
                {
                    namme = (foundUser.name);
                    isLoggedIn=true;
                    res.redirect("/home");
                }
                else
                {
                    res.render("signIn");
                }
            }
            else
            {
                res.render("signIn");
            }
        }
    });
})

app.listen(3000 ,function(req,res)
{
	console.log("Started");
});
