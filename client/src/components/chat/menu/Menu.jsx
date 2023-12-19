import { useState } from 'react';

import { Box } from '@mui/material';

//components


const Wrap = styled(Box)({
    width:'450px'
})
import Header from './Header';
import Search from './Search';
import Conversations from './Conversations';
import styled from '@emotion/styled';

const Menu = () => {
    const [text, setText] = useState('');
    
    return (
        <Wrap>
            <Header/>
            <Search setText={setText} />
            <Conversations text={text}/>
        </Wrap>
    )
}

export default Menu;