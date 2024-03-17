import React from 'react';
import styled from 'styled-components';

const CardWrapper = styled.div<CardWrapperProps>`
  display: flex;  
  align-items: center;
  justify-content: center; 

  padding: 20px;
  margin: 10px;

  max-width: 300px;
  width: 20vh;
  height: 40vh;
  background-size : 100% 100%;
  ${( props ) => props.hasButtonText && `
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    background-image:url( ${ process.env.PUBLIC_URL + '/images/ya.jpg' } )
  `}

`;

const CardTitle = styled.h2`
  display: flex;
  margin: 0;
  margin-bottom: 10px;
  color: #333;
`;


const CardButton = styled.button`
  background-color: transparent;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    color: black;
  }
`;

const Card = ( props:CardProps ) => {

  const { buttonText, onClick } = props

  return (
    <CardWrapper onClick={ onClick } hasButtonText={ !!buttonText }>
      <CardButton>{ buttonText }</CardButton>
    </CardWrapper>
  );
};


type CardProps = {
  buttonText?: string;
  onClick?: () => void;
}
type CardWrapperProps = {
  hasButtonText: boolean;
};


export default Card;