import styled from 'styled-components';

const ContentWrapper = styled.div`
    box-sizing: border-box;
    padding: 10px 20px;
`

const ColorPickerContainer = styled.div`
    position: relative;
    display: inline-block;
`;

const LabelWrapper = styled.label`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    cursor: pointer;
`;

const ColorPicker = styled.input`
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    width: 50px;
    height: 50px;
    background-color: transparent;
    border: none;
    cursor: pointer;
    &::-webkit-color-swatch {
        border-radius: 10px;
        border: none;
    }
    &::-moz-color-swatch {
        border-radius: 10px;
        border: none;
    }
`

const TextboxContent = ( props: ContentProps ) => {
    const fontList = [
        { fontId: 1, fontTitle: "둘기마요체", fontFamily: "Dovemayo" },
        { fontId: 2, fontTitle: "IM혜민체", fontFamily: "IMHyeMin" },
    ];

    const { 
        selectedFont,
        handleFontChange,
        handleFontWeight,
        textAlign,
        handleTextAlign,
        fontColor,
        handleFontColor 
    } = props;

    return (
        <ContentWrapper>
        <div style={{ display: "flex", alignItems: "center" }}>
            <label htmlFor='font' style={{ paddingRight: 10 }}>글씨체</label>
            <select name="font" id="font" value={ selectedFont } onChange={ handleFontChange } style={{ fontFamily: selectedFont }}>
                { fontList.map((font) => (
                    <option
                        key={ font.fontId } 
                        value={ font.fontFamily }
                        style={{
                            fontFamily: `${ font.fontFamily }`,
                        }}
                    >
                        { font.fontTitle }
                    </option>
                )) }
            </select>
        </div>
        <button style={{ border: "0", backgroundColor: "transparent" }} onClick={ handleFontWeight }>
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 45 45" fill="none">
                <path d="M29.25 20.2312C31.0688 18.975 32.3437 16.9125 32.3437 15C32.3437 10.7625 29.0625 7.5 24.8437 7.5H15C13.9687 7.5 13.125 8.34375 13.125 9.375V31.875C13.125 32.9063 13.9687 33.75 15 33.75H25.8375C29.7187 33.75 33.2625 30.5812 33.2812 26.6812C33.3 23.8125 31.6875 21.3562 29.25 20.2312ZM18.75 12.1875H24.375C25.9312 12.1875 27.1875 13.4438 27.1875 15C27.1875 16.5562 25.9312 17.8125 24.375 17.8125H18.75V12.1875ZM25.3125 29.0625H18.75V23.4375H25.3125C26.8687 23.4375 28.125 24.6938 28.125 26.25C28.125 27.8062 26.8687 29.0625 25.3125 29.0625Z" fill="#262626"/>
            </svg>
        </button>
        <button
            style={{ border: "0", backgroundColor: "transparent" }}
            onClick={() => handleTextAlign("left")}
            disabled={ textAlign === "left" }
        >
            왼쪽정렬
        </button>
        <button
            style={{ border: "0", backgroundColor: "transparent" }}
            onClick={() => handleTextAlign("center")}
            disabled={ textAlign === "center" }
        >
            가운데정렬
        </button>
        <button
            style={{ border: "0", backgroundColor: "transparent" }}
            onClick={ () => handleTextAlign("right") }
            disabled={ textAlign === "right" }
        >
            왼쪽정렬
        </button>
        <ColorPickerContainer>
            <LabelWrapper htmlFor="color">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 10 10" fill="none">
                    <path d="M9.20404 1.92559L8.07443 0.795986C7.88617 0.607718 7.58204 0.607718 7.39377 0.795986L6.09866 2.0911C5.98194 2.20782 5.79284 2.20832 5.67551 2.0922L5.16807 1.59003C5.05074 1.47391 4.86164 1.4744 4.74492 1.59113L4.48742 1.84863C4.37026 1.96578 4.37026 2.15573 4.48742 2.27289L4.74864 2.53411C4.8658 2.65127 4.8658 2.84122 4.74864 2.95838L0.947648 6.75937C0.760112 6.94691 0.654755 7.20126 0.654755 7.46648V9.04527C0.654755 9.21096 0.789069 9.34527 0.954755 9.34527H2.53355C2.79876 9.34527 3.05312 9.23992 3.24065 9.05238L7.04165 5.25138C7.1588 5.13423 7.34875 5.13423 7.46591 5.25138L7.72713 5.51261C7.84429 5.62976 8.03424 5.62976 8.1514 5.51261L8.4078 5.25621C8.52495 5.13905 8.52495 4.9491 8.4078 4.83195L7.9052 4.32935C7.78805 4.2122 7.78805 4.02225 7.9052 3.90509L9.19921 2.61108C9.39231 2.41799 9.39231 2.11386 9.20404 1.92559ZM2.63495 8.29193C2.57869 8.34819 2.50239 8.3798 2.42282 8.3798H1.92023C1.75454 8.3798 1.62023 8.24548 1.62023 8.0798V7.5772C1.62023 7.49764 1.65184 7.42133 1.7081 7.36507L5.5111 3.56207L6.43795 4.48893L2.63495 8.29193Z" fill="white"/>
                </svg>
            </LabelWrapper>
            <ColorPicker type="color" id="color" value={ fontColor } onChange={ handleFontColor } />
        </ColorPickerContainer>
        </ContentWrapper>
    )
}
export default TextboxContent;

type ContentProps = {
    selectedFont?: string,
    handleFontChange?: (e: any) => void,
    handleFontWeight?: () => void,
    textAlign?: string,
    handleTextAlign?: (position: string) => void,
    fontColor?: string,
    handleFontColor?: (e: any) => void,
}