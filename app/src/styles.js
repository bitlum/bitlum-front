/**
 * CSS variables, default global styles and App entrypoint styles
 *
 */

// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------

import styled, { createGlobalStyle } from 'styled-components';

import { Header as HeaderCommon, Footer, Main as MainCommon, media, Img } from 'components/common';

// -----------------------------------------------------------------------------
// Code
// -----------------------------------------------------------------------------

export * from 'components/common';

export const Main = styled(MainCommon)`
  background: var(--colors__bg);
`;

export const Root = styled.div`
  display: grid;
  grid-template-rows: auto var(--sizing__footer_heigh);
  grid-template-areas:  "main"
                        "footer";
  color: var(--colors__text);
  font: var(--fonts__text);
  min-height: 100vh;
  background: var(--colors__bg);

  & > ${Footer} {
    grid-area: footer;
  }
  & > ${Main} {
    grid-area: main;
  }
  & > ${Main} {
    display: flex;
    flex-direction: column;    
  }
}
`;

export const Global = createGlobalStyle`

@import url('https://fonts.googleapis.com/css?family=Montserrat:200,400,700;');

:root{
  --colors__bg: #F7F7F7;
  --colors__text: #242323;

  --colors__bg_dark: #C1C3C6;

  --colors__bg_bright: #FFF;
  --colors__text_bright: #7B7A7C;

  --colors__bg_accent: #249ADE;
  --colors__text_accent: #fff;

  --colors__bg_info: #bfdcff;
  --colors__text_info: #0f7aff;

  --colors__bg_ok: #35bb78;
  --colors__text_ok: #35bb78;

  --colors__bg_error: #ffb7a8;
  --colors__text_error: red;

  --colors__bg_warn: #f8c57e;
  --colors__text_warn: #ff9500;

  --colors__bg_pending: #F5A623;
  --colors__bg_completed: #40D3CB;
  --colors__bg_failed: #F40566;

  --fonts__text: 400 1.6rem 'Montserrat', sans-serif;
  --fonts__text_thin: 200 1.6rem 'Montserrat', sans-serif;
  --fonts__text_bold: 600 1.6rem 'Montserrat', sans-serif;

  --fonts__header: 400 2.4rem 'Montserrat', sans-serif;
  --fonts__header_thin: 200 2.4rem 'Montserrat', sans-serif;
  --fonts__header_bold: 600 2.4rem 'Montserrat', sans-serif;

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

/* Extension popup specific sizes*/
html {
  min-width: 400px;
  width: 400px;
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
