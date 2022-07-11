import React,{useState} from "react";
import {Paper,Divider,Container,Typography,Button,AppBar,TextField} from "@mui/material"
import {Password,Settings} from "@mui/icons-material";
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux"
import { changeUsername } from "../../redux";

const SettingsPage = () => {
    const dispatch=useDispatch();
    const user=JSON.parse(localStorage.getItem("user"));
    const userId=user?.id;
    const [editMode,setEditMode]=useState(false);
    const [userName,setUsername]=useState(user?.name)
    
    const switchToEditMode=()=>{
            setEditMode(true);
    }

    const cancelUsernameUpdate=()=>{
        setEditMode(false);
        setUsername(user?.name)
    }

    const saveUpdatedUsernameChanges=async(userId,username)=>{
        const updatedUsername=await dispatch(changeUsername(userId,username));
        if(updatedUsername) {
            setUsername(updatedUsername);
            setEditMode(false);
        }
        
        
        
        
    }

    const changePassword=()=>{

    }

  return (
    <Container maxWidth="lg">
        <AppBar position="static" color="inherit">
            <Settings/>
            <Typography variant="h2">Settings</Typography>
        </AppBar>
        <Divider/>
        <Paper style={{margin:"20px 0"}} spacing={2}>
            <div className="settingItem">
                <div className="currentCreds">
                <Typography variant="h6">Change username</Typography>
                {editMode && (
                    <>
                     <TextField variant="outlined" fullWidth value={userName} onChange={e=>setUsername(e.target.value)}/>
                    <Button onClick={()=>saveUpdatedUsernameChanges(userId,userName)} color="success" variant="contained">Save Changes</Button>
                    <Button onClick={cancelUsernameUpdate} color="error">cancel</Button>
                    </>
                   
                )}
                {!editMode && (<Typography variant="h6" color="textSecondary">{userName}</Typography>)}
                </div>
               
                <Button onClick={switchToEditMode} variant="contained" color="primary">Change</Button>
            </div>
            <Divider/>
            <div className="settingItem">
                <div className="currentCreds">
                <Typography variant="h6">Change password</Typography>
                <Password/>
                
                
                </div>
                <Button onClick={changePassword} variant="contained" color="primary">Change</Button>
                
            </div>
            <Divider/>
            <Button color="primary" ><Link  to="/">Back to Home</Link></Button>
        </Paper>
    </Container>
  );
};

export default SettingsPage;
