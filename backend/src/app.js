const express = require('express');
const cookieParser=require('cookie-parser');
const authRoutes=require("./routes/auth.router");
const foodRoutes = require("./routes/food.routes");
const dishifyPartnerRoutes = require("./routes/dishify-partner.routes");
const cors =require('cors');  


const app = express();


app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));



app.use(cookieParser());
app.use(express.json());

app.get("/",(req ,res)=>{
    res.send("hello world");
})
app.use('/api/auth', authRoutes);
app.use('/api/food', foodRoutes);
app.use('/api/dishify-partner', dishifyPartnerRoutes);

module.exports = app;