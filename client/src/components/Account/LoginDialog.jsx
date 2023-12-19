// import React from 'react'
import {Box,Dialog, List, ListItem, Typography,styled} from '@mui/material'
import {qrCodeImage} from '../../constant/data'
import {GoogleLogin} from '@react-oauth/google'
import jwt_decode from 'jwt-decode'
import {addUser} from '../../services/api'



import {AuthenticationContext } from '../../context/AuthenticationContext'
import { useContext } from 'react'


const styleDialog = {
    height : '96%',
    width : '60%',
    boxShadow : 'none',
    maxHeight : '100%',
    maxWidth : ' 100%',
    marginTop : '12%',
    overflow : 'hidden',

}

const BoxParent = styled(Box)({
    display:'flex'

})

const BoxLeft = styled(Box)({
    padding : '56px 0 56px 56px',

})

const QrCode = styled('img')({
    width : '256px',
    height : '256px',
    margin : '50px 0 0 80px'
})

const Title = styled(Typography)({
    fontSize : '26px',
    color : '#252525',
    fontWeight : 300,
    fontFamily : 'inherit',
    marginBottom : '25px',

})

const CustomList = styled(List)`
    & > li{
        padding : 0px;
        margin-bottom : 15px;
        line-height : 28px;
        font-size : 19px;
        color : #4a4a4a;



    }
`


// Functions 



const LoginDialog = () => {
 
const {setAccount} = useContext(AuthenticationContext);

const onLoginError = (res)=>{
        console.log(res);
    };
const onLoginSuccess = async (res)=>{
        const decode = jwt_decode(res.credential);
        setAccount(decode);
        console.log(decode);
        await addUser(decode);

    };
    
  return (
     <Box>
       <Dialog open={true} PaperProps={{sx:styleDialog}} hideBackdrop>
         <BoxParent style={{margin:"0 auto"}}>
            <BoxLeft>
                <Title>Use WhatsApp on your computer</Title>
                <CustomList>
                    <ListItem>1. Open WhatsApp on your phone</ListItem>
                    <ListItem>2. Tap Menu or Setting to link Whatsapp Web</ListItem>
                    <ListItem>3. Tap on Link A device</ListItem>
                </CustomList>
            </BoxLeft>

            <Box style = {{position : 'relative'}}>
                <QrCode src={qrCodeImage} alt="qrcode-img" />
                <Box  style = 
                {{
                    position:'absolute',
                    top:'55%',
                    left:'62%',
                    transform : 'translate(-50% ,-50%)'
                    }}
                >
                <GoogleLogin

                    onSuccess={onLoginSuccess}
                    onError={onLoginError}
                   
                />
                </Box>
            </Box>
         </BoxParent>
       </Dialog>
     </Box>
  )
}

export default LoginDialog
