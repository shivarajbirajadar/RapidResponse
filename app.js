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

// ⭐ Atlas URL from .env
const dbUrl = process.env.ATLASDB_URL;

// VIEW ENGINE
app.engine("ejs", ejsMate);
app.set("view engine","ejs");
app.set("views", path.join(__dirname,"views"));
app.set("io", io);

// MIDDLEWARES
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static(path.join(__dirname,"public")));

// ⭐ SESSION (use env secret)
app.use(session({
    secret: process.env.SECRET,
    resave:false,
    saveUninitialized:true
}));

// ⭐ GLOBAL USER INFO
app.use((req,res,next)=>{
    res.locals.user = req.session.user || null;
    next();
});

// ROUTES
app.use("/", userRoutes);
app.use("/", incidentRoutes);
app.use("/admin", adminRoutes);

// HOME
app.get("/", async (req,res)=>{
    const incidents = await Incident.find({}).sort({createdAt:-1}).limit(5);
    res.render("home",{incidents});
});

// SOCKET
io.on("connection", ()=> console.log("Socket Connected"));

// ⭐ MONGODB CONNECT USING ATLAS
mongoose.connect(dbUrl)
.then(()=> console.log("MongoDB Atlas Connected ✔"))
.catch(err => console.log("DB Error ❌",err));

const PORT = process.env.PORT || 3000;
http.listen(PORT, ()=> console.log("Server running on port", PORT));
