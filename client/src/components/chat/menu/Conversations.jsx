import { useState, useEffect, useContext } from 'react';

import { Box, styled, Divider } from '@mui/material';


//components
import Conversation from './Conversation';
import { getUsers } from '../../../services/api'
import { AuthenticationContext } from '../../../context/AuthenticationContext';

const Component = styled(Box)`
    overflow: overlay;
    height: 81vh;
`;

const StyledDivider = styled(Divider)`
    margin: 0 0 0 70px;
    background-color: #e9edef;
    opacity: .6;
`;

const Conversations = ({text}) => {
    const [users, setUsers] = useState([]);
    
    const { account, socket, setActiveUsers } = useContext(AuthenticationContext);

    useEffect(() => {
        const fetchData = async () => {
            let data = await getUsers();
            let filteredData = data.filter(user => text==" " || user.name.toLowerCase().includes(text.toLowerCase()))
            setUsers(filteredData);
           
        }
        fetchData();
    },[text]);


    useEffect(() => {
        
        socket.current.emit('addUser', account);
        socket.current.on("getUsers", users => {
            setActiveUsers(users);
        })
    }, [])


    return (
        <Component>
               
            {
                users && users.map((user, index) => (
                        <>
                            <Conversation key={index} user={user} />
                            {
                                users.length !== (index + 1)  && <StyledDivider />
                            }
                        </>
                ))
            }
        </Component>
    )
}

export default Conversations;