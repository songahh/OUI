import { createGlobalStyle } from 'styled-components';
import DoveMayo from '../fonts/DoveMayo.woff';
import DoveMayoBold from '../fonts/DoveMayo_Bold.woff';
import IMHyeMin from '../fonts/IMHyeMin.woff';
import IMHyeMinBold from '../fonts/IMHyeMin_Bold.woff';

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
`

export default GlobalStyle;