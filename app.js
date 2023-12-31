const express = require ("express");
const request = require ("request");
const bodyParser = require ("body-parser");
const https=require("https");
const { options } = require("request");
const { log } = require("console");
const app=express();

app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html")
})

app.post("/",function(req,res){
     var firstname=req.body.fName;
     var last=req.body.lName;
     var email=req.body.email;
     var data= {
        members:[
            {
            email_address: email,
            status:"subscribed",
            merge_fields: {
                FNAME:firstname,
                LNAME:last
            }
        }
    ]
     }
     const url="https://us11.api.mailchimp.com/3.0/lists/36e932a305";
     const options={
        method: "POST",
        auth:"mad:0ce93fb5677e65da6d28a95900e5eee3-us11"
     }
     var jsondata=JSON.stringify(data);
     const request=https.request(url,options,function(response){

        if(response.statusCode===200){
            res.sendFile(__dirname+"/success.html")
        }
        else{
            res.sendFile(__dirname+"/faliure.html")
        }

        response.on("data",function(data){
        console.log(JSON.parse(data));
        })
     })
     request.write(jsondata);
     request.end();
})

app.listen(3000,function(){
    console.log("Server is running .")
})


// api 
// 6e99b0756f54c048c9f0a45d7e901b09-us11

// Audienceid   
// 36e932a305