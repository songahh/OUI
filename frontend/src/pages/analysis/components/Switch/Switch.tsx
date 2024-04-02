import { useState } from "react";
import { Box } from "@mui/material";
import styled from "styled-components";

type ButtonWrapperProps = {
    selected?: boolean;
}

const BoxWrapper = styled(Box)`
    justify-content: flex-end;
    width: 20%;
    height: 8%;
    display: flex;
    margin: 0 0 0 73%;
    padding: 3px;
    border-radius: 10px;
    gap: 6px;
    background-color: #FFFEFC;
`;

const ButtonWrapper = styled.button<ButtonWrapperProps>`
    background-color: ${(props) => (props.selected ? "#84BBAF" : "#FFFEFC")};
    color: ${(props) => (props.selected ? "#FFFEFC" : "#84BBAF")};
    padding: 5px; 
    margin: 2px;
    cursor: pointer;
    font-size: 26px;
    border: none;
    border-radius: 10px;
    width: 100%;
`;

const Switch = ({ keyType, setKeyType }) => {
    
    return (
        <>
        <BoxWrapper>
            <ButtonWrapper onClick={() => setKeyType(1)} selected={keyType === 1}>
                <p style={{ marginTop:'10%' }}>월간</p>
            </ButtonWrapper>
            <ButtonWrapper onClick={() => setKeyType(2)} selected={keyType === 2}>
                <p style={{ marginTop:'10%' }}>주간</p>
            </ButtonWrapper>
        </BoxWrapper>
        </>

    );
}

export default Switch;
