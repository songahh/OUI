import * as React from 'react';
import { Button } from '../Button';
import {
  Box,
  SwipeableDrawer as Bottom, 
  List,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import styled from 'styled-components';

const BottomWrapper = styled(Bottom)`
    max-width: 1024px;
    width: 100%;
    display: flex;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
` 

const Drawer = () => {
    const [ open, setOpen ] = React.useState(false);

    const toggleDrawer = ( newOpen: boolean ) => () => {
      setOpen( newOpen );
    };
  
    const DrawerList = (
      <Box sx={{ maxWidth: '1024px' }} role="presentation">
        <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map(( text, index ) => (
            <ListItem key={ text } disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  { index % 2 === 0 ? <InboxIcon /> : <MailIcon /> }
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
              
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {[ 'All mail', 'Trash', 'Spam' ].map(( text, index ) => (
            <ListItem key={ text } disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={ text } />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    );
    
    return(
        <div>
          <Button btType='hamburger' name="temp"  onButtonClick={ toggleDrawer(true) } ></Button>
          <BottomWrapper anchor={'bottom'} open={open} onClose={ toggleDrawer(false) } onOpen={toggleDrawer( true )} >
            <IconButton onClick={ toggleDrawer(false) } sx={{ position: 'absolute', right: 8, top: 8, zIndex: 1 }} >
              <CloseIcon /> 
            </IconButton>
                { DrawerList }
          </BottomWrapper>
        </div>   
    );

}
export default Drawer;