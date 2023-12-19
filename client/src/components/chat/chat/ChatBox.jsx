import { useState,useContext, useEffect} from 'react';

import { Box } from '@mui/material';

// import { UserContext } from '../../../context/UserProvider';
import { AuthenticationContext } from '../../../context/AuthenticationContext';
import { getConversation } from '../../../services/api';

//components
import ChatHeader from './ChatHeader';
import Messages from './Messages';
import EmptyChat from './EmptyChat';
import styled from '@emotion/styled';


const Wrapper = styled(Box)({
    height : '75%',
    width:'100%'
})


const ChatBox = () => {
    
    const { account ,person} = useContext(AuthenticationContext);

    const [conversation, setConversation] = useState({});
    

   
    
    useEffect(()=>{
    const personHandler = async () => {
        
        const data = await getConversation({ senderId: account.sub, recieverId: person.sub });
        setConversation(data);
       
    }
    personHandler();
},[person.sub])


    return (
        <Wrapper>
            {conversation && <ChatHeader />}
            {conversation?<Messages conversation = {conversation}/> : <EmptyChat/>}
           
        </Wrapper>
    )
}

export default ChatBox;