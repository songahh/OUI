import { styled } from 'styled-components';

const ButtonWrapper = styled.button<{ size: number}>`
    box-sizing: border-box;
    display: flex;
    width: ${( props ) => props.size }px;
    padding: 0px;
    margin: 20px 50px;
    border: none;
    cursor: pointer;
    background-color: transparent;
`

const BackIcon = ( props: IconProps ) => {
    const { size = 70, onClick } = props;

    return (
        <ButtonWrapper size={ size } onClick={ onClick }>
            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 17 14" fill="none">
                <path d="M7 1L1 7M1 7L7 13M1 7H16" stroke="#222222" />
            </svg>
        </ButtonWrapper>
    )
}

export default BackIcon;

type IconProps = {
  size?: number,
  onClick?: () => void,
}