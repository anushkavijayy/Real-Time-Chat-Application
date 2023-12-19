import axios from 'axios'
const URL = "https://whatsapp-clone-production-77a4.up.railway.app"
// const URL = "http://localhost:6969" 


const addUser = async (user)=>{
       await axios.post(`${URL}/login`,user);

}

const getUsers = async ()=>{
    const user = await axios.get(`${URL}/getuser`);
    return user.data;
}

const setConversation = async (convo)=>{  
       const response = await axios.post(`${URL}/conversation/add`, convo);
       return response.data;
}

const getConversation = async(bothIDs)=>{
      const response = await axios.get(`${URL}/conversation/get`, {
       params : bothIDs
      })
      return response.data;
}

const addMessage = async(message)=>{
        const response = await axios.post(`${URL}/message/add`, message)
        return response.data;
}

const getMessages = async(id)=>{
       const response = await axios.get(`${URL}/message/get/${id}`)
       
       return response.data;
}

const uploadFile = async (data) => {
       try {
           return await axios.post(`${URL}/file/upload`, data);
       } catch (error) {
           console.log('Error while calling newConversations API ', error);
       }
   }
export {addUser,getUsers,setConversation,getConversation,addMessage,getMessages,uploadFile}