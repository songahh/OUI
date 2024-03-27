import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import styled from 'styled-components';

const BottomNaviWrapper = styled( BottomNavigation )`
    background-color: transparent;
    display: flex;
    justify-content: space-between;
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    max-width: 1024px;
    width: 100%;

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