const {User} = require('../Models/user')

const addUser = async (req,res)=>{
    try{
     const exist = await User.findOne({sub:req.body.sub});

     if(exist){
        res.status(200).send("User Already Exist");
     }
     else{
     const created = await User.create(req.body);
     res.json(created);
    }
    }
    catch(err){
        console.log(err);
    }


}

const getUser = async ( req,res)=>{
    console.log("Got User");
    try{
        const response = await User.find({});
        res.json(response);
    }
    catch(err){
        console.error('Error in get user', err);
    }
}



module.exports = {addUser,getUser}