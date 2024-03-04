const express= require("express")
const app = express()
 const request= require("request")
const bodyparser= require("body-parser")
 app.use(bodyparser.urlencoded({extended:true}))
const https= require("https")
app.get("/",(req,res)=>{
    res.sendFile(__dirname + "/signup.html")
})
app.post("/",(req,res)=>{
    const firstname= req.body.firstname
    const lastname= req.body.lastname
    const email= req.body.email
    
    console.log(firstname)
    console.log(lastname)
    console.log(email)



const data={
    members: [
        {
            email_address:email,
            status: "subscribed",
            merge_fields:{
                FNAME:firstname,
                LNAME: lastname
            }
            
        }
    ]
}
const jsondata = JSON.stringify(data)
console.log(jsondata);
const url= "https://us21.api.mailchimp.com/3.0/lists/3f05a546e7"
const options= {
    method:"POST",
    auth:"Mehroz:156d05f9d178140be4fceff77c60f43d-us21"
}
const request =https.request(url,options,function(response){
    response.on("data",function(data){
        console.log(JSON.parse(data))
    })

    if (response.statusCode===200)
    res.sendFile(__dirname + "/sucess.html")
    else res.sendFile(__dirname + "/failure.html")
})


request.write(jsondata)
request.end();
 })

 app.post("/failure",(req,res)=>{
    res.redirect("/")
 })



app.listen(3000,()=>{
    console.log("Server is running")
})

// Api key
// 156d05f9d178140be4fceff77c60f43d-us21
// list  id
// 3f05a546e7