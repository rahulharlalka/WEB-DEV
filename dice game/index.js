var randomNumber1=Math.floor(Math.random()*6+1);
var randomNumber2=Math.floor(Math.random()*6+1);

const src1="./images/dice"+ randomNumber1.toString() + ".png";
const src2="./images/dice"+ randomNumber2.toString() + ".png";

img1=document.querySelector(".img1").setAttribute("src",src1);
img2=document.querySelector(".img2").setAttribute("src",src2);


const head=document.querySelector("h1");

if(randomNumber1>randomNumber2)
    head.innerHTML="<em>Player 1 WINS</em>";
else if(randomNumber1<randomNumber2)
    head.innerHTML="<em>Player 2 WINS</em>";
else
    head.innerHTML="<em>TIE</em>";
