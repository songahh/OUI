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


const Drawer = () => {
    const [ open, setOpen ] = React.useState(false);

    const toggleDrawer = ( newOpen: boolean ) => () => {
      setOpen( newOpen );
    };
  
    const DrawerList = (
      <Box sx={{ width: 250 }} role="presentation">
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
        <Bottom anchor={'bottom'} open={open} onClose={ toggleDrawer(false) } onOpen={toggleDrawer( true )} >
        <IconButton
      onClick={ toggleDrawer(false) }
      sx={{ position: 'absolute', right: 8, top: 8, zIndex: 1 }} 
    >
      <CloseIcon /> {/* IconButton 내부에는 아이콘 컴포넌트만 포함 */}
    </IconButton>
            { DrawerList }
        </Bottom>
        </div>   
    );

}
export default Drawer;