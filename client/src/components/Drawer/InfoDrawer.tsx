import Drawer from '@mui/material/Drawer';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box,Typography,styled } from '@mui/material';
import Profile from './Profile';



const drawerStyle = {
    zIndex : 1500,
    height : '95%',
    width : '30%',
    left : 20,
    top : 20,
    boxShadow : 'none',

}

const UpperBox = styled(Box)`
   background-color : #008069;
   height : 125px;
   color : white;
   display : flex;
   align-items : center;
   & > svg, & > p{
     margin-top:auto;
     padding : 20px;
     font-weight:  600;
     
   }

   & > p {
    font-size : 22px;
    transform : translateY(9%);
   
   }
`
const InfoDrawer = (props) => {
 
  const {open,setOpen} = props;
  const closeHandler = ()=>{
    setOpen(false);
  }
  return (
    <Drawer
     
       style={{zIndex:1400}}
       PaperProps={{sx:drawerStyle}}
       open = {open}
       onClose = {closeHandler}
       >
       <UpperBox>
        <ArrowBackIcon onClick = {closeHandler}/>
        <Typography>Profile</Typography>
       </UpperBox>
       <Box>
         <Profile/>
       </Box>


    </Drawer>
  )
}

export default InfoDrawer
