
const {Conversations} = require('../Models/conversation')

const addConversation = async (req,res)=>{
    const sender = req.body.senderId;
    const reciever = req.body.recieverId;
    
    try{
     const exist = await Conversations.findOne({members : { $all : [sender,reciever]}});

     if(exist){
        return res.status(200).json(exist);
     }
     
     const created = await Conversations.create({
        members: [sender , reciever]
     });
     res.json(created);
    
    }
    catch(err){
        console.log(err);
    }


}
const getConversation = async (req,res)=>{
    
    const sender = req.query.senderId;
    const reciever = req.query.recieverId;

   ;
   
    try{
     const exist = await Conversations.findOne({members : { $all : [sender,reciever]}});
     res.json(exist);
    }
    catch(err){
        console.log(err);
    }


}




module.exports = {addConversation,getConversation}