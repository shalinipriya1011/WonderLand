const express = require("express");
const app=express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path=require("path");

const MONGO_URL = "mongodb://127.0.0.1:27017/WONDERLAND";
main().then(() =>{
console.log("connected to DB");
}).catch(err => {
    console.log(err);
});
async function main()
{
   await mongoose.connect(MONGO_URL);
}

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.get("/",(req,res) => {
res.send("hi I am root");
});

app.get("/listings",async (req,res) =>{
   const allListings = await Listing.find({});
   res.render("listings/index.ejs",{allListings});
    });
// app.get("/testListing", async(req,res) =>{
//     let sampleListing = new Listing({
//         title: "My new journey",
//         description:" By the beach",
//         price: 100000,
//         location: "lakshadweep",
//         country:"India",
//     });

//     await sampleListing.save();
//     console.log("sample was saved");
//     res.send("successful testing");
// });


//New Route
app.get("/listings/new", (req, res) => {
    res.render("listings/new.ejs");
  });

//show route
app.get("/listings/:id", async(req,res) => {
    let {id} = req.params;
   const listing= await Listing.findById(id);
   res.render("listings/show.ejs",{listing});
})

//Create Route
app.post("/listings", async (req, res) => {
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
  });
app.listen(8080,() => {
    console.log("server is listening to port 8080");
});