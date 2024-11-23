const User=require('../models/user')

async function handleGetAllUser(req,res) {
    const allDbUsers=await User.find({});
    return res.json(allDbUsers)
    
}

async function handleGetUserById(req,res) {
    const allDbUsers=await User.findById(req.params.id);
    return res.json(allDbUsers);
    
}
async function handleUpdateUserById(req,res) {
    await User.findByIdAndUpdate(req.params.id,{lastName:"changed"});
            return res.json({ status: 'success' });
        }
async function handleDeleteUserById(req,res) {
    await User.findByIdAndDelete(req.params.id) ,res.json({status:"success"})
            
        }   
async function handleCreateNewUser(req, res) {
    const body=req.body;
    if(!body || !body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title){
        return res.status(400).json({msg:"All fields are required"})
    }
    const result=await User.create({
        firstName:body.first_name,
        lastName:body.last_name,
        email:body.email,
        gender:body.gender,
        jobTitle:body.job_title,
    })
    console.log(result)
    return res.status(201).json({msg:"success",id:result._id})
}

module.exports={
    handleGetAllUser,
    handleGetUserById,
    handleUpdateUserById,
    handleDeleteUserById,
    handleCreateNewUser,
}