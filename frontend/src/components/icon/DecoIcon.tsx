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
            <svg xmlns="http://www.w3.org/2000/svg" width="59" height="68" viewBox="0 0 59 68" fill="none">
                <path d="M28.662 29.1528L30.6465 28.9047L28.662 29.1528ZM37.1454 14.6102L35.1842 15.0024L35.1842 15.0025L37.1454 14.6102ZM45.0833 31.2982V29.2982H43.0249L43.0842 31.3557L45.0833 31.2982ZM49.6667 31.2982L51.6658 31.3557L51.725 29.2982H49.6667V31.2982ZM46 63.1506L47.9993 63.097L47.9992 63.0931L46 63.1506ZM48.75 63.1506L46.7508 63.0931L46.7507 63.097L48.75 63.1506ZM40.8527 16.8189L42.3585 18.1352L40.8527 16.8189ZM47.6815 65.4681L48.3166 67.3646L47.6815 65.4681ZM46.5297 65.2132L48.0281 63.8885L46.5297 65.2132ZM53.3628 38.0278C54.3951 43.1897 51.8714 49.214 47.0065 54.1005C42.1754 58.9529 35.3907 62.2976 28.662 62.2976V66.2976C36.6583 66.2976 44.4165 62.3713 49.8411 56.9227C55.2319 51.5081 58.6767 44.2014 57.2852 37.2434L53.3628 38.0278ZM28.662 62.2976C15.0415 62.2976 4 51.256 4 37.6356H0C0 53.4652 12.8324 66.2976 28.662 66.2976V62.2976ZM4 37.6356C4 24.0151 15.0415 12.9736 28.662 12.9736V8.97357C12.8324 8.97357 0 21.806 0 37.6356H4ZM26.6774 29.4009C26.8865 31.0736 27.6093 32.4289 28.8239 33.379C29.9723 34.2775 31.3832 34.6737 32.7445 34.8479C35.3975 35.1873 38.7682 34.7648 41.7328 34.4755C44.8914 34.1672 47.6992 33.9903 49.8381 34.5049C50.8644 34.7519 51.619 35.1341 52.1604 35.6444C52.6844 36.1383 53.1304 36.8655 53.3628 38.0278L57.2852 37.2434C56.9116 35.3757 56.1078 33.8683 54.9039 32.7336C53.7175 31.6153 52.2659 30.9749 50.7738 30.6159C47.8756 29.9186 44.3967 30.1965 41.3442 30.4944C38.0978 30.8112 35.3332 31.1465 33.2522 30.8802C32.2465 30.7516 31.6407 30.5041 31.2885 30.2285C31.0023 30.0047 30.7404 29.6558 30.6465 28.9047L26.6774 29.4009ZM28.662 12.9736C30.5649 12.9736 32.2502 13.0923 33.4856 13.4965C34.6541 13.8788 35.0585 14.3739 35.1842 15.0024L39.1065 14.218C38.5943 11.6565 36.6811 10.3333 34.7295 9.6948C32.8447 9.07817 30.6073 8.97357 28.662 8.97357V12.9736ZM35.1842 15.0025C35.3624 15.8931 35.1561 16.8468 34.5263 17.9673C33.8835 19.1109 32.8927 20.2613 31.7466 21.464C30.6783 22.585 29.3599 23.8606 28.4311 24.9861C27.9498 25.5694 27.482 26.2157 27.1497 26.9044C26.8165 27.5946 26.5589 28.4529 26.6774 29.4009L30.6465 28.9047C30.6559 28.9795 30.6194 28.9179 30.7521 28.643C30.8855 28.3665 31.1282 28.0025 31.5164 27.532C32.3267 26.5501 33.3836 25.5443 34.6423 24.2235C35.823 22.9845 37.1107 21.5328 38.0132 19.9273C38.9286 18.2988 39.5343 16.3566 39.1065 14.2179L35.1842 15.0025ZM45.0833 33.2982H49.6667V29.2982H45.0833V33.2982ZM47.6675 31.2407L46.7508 63.0931L50.7492 63.2081L51.6658 31.3557L47.6675 31.2407ZM47.4076 63.5095H47.2232V67.5095H47.4076V63.5095ZM47.9992 63.0931L47.0825 31.2407L43.0842 31.3557L44.0008 63.2081L47.9992 63.0931ZM48.0281 63.8885C47.9627 63.8146 47.9671 63.8075 47.9891 63.8482C48.0176 63.9007 48.033 63.9523 48.0374 63.973C48.0375 63.9735 48.0279 63.9267 48.0196 63.7665C48.011 63.5988 48.0076 63.4084 47.9993 63.097L44.0007 63.2041C44.0127 63.6527 44.0122 64.2723 44.124 64.8009C44.2755 65.5172 44.6013 66.0515 45.0313 66.5379L48.0281 63.8885ZM46.7507 63.097C46.7461 63.2702 46.7434 63.3993 46.7391 63.5344C46.735 63.6633 46.7304 63.7634 46.7242 63.8466C46.7108 64.0266 46.6948 64.0468 46.7115 63.9983C46.7226 63.966 46.7455 63.9102 46.7876 63.8436C46.8306 63.7754 46.8832 63.7125 46.9409 63.6595C47.0556 63.5542 47.1287 63.544 47.0465 63.5716L48.3166 67.3646C48.7673 67.2137 49.2362 66.9823 49.6459 66.6062C50.0717 66.2153 50.3365 65.7572 50.4941 65.2992C50.7503 64.5543 50.7371 63.66 50.7493 63.2041L46.7507 63.097ZM55 22.5642C55 26.0573 51.3903 29.2982 47.4309 29.2982V33.2982C53.1185 33.2982 59 28.7185 59 22.5642H55ZM47.4309 29.2982C43.7119 29.2982 40.697 26.2835 40.697 22.5644H36.697C36.697 28.4926 41.5027 33.2982 47.4309 33.2982V29.2982ZM40.697 22.5644C40.697 20.8668 41.3225 19.3204 42.3585 18.1352L39.3469 15.5027C37.6982 17.3889 36.697 19.8621 36.697 22.5644H40.697ZM42.3585 18.1352C47.846 11.8573 48.2652 7.25177 47.1198 4.1341C46.5872 2.68441 45.7673 1.75616 45.5409 1.47136C45.5143 1.43798 45.5219 1.44593 45.5412 1.47395C45.552 1.48958 45.5783 1.52837 45.6099 1.58406C45.6379 1.63349 45.6969 1.74263 45.7486 1.89462C45.8137 2.08608 46.137 3.24067 45.1075 4.06227C44.7272 4.3658 44.3418 4.44641 44.1571 4.47212C43.9588 4.49972 43.8036 4.48928 43.7329 4.48276C43.5311 4.46416 43.4125 4.41235 43.5989 4.47227C43.7163 4.51002 43.8808 4.56687 44.138 4.65553L45.4417 0.873961C45.2067 0.792949 44.9911 0.718232 44.8231 0.664235C44.7241 0.632408 44.4149 0.528676 44.1002 0.499659C44.0013 0.490542 43.8228 0.480094 43.6057 0.51031C43.4022 0.538635 43.0026 0.624473 42.6124 0.935897C41.5632 1.77326 41.8839 2.95421 41.9617 3.18285C42.0629 3.48027 42.2144 3.69566 42.2503 3.74765C42.3104 3.83466 42.3717 3.91263 42.4097 3.96049C42.7 4.32567 43.0907 4.76628 43.3652 5.51346C43.834 6.78954 44.2531 9.88983 39.3469 15.5027L42.3585 18.1352ZM44.138 4.65553C44.7716 4.87397 45.7995 5.48814 47.041 6.5754C48.2498 7.63412 49.5509 9.04484 50.7459 10.7116C53.1545 14.071 55 18.2799 55 22.5642H59C59 17.1759 56.709 12.1638 53.9967 8.38089C52.6314 6.47656 51.126 4.83586 49.6763 3.56628C48.2593 2.32524 46.7767 1.33421 45.4417 0.873961L44.138 4.65553ZM47.4076 67.5095C47.6679 67.5095 47.9826 67.4764 48.3166 67.3646L47.0465 63.5716C47.2045 63.5186 47.3328 63.5095 47.4076 63.5095V67.5095ZM47.2232 63.5095C47.4468 63.5095 47.7684 63.5948 48.0281 63.8885L45.0313 66.5379C45.6389 67.2251 46.4743 67.5095 47.2232 67.5095V63.5095Z" fill="#262626"/>
                <circle cx="20.7917" cy="23.4582" r="5.04167" fill="#BDB5FF"/>
                <circle cx="24.4577" cy="53.7082" r="5.04167" fill="#BBDED6"/>
                <circle cx="37.2917" cy="51.8747" r="5.04167" fill="#F09690"/>
                <circle cx="14.3757" cy="46.3747" r="5.04167" fill="#FFE17D"/>
                <path d="M18.4994 34.4582C18.4994 37.2426 16.2421 39.4998 13.4577 39.4998C10.6732 39.4998 8.41602 37.2426 8.41602 34.4582C8.41602 31.6737 10.6732 29.4165 13.4577 29.4165C16.2421 29.4165 18.4994 31.6737 18.4994 34.4582Z" fill="#C0DEFF"/>
            </svg>
        </ButtonWrapper>
    )
}

export default DecoIcon;

type IconProps = {
    size?: number,
    onClick?: () => void,
}