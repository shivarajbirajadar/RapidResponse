const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const path = require("path");
const session = require("express-session");
require("dotenv").config();
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");

// ROUTES
const userRoutes = require("./routes/userroutes");
const incidentRoutes = require("./routes/incidentroutes");
const adminRoutes = require("./routes/adminroutes");

const Incident = require("./models/incident");

// VIEW ENGINE
app.engine("ejs", ejsMate);
app.set("view engine","ejs");
app.set("views", path.join(__dirname,"views"));
app.set("io", io);

// MIDDLEWARES
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static(path.join(__dirname,"public")));

// SESSION (before routes!)
app.use(session({
    secret:"rapidresponse_secret",
    resave:false,
    saveUninitialized:true
}));

// ⭐ GLOBAL ACCESS VARIABLE (this is main fix)
app.use((req,res,next)=>{
    res.locals.user = req.session.user || null;
    next();
});

// ROUTES (Only once)
app.use("/", userRoutes);
app.use("/", incidentRoutes);
app.use("/admin", adminRoutes);

// HOME PAGE
app.get("/", async (req,res)=>{
    const incidents = await Incident.find({}).sort({createdAt:-1}).limit(5);
    res.render("home",{incidents});
});

// SOCKET
io.on("connection", ()=> console.log("Socket Connected"));

// MONGO & SERVER
mongoose.connect("mongodb://127.0.0.1:27017/rapidResponse")
.then(()=> console.log("MongoDB Connected"))
.catch(err => console.log(err));

http.listen(3000, ()=>{
    console.log("Server Running → http://localhost:3000");
});
