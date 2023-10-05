require("dotenv").config();
const express=require("express");
const app1=express();
const PORT=process.env.PORT || 5000;
const connectDB=require("./db/connect")

const products_routes=require("./routes/products");

app1.get("/", (req, res)=>{
    res.send("I am live");
});


// middleware or set router
app1.use("/api/products",products_routes);

const start= async () => {
    try{
        await connectDB(process.env.MONGODB_URL);
       app1.listen(PORT, ()=>{
        console.log(`${PORT} Yes I am connected`);
       })
    }
    catch (error){
         console.log(error);
    }
}

start()