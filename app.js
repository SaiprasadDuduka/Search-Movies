const express = require("express");
const app = express();
const request = require("request");
const bodyParser = require("body-parser");
const port = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req,res)=>{
    res.render("home");
});

app.post("/results", (req,res)=>{
    var name = req.body.query;
    console.log(req.body);
    var url = "http://www.omdbapi.com/?apikey=edc61a67&s=" + name;
    request(url, (error,response,body)=>{
        if(!error && response.statusCode === 200){
            var data = JSON.parse(body);
            res.render("results", {data:data});
            console.log(data);
        }else{
            console.log("Error!:", error);
        }
    });
});

app.listen(port, (e)=>{
    if(e) console.log("Server Error");
    console.log("Server has started!");
});