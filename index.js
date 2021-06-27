var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");


const app = express();

app.set('view engine','ejs');

app.use(express.json());

app.use(express.urlencoded({
  extended: true
}));
app.use(express.static('public'));



mongoose.connect('mongodb+srv://hari:hari@123@cluster0.i24eb.mongodb.net/user?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

//create db
const dbschema = {
        name: String,
        email : String,
        phno: String,
        password : String
};

const User = mongoose.model("User",dbschema);

app.post("/sign_up",(req,res)=>{

    let newUser = new User({
     name : req.body.fname,
     email : req.body.email,
     phno : req.body.phno,
     password : req.body.password
    });
     
    newUser.save();

    return res.redirect('login.html');

});


app.get("/",(req,res)=>{
    console.log("get");
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.redirect('index.html');
})

var values = {
    "name":"",
};
app.post("/log_in",(req,res)=>{
    let email = req.body.email;
    let pass = req.body.password;
    User.find({email:email},function(err,data){
        if(err){
            console.log(err);
        }
        else{
            console.log(data);
            values = data;
            if(data[0].password == pass){
                console.log(pass);
                res.render('index',{
                    value:data[0]
                })
            }
        }
    })
    
})


app.get("/home",(req,res)=>{
    
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    res.render('index',{
        value:values[0]
    })
});

app.listen(3000,function(){
    console.log("Listening on PORT 3000");
})
