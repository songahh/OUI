import styled from 'styled-components';

const ButtonWrapper = styled.button<{ size: number}>`
    box-sizing: border-box;
    display: flex;
    width: ${( props ) => props.size }px;
    padding: 0px;
    margin: 20px;
    border: none;
    cursor: pointer;
    background-color: transparent;
`

const DeleteIcon = ( props: IconProps ) => {
    const { size = 40, onClick } = props;

    return (
        <ButtonWrapper size={ size } onClick={ onClick }>
            <svg xmlns="http://www.w3.org/2000/svg" width="53" height="60" viewBox="0 0 53 60" fill="none">
                <path d="M33 26.5V45.5" stroke="#292929" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M20 26.5V45.5" stroke="#292929" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M8 14.5V47.5C8 53.0228 12.4772 57.5 18 57.5H35C40.5228 57.5 45 53.0228 45 47.5V14.5" stroke="#292929" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M2 14.5H51" stroke="#292929" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M11 14.5L15.8025 5.2049C16.6608 3.54352 18.3746 2.5 20.2446 2.5H32.7554C34.6254 2.5 36.3392 3.54352 37.1975 5.2049L42 14.5" stroke="#292929" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </ButtonWrapper>
    )
}

export default DeleteIcon;

type IconProps = {
    size?: number,
    onClick?: () => void,
}