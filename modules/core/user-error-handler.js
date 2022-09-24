module.exports = async (err,req, res, next)=>{

    switch(err.name){
        case "ProfileNotFound":
            return res.status(400).json({message: err.message});
        case "CampaignNotFound":
            return res.status(400).json({message: err.message});
        default:
            next(err);
    }
}
