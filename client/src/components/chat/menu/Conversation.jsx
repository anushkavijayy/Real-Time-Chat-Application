import { useContext ,useState,useEffect} from "react";

import { styled, Box, Typography } from "@mui/material";
import { AuthenticationContext } from "../../../context/AuthenticationContext";
import { setConversation } from "../../../services/api";
import { formatDate } from "../../../utils/commonUttils";
import { getConversation } from "../../../services/api";

const Component = styled(Box)`
  height: 45px;
  display: flex;
  padding: 13px 0;
  cursor: pointer;
`;

const Image = styled("img")({
  width: 50,
  height: 50,
  objectFit: "cover",
  borderRadius: "50%",
  padding: "0 14px",
});

const Container = styled(Box)`
  display: flex;
`;

const Timestamp = styled(Typography)`
  font-size: 12px;
  margin-left: auto;
  color: #00000099;
  margin-right: 20px;
`;

const Text = styled(Typography)`
  display: block;
  color: rgba(0, 0, 0, 0.6);
  font-size: 14px;
  white-space : nowrap
`;



const Conversation = ({ user }) => {
  const { account,person, setPerson ,  newMessageFlag} = useContext(AuthenticationContext);
 

  const [message, setMessage] = useState({});

  useEffect(() => {
      const getConversationMessage = async() => {
          const data = await getConversation({ senderId: account.sub, recieverId: user.sub });
          
          setMessage({ text: data?.message, timestamp: data?.updatedAt });
          console.log(message);
      }
      getConversationMessage();
  }, [newMessageFlag,account.sub,user.sub,person.sub]);


  const personHandler = async () => {
    setPerson(user);
    const data = await setConversation({
      senderId: account.sub,
      recieverId: user.sub,
    });
  };
  return (
    <Component onClick={personHandler}>
      <Box>
        <Image src={user.picture} alt="display picture" />
      </Box>
      <Box style={{ width: "100%" }}>
        <Container>
          <Typography>{user.name}</Typography>
          {message?.text && (
            <Timestamp>{formatDate(message?.timestamp)}</Timestamp>
          )}
        </Container>
        <Box>
          <Text>
            {message?.text?.includes("whatsapp-clone-production-77a4.up.railway.app") ? "media" : message.text}
          </Text>
        </Box>
      </Box>
    </Component>
  );
};

export default Conversation;
