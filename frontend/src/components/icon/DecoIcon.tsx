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

const DecoIcon = ( props: IconProps ) => {
    const { size = 40, onClick } = props;

    return (
        <ButtonWrapper size={ size } onClick={ onClick }>
            <svg xmlns="http://www.w3.org/2000/svg" width={ size } height={ size / 4 * 5 } viewBox="0 0 64 72" fill="none">
                <path d="M31.0858 30.7124L32.5742 30.5263L31.0858 30.7124ZM40.3404 14.8477L38.8695 15.1419L38.8695 15.1419L40.3404 14.8477ZM49 33.0528V31.5528H47.4562L47.5006 33.096L49 33.0528ZM54 33.0528L55.4993 33.096L55.5438 31.5528H54V33.0528ZM50 67.8009L51.4994 67.7607L51.4993 67.7577L50 67.8009ZM53 67.8009L51.5006 67.7577L51.5005 67.7607L53 67.8009ZM44.3847 17.2573L45.5141 18.2444L44.3847 17.2573ZM51.8221 70.3331L51.3517 68.9088L51.8221 70.3331ZM50.6028 70.079L51.7181 69.0759L50.6028 70.079ZM58.7007 40.2605C59.8881 46.1978 56.978 52.9884 51.5811 58.4091C46.2097 63.8042 38.6423 67.5521 31.0858 67.5521V70.5521C39.593 70.5521 47.8905 66.368 53.7071 60.5257C59.4983 54.709 63.0993 46.9566 61.6425 39.6722L58.7007 40.2605ZM31.0858 67.5521C15.8506 67.5521 3.5 55.2016 3.5 39.9663H0.5C0.5 56.8584 14.1937 70.5521 31.0858 70.5521V67.5521ZM3.5 39.9663C3.5 24.7311 15.8506 12.3805 31.0858 12.3805V9.38052C14.1937 9.38052 0.5 23.0743 0.5 39.9663H3.5ZM29.5974 30.8984C29.8058 32.5661 30.5158 33.8731 31.6825 34.7858C32.7996 35.6597 34.2015 36.0666 35.626 36.2489C38.4227 36.6067 41.9965 36.1607 45.2786 35.8403C48.7063 35.5058 51.8838 35.2957 54.3465 35.8882C55.5455 36.1767 56.4874 36.6376 57.1881 37.298C57.8756 37.946 58.4231 38.8723 58.7007 40.2605L61.6425 39.6722C61.259 37.7549 60.4432 36.2435 59.2457 35.1148C58.0613 33.9986 56.5966 33.344 55.0482 32.9714C52.016 32.2419 48.3352 32.5278 44.9872 32.8545C41.4937 33.1955 38.3744 33.5761 36.0067 33.2732C34.849 33.125 34.0509 32.8297 33.5309 32.4229C33.0605 32.0549 32.6963 31.5028 32.5742 30.5263L29.5974 30.8984ZM31.0858 12.3805C33.1689 12.3805 35.1016 12.5076 36.56 12.9848C37.9681 13.4455 38.6665 14.1268 38.8695 15.1419L41.8112 14.5536C41.3183 12.0887 39.4884 10.7864 37.4928 10.1335C35.5474 9.49703 33.2007 9.38052 31.0858 9.38052V12.3805ZM38.8695 15.1419C39.1064 16.3263 38.8133 17.5352 38.0775 18.8442C37.332 20.1704 36.2006 21.4768 34.9444 22.795C33.7466 24.0519 32.3529 25.3975 31.3598 26.6009C30.8506 27.218 30.3787 27.8749 30.05 28.5559C29.7208 29.2381 29.4899 30.0387 29.5974 30.8984L32.5742 30.5263C32.5626 30.4336 32.5729 30.2305 32.7518 29.8598C32.9313 29.488 33.2344 29.0428 33.6738 28.5103C34.5779 27.4146 35.7755 26.2714 37.1161 24.8646C38.3984 23.5191 39.7525 21.9868 40.6927 20.3141C41.6426 18.6242 42.2354 16.6739 41.8112 14.5535L38.8695 15.1419ZM49 34.5528H54V31.5528H49V34.5528ZM52.5006 33.0097L51.5006 67.7577L54.4993 67.844L55.4993 33.096L52.5006 33.0097ZM51.5482 68.8742H51.2972V71.8742H51.5482V68.8742ZM51.4993 67.7577L50.4993 33.0097L47.5006 33.096L48.5006 67.844L51.4993 67.7577ZM51.7181 69.0759C51.616 68.9624 51.582 68.9073 51.5719 68.8892C51.5674 68.8812 51.5634 68.8751 51.5563 68.843C51.5458 68.7948 51.5326 68.7048 51.5227 68.5156C51.5124 68.3205 51.5084 68.0961 51.4994 67.7607L48.5005 67.841C48.5149 68.3772 48.5146 68.9769 48.6257 69.4845C48.7682 70.1352 49.069 70.6167 49.4874 71.082L51.7181 69.0759ZM51.5005 67.7607C51.4905 68.1349 51.4866 68.3878 51.4698 68.6129C51.4533 68.8329 51.4301 68.921 51.4208 68.9478C51.4201 68.9497 51.4408 68.9007 51.4885 68.8574C51.5234 68.8257 51.5086 68.857 51.3517 68.9088L52.2925 71.7574C52.7232 71.6152 53.1449 71.4056 53.5051 71.0786C53.878 70.74 54.1127 70.3413 54.255 69.9314C54.4945 69.2413 54.4845 68.3993 54.4994 67.841L51.5005 67.7607ZM60.5 23.5249C60.5 27.7891 56.1749 31.5528 51.5609 31.5528V34.5528C57.4711 34.5528 63.5 29.785 63.5 23.5249H60.5ZM51.5609 31.5528C47.1273 31.5528 43.5331 27.9588 43.5331 23.525H40.5331C40.5331 29.6156 45.4704 34.5528 51.5609 34.5528V31.5528ZM43.5331 23.525C43.5331 21.5018 44.2795 19.6569 45.5141 18.2444L43.2554 16.2701C41.5612 18.2083 40.5331 20.7483 40.5331 23.525H43.5331ZM45.5141 18.2444C51.4014 11.5092 51.7157 6.74159 50.5816 3.65441C50.0446 2.19267 49.2233 1.26315 48.9654 0.938762C48.9345 0.899876 48.931 0.893909 48.9385 0.904864C48.9432 0.911563 48.96 0.93609 48.9813 0.973767C49 1.00675 49.0425 1.08498 49.0802 1.19579C49.1269 1.33306 49.3698 2.19451 48.6011 2.80802C48.3175 3.03433 48.0309 3.09389 47.8955 3.11272C47.75 3.13298 47.6376 3.12515 47.5894 3.12071C47.4573 3.10853 47.4008 3.07853 47.5892 3.1391C47.7259 3.18305 47.9141 3.24811 48.1909 3.34353L49.1687 0.507354C48.9086 0.417674 48.682 0.339211 48.5074 0.283075C48.3845 0.243566 48.1201 0.156915 47.8649 0.133378C47.7859 0.126096 47.648 0.118259 47.482 0.141367C47.3261 0.163056 47.024 0.228327 46.7297 0.463239C45.9394 1.09395 46.1796 1.98416 46.2401 2.16197C46.3181 2.39137 46.4364 2.56109 46.4703 2.61014C46.5224 2.68545 46.5775 2.75586 46.617 2.80561C46.9228 3.19028 47.4222 3.75407 47.7656 4.68892C48.3923 6.39491 48.7067 10.0336 43.2554 16.2701L45.5141 18.2444ZM48.1909 3.34353C49.0016 3.62305 50.2005 4.35729 51.5848 5.5696C52.9446 6.76051 54.3988 8.33867 55.7315 10.1975C58.4108 13.9344 60.5 18.6628 60.5 23.5249H63.5C63.5 17.8349 61.0766 12.504 58.1696 8.44943C56.7091 6.41247 55.1017 4.66182 53.5613 3.31276C52.0454 1.98511 50.5055 0.968226 49.1687 0.507354L48.1909 3.34353ZM51.5482 71.8742C51.7679 71.8742 52.0242 71.846 52.2925 71.7574L51.3517 68.9088C51.4438 68.8784 51.5141 68.8742 51.5482 68.8742V71.8742ZM51.2972 68.8742C51.4035 68.8742 51.5735 68.9152 51.7181 69.0759L49.4874 71.082C49.9832 71.6333 50.6656 71.8742 51.2972 71.8742V68.8742Z" fill="#262626"/>
                <circle cx="22.5" cy="24.5" r="5.5" fill="#BDB5FF"/>
                <circle cx="26.5" cy="57.5" r="5.5" fill="#BBDED6"/>
                <circle cx="40.5" cy="55.5" r="5.5" fill="#F09690"/>
                <circle cx="15.5" cy="49.5" r="5.5" fill="#FFE17D"/>
                <path d="M20 36.5C20 39.5376 17.5376 42 14.5 42C11.4624 42 9 39.5376 9 36.5C9 33.4624 11.4624 31 14.5 31C17.5376 31 20 33.4624 20 36.5Z" fill="#C0DEFF"/>
            </svg>
        </ButtonWrapper>
    )
}

export default DecoIcon;

type IconProps = {
    size?: number,
    onClick?: () => void,
}