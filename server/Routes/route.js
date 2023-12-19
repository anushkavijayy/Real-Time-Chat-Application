const express = require('express')
const {addUser,getUser} = require('../Controller/user')
const {addConversation,getConversation} = require('../Controller/conversation');
const { addMessage, getMessage } = require('../Controller/message');
const upload = require('../Middleware/upload')
const {getImage,uploadImage} = require('../Controller/image')

const route = express.Router();

route.post('/login',addUser);

route.get('/getuser',getUser);


route.post('/conversation/add',addConversation);


route.get('/conversation/get',getConversation);


route.get('/message/get/:id',getMessage);
route.post('/message/add',addMessage)


route.post('/file/upload', upload.single('file'), uploadImage);
route.get('/file/:filename', getImage);



;

module.exports = route