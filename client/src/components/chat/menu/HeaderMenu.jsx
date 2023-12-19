import { useState } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';


const HeaderMenu = ({setOpenDrawer}) => {
    

    const [openMenu, setOpenMenu] = useState();

    const menuHandler = (e)=>{
        setOpenMenu(e.currentTarget);
    }

    const profileHandler = ()=>{
        setOpenDrawer(true);
        setOpenMenu(false);
    }
    const handleClose = ()=>{
        setOpenMenu(false);
    }
  return (
    <>
    <MoreVertIcon onClick={menuHandler}/>
    <Menu
        id="basic-menu"
        anchorEl={openMenu}
        anchorOrigin = {{
            vertical: 'bottom',
            horizontal : 'left'
        }}
        transformOrigin={{
            vertical : 'top',
            horizontal:'right'
        }}
      
        open={openMenu}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={profileHandler}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
      </>
  )
}

export default HeaderMenu
