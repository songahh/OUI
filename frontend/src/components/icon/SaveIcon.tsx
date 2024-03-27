import styled from 'styled-components';

const ButtonWrapper = styled.button<{ size: number}>`
    box-sizing: border-box;
    display: flex;
    width: ${( props ) => props.size }px;
    border: none;
    cursor: pointer;
    background-color: transparent;
`

const SaveIcon = ( props: IconProps ) => {
    const { size, onClick } = props;

    return (
        <ButtonWrapper size={ size } onClick={ onClick }>
            <svg xmlns="http://www.w3.org/2000/svg" width="71" height="70" viewBox="0 0 71 70" fill="none">
                <path d="M26.9889 29.1663L37.9137 37.3599C38.3322 37.6738 38.9218 37.6121 39.2663 37.2184L59.0723 14.583" stroke="#262626" strokeWidth="5" strokeLinecap="round"/>
                <path d="M61.9883 35C61.9883 40.4848 60.2703 45.8318 57.0755 50.29C53.8808 54.7483 49.3698 58.0939 44.1761 59.8569C38.9824 61.6199 33.3669 61.7118 28.1183 60.1197C22.8697 58.5275 18.2517 55.3313 14.9128 50.98C11.5738 46.6286 9.68179 41.3407 9.50234 35.8589C9.32288 30.377 10.865 24.9767 13.9122 20.4163C16.9594 15.8559 21.3585 12.3645 26.4917 10.4325C31.6249 8.50046 37.2344 8.22489 42.5323 9.64445" stroke="#262626" strokeWidth="5" strokeLinecap="round"/>
            </svg>
        </ButtonWrapper>
    )
}

export default SaveIcon;

type IconProps = {
    size?: number,
    onClick?: () => void,
}