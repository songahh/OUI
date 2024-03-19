import { useState } from "react";
import { Box } from "@mui/material";
import styled from "styled-components";

type ButtonWrapperProps = {
    selected?: boolean;
}

const BoxWrapper = styled(Box)`
    border-radius: 4px;
    display: flex;
    justify-content: center;
    margin-left: auto;
    align-items: center;
    width: 100%;
`;

const ButtonWrapper = styled.button<ButtonWrapperProps>`
    
    background-color: ${(props) => (props.selected ? "black" : "white")};
    color: ${(props) => (props.selected ? "white" : "black")};
    padding: 10px;
    margin: 3px;
    cursor: pointer;

`;

const Switch = () => {
    const [keyType, setKeyType] = useState(1);

    return (
        <BoxWrapper>
            <ButtonWrapper onClick={() => setKeyType(1)} selected={keyType === 1}>
                월간
            </ButtonWrapper>
            <ButtonWrapper onClick={() => setKeyType(2)} selected={keyType === 2}>
                주간
            </ButtonWrapper>
        </BoxWrapper>
    );
}

export default Switch;
