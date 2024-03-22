import { Doughnut } from "react-chartjs-2";
import angry from 'src/asset/images/emotion/angry.png';
import embarrass from 'src/asset/images/emotion/embarrass.png';
import joy from 'src/asset/images/emotion/joy.png';
import nervous from 'src/asset/images/emotion/nervous.png';
import relax from 'src/asset/images/emotion/relax.png';
import sad from 'src/asset/images/emotion/sad.png';
import styled from "@emotion/styled";


const IconWrapper = styled.div`
  max-width: 1024px;
  display: flex;
  flex-direction: row; 
  justify-content: space-evenly; 
  flex-wrap: wrap; 
  margin: auto; 

  img, div {
    flex: 1 1 auto;
    max-width: 100px; 
    margin: 10px; 
    height: auto; 

    @media (max-width: 768px) {
      max-width: 50px; 
    }
  }
`;

const Monthly = () => {


    const images = {
        sad: sad,
        nervous: nervous,
        angry: angry,
        embarrass: embarrass,
        relax: relax,
        joy: joy,
    };

    const colors = {
        sad: '#C0DEFF',
        nervous: '#BDB5FF',
        angry: '#F09690',
        embarrass: '#BBDED6',
        relax: '#FFC814',
        joy: '#FFDD6B',
    }


    const imageArray = Object.values(images);

    const Data = {
        labels: [ '슬픔', '불안', '분노', '당황', '느긋', '기쁨'],
        datasets: [
          {
            data: [35, 5, 20, 10, 10, 40],
            fill: true,
            backgroundColor: Object.values(colors),
            borderColor: 'transparent',
          }
        ]
    };

    return(
        <>
            <div style={{ fontFamily: 'IMHyeMin', fontWeight: 'bold', fontSize: '16px' }}>
                공유일 님이 3월에 느낀 “감정 통계” 예요!
            </div>
            <div>
                <Doughnut data={ Data }></Doughnut>
            </div>
            <IconWrapper>
                <>
                {imageArray .map(( image, index ) => (
                    <img src = { image } />
                    
                ))}
                </>
            </IconWrapper>
        </>
        
    );
}
export default Monthly;