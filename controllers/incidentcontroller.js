const geocoder = require("../config/geocoder");
const Incident = require("../models/incident");

module.exports.renderForm = (req,res)=>{
    res.render("reportForm",{title:"Report Incident"});

};

module.exports.createIncident = async (req, res) => {
    let { title, type, description, address } = req.body;

    //  Location fetch
    let loc = await geocoder.geocode(address);

    //  AI-like scoring logic
    let score = 0;
    const text = description.toLowerCase();

    if (description.length > 30) score += 2;
    if (req.file) score += 2;
    if (loc[0]?.latitude) score += 2;

    if (text.includes("accident") || text.includes("fire") || text.includes("explosion") ||
        text.includes("medical") || text.includes("injury") || text.includes("crime")) {
        score += 3;
    }

    //  Score → Severity Level System
    let severity = "Normal";
    if (score >= 7) severity = "High";
    else if (score >= 4) severity = "Medium";
    else severity = "Suspicious";   // possible fake report

    //  Save Incident with severity included
    const incident = new Incident({
        title,
        type,
        description,
        severity, 
        location: {
            address,
            lat: loc[0]?.latitude || null,
            lng: loc[0]?.longitude || null
        },
        image: req.file?.path
    });

    await incident.save();

    // Real-time update trigger
    req.app.get("io").emit("newIncident", incident);

    res.redirect("/incidents");
};




module.exports.getAll = async(req,res)=>{
    const incidents = await Incident.find({});
    res.render("incidents",{incidents,title:"All Incidents"});
};

module.exports.details = async(req,res) =>{
    const incident = await Incident.findById(req.params.id);
    res.render("details",{incident, title:incident.title});
};

module.exports.verifyIncident = async(req,res)=>{
    await Incident.findByIdAndUpdate(req.params.id,{verified:true});
    res.redirect(`/incidents/${req.params.id}`);
}

module.exports.updateStatus = async(req,res)=>{
    const {status} = req.body;
    await Incident.findByIdAndUpdate(req.params.id,{status});
    res.redirect(`/incidents/${req.params.id}`);
};

module.exports.adminDashboard = async(req,res)=>{
    const incidents = await Incident.find({}).sort({createdAt:-1});
    res.render("adminDashboard",{incidents,title:"Admin Dashboard"});
};

module.exports.mapView = async(req,res)=>{
    const incidents = await Incident.find({});
    res.render("map",{ incidents, title:"Live Map" });
};
