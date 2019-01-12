/**
 * CSS variables, default global styles and App entrypoint styles
 *
 */

// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------

import styled, { createGlobalStyle } from 'styled-components';

import { Header as HeaderCommon, Footer, Main as MainCommon, media, Img } from 'components/common';

import FontLight from 'assets/fonts/Montserrat-Light.ttf';
import FontItalic from 'assets/fonts/Montserrat-Italic.ttf';
import FontRegular from 'assets/fonts/Montserrat-Regular.ttf';
import FontMedium from 'assets/fonts/Montserrat-Medium.ttf';
import FontSemibold from 'assets/fonts/Montserrat-Semibold.ttf';
import FontBold from 'assets/fonts/Montserrat-Bold.ttf';

// -----------------------------------------------------------------------------
// Code
// -----------------------------------------------------------------------------

export * from 'components/common';

export const Main = styled(MainCommon)`
  background: var(--colors__bg);
`;

export const Root = styled.div`
  display: grid;
  grid-template-rows: auto;
  grid-template-areas:  "main";
  color: var(--colors__text);
  font: var(--fonts__text);
  min-height: 100vh;
  background: var(--colors__bg);
  width: 100vw;
  font-size: 1.8rem;
  /* & > ${Footer} {
    grid-area: footer;
  } */
  & > ${Main} {
    grid-area: main;
    display: flex;
    flex-direction: column;    
  }
}
`;

export const Global = createGlobalStyle`

@import url('https://fonts.googleapis.com/css?family=Montserrat:200,400,700');

@font-face {
  font-family: 'AppFont';
  font-weight: 300;
  src: url(${FontLight});
}
@font-face {
  font-family: 'AppFont';
  font-weight: 400;
  font-style: italic;
  src: url(${FontItalic});
}
@font-face {
  font-family: 'AppFont';
  font-weight: 400;
  src: url(${FontRegular});
}
@font-face {
  font-family: 'AppFont';
  font-weight: 500;
  src: url(${FontMedium});
}
@font-face {
  font-family: 'AppFont';
  font-weight: 600;
  src: url(${FontSemibold});
}
@font-face {
  font-family: 'AppFont';
  font-weight: 700;
  src: url(${FontBold});
}


:root{
  --colors__bg: #F7F7F7;
  --colors__text: #242323;

  --colors__bg_dark: #C1C3C6;
  --colors__text_dark: #7a7d85;

  --colors__bg_bright: #FFF;
  --colors__text_bright: #7B7A7C;

  --colors__bg_accent: #249ADE;
  --colors__text_accent: #fff;

  --colors__bg_info: #bfdcff;
  --colors__text_info: #0f7aff;

  --colors__bg_ok: #35bb78;
  --colors__text_ok: #35bb78;

  --colors__bg_error: rgba(244,5,102,0.11);
  --colors__text_error: #F40566;

  --colors__bg_warn: #f8c57e;
  --colors__text_warn: #ff9500;

  --colors__bg_pending: #F5A623;
  --colors__bg_completed: #40D3CB;
  --colors__bg_failed: #F40566;

  --fonts__text: 400 1.6rem 'AppFont', sans-serif;
  --fonts__text_thin: 300 1.6rem 'AppFont', sans-serif;
  --fonts__text_bold: 600 1.6rem 'AppFont', sans-serif;

  --fonts__header: 400 2.4rem 'AppFont', sans-serif;
  --fonts__header_thin: 300 2.4rem 'AppFont', sans-serif;
  --fonts__header_bold: 600 2.4rem 'AppFont', sans-serif;

  --sizing__header_heigh: 9rem;
  --sizing__footer_heigh: 2rem;
}

::-webkit-scrollbar-track
{
    background-color: transparent;
}

::-webkit-scrollbar
{
    width: 0.4rem;  
}

::-webkit-scrollbar-thumb
{
  background-color: var(--colors__bg_dark);
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

.intercom-launcher-frame,
.intercom-launcher-discovery-frame {
  pointer-events: none!important;
  display: none!important;
}

/* Extension popup specific sizes*/
html {
  min-width: 400px;
  width: 400px;
  min-height: 600px;
}


/* CSS reset here */
a,abbr,acronym,address,applet,area,article,aside,audio,b,base,basefont,bdi,bdo,big,blockquote,body,br,button,canvas,caption,center,cite,code,col,colgroup,data,datalist,dd,del,details,dfn,dialog,dir,div,dl,dt,em,embed,fieldset,figcaption,figure,font,footer,form,frame,frameset,h1,h2,h3,h4,h5,h6,head,header,hr,/*html,*/i,iframe,img,input,ins,kbd,label,legend,/*li,*/link,main,map,mark,menu,menuitem,meta,meter,nav,noframes,noscript,object,ol,optgroup,option,output,p,param,picture,pre,progress,q,rp,rt,ruby,s,samp,script,section,select,small,source,span,strike,strong,style,sub,summary,sup,/*svg,*/table,tbody,td,template,textarea,tfoot,th,thead,time,title,tr,track,tt,u,/*ul,*/var,video,wbr {
  all: unset;
  box-sizing: border-box;
  word-break: break-all;
  /* Hack to get proper colors on Safari */
  -webkit-text-fill-color: initial;
}

/* Thanks to L. David Baron for this: https://twitter.com/davidbaron/status/794138427952222210 */
base,
basefont,
datalist,
head,
meta,
script,
style,
title,
noembed,
param,
template {
  display: none;
}

article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
menu,
nav,
section,
div,
form {
  display: block;
}

a,
button {
  cursor: pointer;
}

pre {
  white-space: pre;
}

html,
body {
  font-size: 62.5%;
}
`;

export default Global;
