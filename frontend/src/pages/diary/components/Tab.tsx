import styled from 'styled-components';

const ButtonWrapper = styled.button`
    box-sizing: border-box;
    display: flex;
    padding: 0px;
    border: none;
    cursor: pointer;
    background-color: transparent;
`

const Tab = ( props: TabProps ) => {
    const { value, onClick, disabled } = props;

    return (
        <ButtonWrapper onClick={ onClick } disabled={disabled}>
            { value }
        </ButtonWrapper>
    )
}

export default Tab;

type TabProps = {
    value?: string,
    onClick?: () => void,
    disabled: boolean,
}