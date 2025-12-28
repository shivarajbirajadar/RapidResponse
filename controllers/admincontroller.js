const Incident = require("../models/incident");

module.exports.dashboard = async(req,res)=>{
    let incidents = await Incident.find().sort({createdAt:-1});
    res.render("admin/dashboard", { incidents, title:"Dashboard" });

}


module.exports.updateIncident = async (req,res)=>{
    const {id} = req.params;
    const {status, verified} = req.body;

    await Incident.findByIdAndUpdate(id,{
        status,
        verified: verified === "true" ? true : false
    });

    res.redirect("/admin/dashboard");
}
