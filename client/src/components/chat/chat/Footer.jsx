import { useState,useEffect } from 'react';

import { EmojiEmotions, AttachFile, Mic } from '@mui/icons-material';
import { Box, styled, InputBase } from '@mui/material';
import {uploadFile} from '../../../services/api'

const Container = styled(Box)`
    height: 55px;
    position:absolute;
    bottom : 0px;
    width: -webkit-fill-available;
    background: #ededed;
    display: flex;
    align-items: center;
    padding: 0 15px;
    &  > * {
        margin: 5px;
        color: #919191;
    }
`;

const Search = styled(Box)`
    border-radius: 18px;
    background-color: #FFFFFF;
    width: calc(94% - 100px);
`;

const InputField = styled(InputBase)`
    width: 100%;
    padding: 20px;
    padding-left: 25px;
    font-size: 14px;
    height: 20px;
    width: 100%;
`;

const ClipIcon = styled(AttachFile)`
    transform: 'rotate(40deg)'
`;


const Footer = ({sendMessage,setMessage, message, file, setFile,setImage}) => {
   

    useEffect(() => {
        const getImage = async () => {
            if (file) {
                const data = new FormData();
                data.append("name", file.name);
                data.append("file", file);

                const response = await uploadFile(data);
                setImage(response.data);
                
            }
        }
        getImage();
    }, [file])


    const setFileHandler = (e)=>{
       
        setFile(e.target.files[0]);
        setMessage(e.target.files[0].name);
        console.log(file);
    }
   
    return (
        <Container>
            <EmojiEmotions />
            <label htmlFor="fileInput">
            <ClipIcon />
            <input type='file'
                id='fileInput'
                style={{
                    display:'none'
                }}
                onChange={setFileHandler}
            />
            </label>
           

            <Search>
                <InputField placeholder='This is Message' onChange={(e)=>{setMessage(e.target.value)}}
                    onKeyUp={sendMessage} value={message}
                />
            </Search>
            <Mic />
        </Container>
    )
}

export default Footer;