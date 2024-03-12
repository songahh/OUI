import * as React from 'react';

import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import styled from 'styled-components';

const BottomNaviWrapper = styled( BottomNavigation )`
    background-color: transparent;
    position: fixed;
    bottom: 0;
    left: 0; 
    right: 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
`;

export default function BottomNavi() {
  const [ value, setValue ] = React.useState(0);

  return (
    <>
    <BottomNaviWrapper
      showLabels
      value={ value }
      onChange={( event, newValue ) => {
        setValue( newValue );
      }}
    >
      <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
      <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
      <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />
    </BottomNaviWrapper>
    </>

  );
}