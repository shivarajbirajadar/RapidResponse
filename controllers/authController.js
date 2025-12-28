const User = require("../models/user");
const bcrypt = require("bcryptjs");

module.exports.renderSignup = (req,res)=>{
    res.render("signup",{title:"Signup"});
};

module.exports.signup = async(req,res)=>{
    const {username,password,role} = req.body;

    const hash = await bcrypt.hash(password,10);

    await User.create({username,password:hash, role});

    res.redirect("/login");
};

module.exports.renderLogin = (req,res)=>{
    res.render("login",{title:"Login"});
};

module.exports.login = async(req,res)=>{
    const {username,password} = req.body;

    const user = await User.findOne({username});
    if(!user) return res.send("User not found");

    const match = await bcrypt.compare(password,user.password);
    if(!match) return res.send("Incorrect Password");

   
    req.session.user = {
        id:user._id,
        username:user.username,
        role:user.role
    }

    if(user.role === "admin") return res.redirect("/admin/dashboard");
    if(user.role === "responder") return res.redirect("/incidents");

    return res.redirect("/");
};

module.exports.logout = (req,res)=>{
    req.session.destroy();
    res.redirect("/");
}