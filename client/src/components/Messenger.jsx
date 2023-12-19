import {useContext} from 'react'

//Components

import LoginDialog from './Account/LoginDialog'
import {AppBar, Box, Toolbar,styled} from '@mui/material'

import {AuthenticationContext } from '../context/AuthenticationContext'
import ChatDialog from './ChatDialog';

//




const messenger = () => {

  const Background = styled(AppBar)({
    height:'125px',
    backgroundColor:'#00a784',
    boxShadow:'none'
  });
  const LoginBackground = styled(AppBar)({
    height:'220px',
    backgroundColor:'#00a884',
    boxShadow:'none'
  });
  
  const Div = styled(Box)({
    backgroundColor:'#dcdcdc'
  });
  
  const {account}  = useContext(AuthenticationContext);
  
  
  return (
    <>
    
    {account?
    <>
      <Background>
      <Toolbar>
      </Toolbar>
    </Background>
    <ChatDialog/>
    </>
    :
    <>   
     <LoginBackground>
      <Toolbar>
          <LoginDialog/>
      </Toolbar>
    </LoginBackground>
    </>
    }
    </> 
  )
}

export default messenger
