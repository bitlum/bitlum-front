/**
 * Default theme and styles
 *
 */

// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------

import { createGlobalStyle } from 'styled-components';

// -----------------------------------------------------------------------------
// Code
// -----------------------------------------------------------------------------

const Theme = createGlobalStyle`

@import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500');

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

html,
body {
  color: #fff;
  background-color: var(--alt-bg-color);
  background-repeat: no-repeat;
}

.App {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  margin: auto;
  color: var(--main-color);
  font: var(--main-font);
  background: var(--alt-bg-color);
}

.input {
  border: 0.3em solid var(--alt-bg-color);
  border-radius: 4px;
  width: 100%;
}

header {
  background: var(--alt-bg-color);
  font: var(--header-font);
  font-weight: 700;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 100%;
  min-height: 200px;
}

header > :first-child {
  position: relative;
}

header > :first-child:after {
  content: attr(data-net);
  position: absolute;
  font-size: 1rem;
  color: var(--warn-color);
  bottom: -1.5rem;
  left: 0;
  font-weight: 600;
  pointer-events: none;
}

header .logo {
  height: 2rem;
  fill: var(--accent-color);
}

nav {
  display: flex;
  position: relative;
}

nav ul {
  display: flex;
  align-items: center;
  font-size: 1.2rem;
}

nav ul {
  display: flex;
  overflow: hidden;
  justify-content: center;
  list-style-type: none;
}

nav ul li {
  margin-left: 50px;
}

nav ul li a {
  color: var(--main-color);
  text-decoration: none;
}

nav ul li a:hover,
nav ul li a.selected {
  color: var(--accent-color);
}

header,
footer {
  padding: 0 15vw;
}

section {
  max-width: 100%;
}

#nav-trigger {
  display: none;
}

#nav-trigger ~ label {
  display: none;
  position: relative;
  display: inline-block;
  width: 1.3em;
  height: 1.25em;
  margin-right: 0.3em;
}

@media (min-width: 2000px) {
  header,
  footer {
    padding: 0;
    max-width: 1400px;
  }
}

@media (max-width: 1460px) {
  header,
  footer {
    padding: 0 10vw;
  }
  header {
    min-height: 100px;
  }
  header .logo {
    height: 1.6rem;
  }
  header > :first-child:after {
    font-size: 0.8rem;
    bottom: -1rem;
  }
  nav ul li {
    font-size: 1rem;
  }
}

@media (max-width: 967px) {
  header,
  footer {
    padding: 0 5vw;
  }
}

@media (max-width: 768px) {
  footer {
    font-size: 0.5rem;
  }

  nav ul {
    max-height: 0;
    flex-direction: column;
    position: absolute;
    right: -5vw;
    top: 3em;
    align-items: flex-end;
    width: 100vw;
    z-index: 100;
    background-color: var(--alt-bg-color);
  }

  nav ul li {
    margin-top: 1em;
  }

  #nav-trigger ~ label {
    font-size: 70%;
    display: block;
    order: 2;
    border-top: 0.2em solid var(--main-color);
    border-bottom: 0.2em solid var(--main-color);
  }

  #nav-trigger ~ label:before {
    content: '';
    position: absolute;
    top: 0.3em;
    left: 0px;
    width: 100%;
    border-top: 0.2em solid var(--main-color);
  }

  #nav-trigger:checked ~ ul {
    max-height: initial;
    border-bottom: 4px solid var(--accent-color);
    padding-right: 5vw;
    padding-bottom: 2rem;
  }
}

`;

export default Theme;
