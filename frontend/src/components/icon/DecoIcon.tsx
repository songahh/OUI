import DecorationIcon from 'src/asset/images/icon/deco-icon.svg'
import styled from 'styled-components';

const ButtonWrapper = styled.button<{ size: number}>`
    box-sizing: border-box;
    display: flex;
    width: ${( props ) => props.size }px;
    border: none;
    cursor: pointer;
    background-color: transparent;
`

const DecoIcon = ( props: IconProps ) => {
    const { size, onClick } = props;

    return (
        <ButtonWrapper size={ size } onClick={ onClick }>
            <img src={ DecorationIcon } alt="icon" />
        </ButtonWrapper>
    )
}

export default DecoIcon;

type IconProps = {
    size?: number,
    onClick?: () => void,
}