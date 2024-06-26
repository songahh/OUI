import React from 'react';
import styled from 'styled-components';

const HeaderWrapper = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  padding: 0px;
  background-color: transparent;
`;

const HeaderItem = styled.div`
  display: flex;
  justify-content: center;
  flex-grow: 1;
  padding-left: 20px;
  &:first-child {
    justify-content: flex-start;
  }

  &:last-child {
    justify-content: flex-end;
  }
`;

const Header = ({ children }) => {
    const items = React.Children.toArray( children ).map(( child, index ) => (
      <HeaderItem key={ index }>{ child }</HeaderItem>
    ));
  
    return <HeaderWrapper>{ items }</HeaderWrapper>;
  };

export default Header;