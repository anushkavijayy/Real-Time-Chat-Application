const {Messages} = require('../Models/message')
const {Conversations} = require('../Models/conversation')


const addMessage = async (req,res)=>{
        const message = req.body;
        
        const data = await Messages.create(message);
        await Conversations.findByIdAndUpdate(message.conversationId, {message : message.text})


        return res.status(200).send('Message Saved Succesfully');
}

const getMessage = async (req,res)=>{
       const id = req.params.id;
       
       const data = await Messages.find({conversationId : id});
       res.status(200).json(data);
}

module.exports = {addMessage,getMessage}