const express= require("express");
const dotenv= require("dotenv").config();
const contactRoutes = require("./routes/contactRoutes.js");
const userRoutes= require("./routes/userRoutes.js");
const errorHandler = require("./middlewares/errorHandler.js");
const { connect } = require("mongoose");
const connectDb = require("./config/dbConnection.js");

connectDb();
const app= express();


const port= process.env.PORT||5000;

app.use(express.json());
app.use("/api/contacts",contactRoutes);
app.use("/api/users",userRoutes);
app.use(errorHandler);
app.listen(port,()=>{
    console.log(`Server running on port ${port}`);
})