module.exports.isLoggedIn = (req,res,next)=>{
    if(!req.session.user) return res.redirect("/login");
    next();
};

module.exports.isAdmin = (req,res,next)=>{
    if(!req.session.user || req.session.user.role!="admin"){
        return res.send("Access Denied — Admin Only");
    }
    next();
};

// module.exports.isResponder = (req,res,next)=>{
//     if(!req.session.user || req.session.user.role !== "responder"){
//         return res.send("Responder Access Only");
//     }
//     next();
// };