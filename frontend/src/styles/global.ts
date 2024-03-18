import { createGlobalStyle } from 'styled-components';
import DoveMayo from '../asset/fonts/DoveMayo.woff';
import DoveMayoBold from '../asset/fonts/DoveMayo_Bold.woff';
import IMHyeMin from '../asset/fonts/IMHyeMin.woff';
import IMHyeMinBold from '../asset/fonts/IMHyeMin_Bold.woff';
import Cafe24Supermagic from '../asset/fonts/Cafe24Supermagic.woff';
import Cafe24SupermagicBold from '../asset/fonts/Cafe24Supermagic_Bold.woff';
import HakgyoansimGaeulsopung from '../asset/fonts/HakgyoansimGaeulsopung.woff';
import HakgyoansimGaeulsopungBold from '../asset/fonts/HakgyoansimGaeulsopung_Bold.woff';

const GlobalStyle = createGlobalStyle`
      @font-face {
            font-family: 'DoveMayo';
            src: local('DoveMayo'), local('DoveMayo');
            font-style: normal;
            src: url(${DoveMayo}) format('woff');
      }
      @font-face {
            font-family: 'DoveMayoBold';
            src: local('DoveMayoBold'), local('DoveMayoBold');
            font-style: normal;
            src: url(${DoveMayoBold}) format('woff');
      }
      @font-face {
            font-family: 'IMHyeMin';
            src: local('IMHyeMin'), local('IMHyeMin');
            font-style: normal;
            src: url(${IMHyeMin}) format('woff');
      }
      @font-face {
            font-family: 'IMHyeMinBold';
            src: local('IMHyeMinBold'), local('IMHyeMinBold');
            font-style: normal;
            src: url(${IMHyeMinBold}) format('woff');
      }
      @font-face {
            font-family: 'Cafe24Supermagic';
            src: local('Cafe24Supermagic'), local('Cafe24Supermagic');
            font-style: normal;
            src: url(${Cafe24Supermagic}) format('woff');
      }
      @font-face {
            font-family: 'Cafe24SupermagicBold';
            src: local('Cafe24SupermagicBold'), local('Cafe24SupermagicBold');
            font-style: normal;
            src: url(${Cafe24SupermagicBold}) format('woff');
      }
      @font-face {
            font-family: 'HakgyoansimGaeulsopung';
            src: local('HakgyoansimGaeulsopung'), local('HakgyoansimGaeulsopung');
            font-style: normal;
            src: url(${HakgyoansimGaeulsopung}) format('woff');
      }
      @font-face {
            font-family: 'HakgyoansimGaeulsopungBold';
            src: local('HakgyoansimGaeulsopungBold'), local('HakgyoansimGaeulsopungBold');
            font-style: normal;
            src: url(${HakgyoansimGaeulsopungBold}) format('woff');
      }
`

export default GlobalStyle;