// Installation
// npm install express
//npm init   --------create json filr
//npm install express --save
// npm install ejs --save
// npm install body parser --save
// 

//var bodyParser = require("body-parser") 
//  app.use(bodyParser.urlencoded({extended: true})) 
var mongoose = require("mongoose");
var express = require("express");
var app = express();
var bodyParser = require("body-parser") ;
const path = require("path");
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({extended: true})) ;


mongoose.connect("mongodb://localhost/UserDetails");

var userSchema = new mongoose.Schema({
    Surname: String,
    Initials: String,
    Title: String,
    Institution: String,
    Rating: String,
    PrimaryResearchFields: String,
    SecondaryResearchFields: String

});

var User = mongoose.model("User", userSchema);

const fs = require("fs");
const readline = require("readline");
const stream = fs.createReadStream("documents/Final.csv");
const rl = readline.createInterface({ input: stream });
let data = [];
Ratings = [{Avalue:0,Bvalue:0,Cvalue:0,Pvalue:0,Yvalue:0}];

rl.on("line", (row) => {
    data.push(row.split(","));
});
 
rl.on("close", () => {
    // console.log(data.length);
  
    sendDataToDataase(data);
    retrieveInfo();
    Logic(data);
   
});


function Logic(datapas){
    //console.log(datapas.length);
    for (let i = 1; i < datapas.length; i++){
        if(datapas[i][4]==='A'){
            Ratings[0].Avalue+=1
        }
        else if(datapas[i][4]==='B'){
            Ratings[0].Bvalue+=1
        }
        else if(datapas[i][4]==='C'){
            Ratings[0].Cvalue+=1
        }
        else if(datapas[i][4]==='P'){
            Ratings[0].Pvalue+=1
        }
        else if(datapas[i][4]==='Y'){
            Ratings[0].Yvalue+=1
        }
        else{
            //console.log(datapas[i][4]," "+datapas[i][0]);
            //datapas[i][4]
        }
    }
    //console.log(Ratings[0]);

}
function sendDataToDataase(data){

     for (let i = 1; i <data.length; i++) {

        User.create({
            Surname: data[i][0],
            Initials: data[i][1],
            Title: data[i][2],
            Institution: data[i][3],
            Rating: data[i][4],
            PrimaryResearchFields: data[i][7],
            SecondaryResearchFields: data[i][8]

        },function(err,users){
            if(err){
                console.log(err);
            }
            else{
                //console.log(users);
                //console.log(users.length);
            }
        });
    
  }
 }

//print all the users from the data base
function retrieveInfo(){
    User.find({},function(err,users){
        if(err){
            //console.log("erroooor");
            console.log(err);
        }
        else{

        }
    });
}

app.set("view engine","ejs");
app.get("/",function(req,res){
    //res.send("Hi my boy");
    res.render("HomePage")
});

// ;

app.get("/details/:name",function(req,res){
    //res.send("Hi my boy");
    var thing = req.params.name;
    res.render("home",{thingVar:thing})
});

app.get("/Selectmenu",function(req,res){
    //res.send("adding my boyKwenza.........");
    res.render("SelectMenu",{research:Ratings[0]});
});

app.post("/login",function(req,res){
    console.log(req.body); //get values from the form
    console.log(req.params); //e
    console.log(res.params); // undefined
    //res.send("adding my boy POST.........");
    res.render("Selection");
});
app.get("/loginForm",function(req,res){
    //res.send("adding my boy GET");
    res.render("LoginForm")
});

app.get("/loginpage",function(req,res){
    //res.send("adding my boyKwenza.........");
    res.render("home")
});


app.listen(4000,function(){
    console.log("Server Started...");
    
});


/*app.get("/dog/:name/connect/:surname",function(req,res){

    res.send("your name is "+req.params.name+" "+req.params.surname);
    
    console.log(req.params);
    console.log(req.params.name);
    console.log(req.params.surname);
    console.log("your name is "+req.params.name+" "+req.params.surname);
});*/

//app.get("/details/:name/:kwena",function(req,res){
    //     //res.send("Hi my boy");
    //     console.log(req.body); // no values
    //     console.log(req.params); //get the values from url
    //     //console.log(res.params);  //undined
    //     var thing = req.params.name;
    //     var posts = [{title:"post 1", author: "Susy"},{title:"post 2", author: "kwena"}];
    //     res.send("GEEEET");
    //     //res.render("home",{thingVar:thing})
    // })