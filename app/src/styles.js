/**
 * CSS variables, default global styles and App entrypoint styles
 *
 */

// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------

import styled, { createGlobalStyle } from 'styled-components';

import { Header, Footer, Main, Aside, media } from 'components/common';

// -----------------------------------------------------------------------------
// Code
// -----------------------------------------------------------------------------

export * from 'components/common';

export const Root = styled.div`
  display: grid;
  grid-template-columns: auto minmax(75vw, 4fr); 
  grid-template-rows: 4em auto 4em;
  grid-template-areas:  "header header"
                        "aside main"
                        "footer footer";
  color: var(--main-color);
  font: var(--main-font);
  min-height: 100vh;
  background: var(--alt-bg-color);
  /* & > ${Header},
  & > ${Footer} {
    grid-column: start / end;
  } */
  & > ${Header} {
    grid-area: header;
  }
  & > ${Footer} {
    grid-area: footer;
  }
  & > ${Aside} {
    grid-area: aside;
  }
  & > ${Main} {
    grid-area: main;
  }
  & > ${Main},
  & > ${Aside} {
    display: flex;
    flex-direction: column;    
  }
  & > ${Main} > :first-child,
  & > ${Aside} > :first-child {
    height: 12em;
  }

  ${media.tablet`
    grid-template-areas: "header header"
                         "main main"
                         "footer footer";
  
    & > ${Aside} {
      grid-area: main;
      position: relative;
      left: -100%;
      
    }
    
    & > ${Aside}.opened {
      left: 0;
    }
  `}
}
`;

export const Global = createGlobalStyle`

@import url('https://fonts.googleapis.com/css?family=Montserrat:300,400,500;Roboto:300,400,500');

:root{
  --colors-bg-main: #f3f5f9;
  --colors-text-main: #5c6d82;

  --colors-bg-accent: #0f7aff;
  --colors-text-accent: #0f7aff;

  --colors-bg-info: #bfdcff;
  --colors-text-info: #0f7aff;

  --colors-bg-ok: #35bb78;
  --colors-text-ok: #35bb78;

  --colors-bg-error: #ffb7a8;
  --colors-text-error: red;

  --colors-bg-warn: #f8c57e;
  --colors-text-warn: #ff9500;

  --alt-bg-color: #f3f5f9;
  --main-color: #0c1441;
  --accent-color: #0f7aff;
  --accent-second-color: #9c27b0;
  --text-color: #5c6d82;

  --main-font: 400 16px 'Montserrat', sans-serif;
  --bold-font: 500 16px 'Montserrat', sans-serif;
  --header-font: 400 25px 'Open Sans', sans-serif;
  --text-font: 400 25px 'Open Sans', sans-serif;
}

/* CSS reset here */
a,abbr,acronym,address,applet,area,article,aside,audio,b,base,basefont,bdi,bdo,big,blockquote,body,br,button,canvas,caption,center,cite,code,col,colgroup,data,datalist,dd,del,details,dfn,dialog,dir,div,dl,dt,em,embed,fieldset,figcaption,figure,font,footer,form,frame,frameset,h1,h2,h3,h4,h5,h6,head,header,hr,html,i,iframe,img,input,ins,kbd,label,legend,/*li,*/link,main,map,mark,menu,menuitem,meta,meter,nav,noframes,noscript,object,ol,optgroup,option,output,p,param,picture,pre,progress,q,rp,rt,ruby,s,samp,script,section,select,small,source,span,strike,strong,style,sub,summary,sup,svg,table,tbody,td,template,textarea,tfoot,th,thead,time,title,tr,track,tt,u,/*ul,*/var,video,wbr {
  all: unset;
  box-sizing: border-box;
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
`;

export default Global;
