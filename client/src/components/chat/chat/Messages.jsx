import styled from "@emotion/styled";
import { Box } from "@mui/material";
import Footer from "./Footer";
import { AuthenticationContext } from "../../../context/AuthenticationContext";
import { useContext, useEffect, useState , useRef} from "react";
import { addMessage, getMessages } from "../../../services/api";
import Message from "./Message";
const url =
  "https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png";

const Wrapper = styled(Box)`
  background-image: url(${"https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png"});
  background-size: 50%;
  height: 87vh;
  overflow: scroll;
  padding : 0 1rem 0 1rem;

  
`;


const Container = styled(Box)`
    padding: 1px 5px;
`;

const Messages = ({ conversation }) => {
 
  const [text, setText] = useState("");
  const [allMessages, setAllMessages] = useState([]);
  const [incomingMessage, setIncomingMessage] = useState(null);
  const [file, setFile] = useState();
  const [image, setImage] = useState();
  const { account,person, socket, newMessageFlag, setNewMessageFlag } = useContext(AuthenticationContext);
  const scrollRef = useRef();

  const sendMessage = async (e) => {
    if (e.which == 13 && text.trim()!="") {
      let message;
      if(!file){
        message = {
        senderId: account.sub,
        recieverId: person.sub,
        conversationId: conversation._id,
        type: "text",
        text: text,
      }
    }
      else{
        message = {
          senderId: account.sub,
          recieverId: person.sub,
          conversationId: conversation._id,
          type: "file",
          text: image,
        }
      }
  

      console.log("IMAGECHECK",message);

      socket.current.emit('sendMessage', message);


      await addMessage(message);
      setText("");
      setImage('');
      setFile('');
      setNewMessageFlag((newMessageFlag) => !newMessageFlag);
    }
  };


  useEffect(() => {
    scrollRef.current?.scrollIntoView({ transition: "smooth" })
}, [allMessages]);



  useEffect(() => {
    socket.current.on('getMessage', data => {
        setIncomingMessage({
            ...data,
            createdAt: Date.now()
        })
    })
}, []);


     useEffect(() => {
         incomingMessage && conversation?.members?.includes(incomingMessage.senderId) && 
         setAllMessages((prev) => [...prev, incomingMessage]);
    
}, [incomingMessage, conversation]);




  useEffect(() => {
    const fetchMessages = async () => {
      const messages = await getMessages(conversation._id);
      setAllMessages(messages);
      console.log(allMessages);
    };
    conversation && fetchMessages();
  }, [person.sub, conversation, newMessageFlag]);

  return (
    <>
    <Wrapper>
      {allMessages?.map((message, ind) => {
        return <Container  key={ind} ref={scrollRef}><Message message={message} /></Container>;
      })}
       <div style={{height:'50px'}}></div>
      </Wrapper>
      <Footer
        sendMessage={sendMessage}
        message={text}
        setMessage={setText}
        file={file}
        setFile={setFile}
        setImage={setImage}
      />
    </>
  );
};

export default Messages;
