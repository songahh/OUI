import styled from 'styled-components';

const ButtonWrapper = styled.button<{ size: number}>`
    box-sizing: border-box;
    display: flex;
    width: ${( props ) => props.size }px;
    padding: 0px;
    margin: 10px;
    border: none;
    cursor: pointer;
    background-color: transparent;
`

const SaveIcon = ( props: IconProps ) => {
    const { size = 80, onClick } = props;

    return (
        <ButtonWrapper size={ size } onClick={ onClick }>
            <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 81 80" fill="none">
                <path d="M30.7376 33.3337L43.3291 42.7772C43.7475 43.0911 44.3372 43.0294 44.6816 42.6357L67.4043 16.667" stroke="#262626" strokeWidth="5" strokeLinecap="round"/>
                <path d="M70.7383 40C70.7383 46.2683 68.7748 52.3792 65.1237 57.4743C61.4725 62.5695 56.3171 66.393 50.3815 68.4079C44.4458 70.4228 38.0281 70.5278 32.0297 68.7082C26.0313 66.8886 20.7536 63.2358 16.9377 58.2628C13.1218 53.2899 10.9594 47.2465 10.7543 40.9816C10.5493 34.7166 12.3117 28.5448 15.7942 23.3329C19.2767 18.121 24.3042 14.1308 30.1708 11.9228C36.0373 9.71481 42.4481 9.39987 48.5029 11.0222" stroke="#262626" strokeWidth="5" strokeLinecap="round"/>
            </svg>
        </ButtonWrapper>
    )
}

export default SaveIcon;

type IconProps = {
    size?: number,
    onClick?: () => void,
}