const card = document.querySelector(".profile-card");
const cursor = document.querySelector(".custom-cursor");
const typewriter = document.getElementById("typewriter");
const visitorCount = document.getElementById("visitor-count");
const music = document.getElementById("bg-music");

// Tilt card - คอม
document.addEventListener("mousemove", (e)=>{
  const x=(window.innerWidth/2-e.clientX)/30;
  const y=(window.innerHeight/2-e.clientY)/30;
  card.style.transform=`rotateY(${x}deg) rotateX(${y}deg)`;
  cursor.style.left=e.clientX+"px";
  cursor.style.top=e.clientY+"px";
});

// Tilt card - มือถือ
if(window.DeviceOrientationEvent){
  window.addEventListener("deviceorientation",(e)=>{
    const x=e.gamma/3;
    const y=e.beta/3;
    card.style.transform=`rotateY(${x}deg) rotateX(${y}deg)`;
  });
}

// Reset card mouse leave
document.addEventListener("mouseleave",()=>{card.style.transform="rotateY(0deg) rotateX(0deg)";});

// Typewriter
const text="RΞN"; let i=0,forward=true;
function typeWriter(){
  if(forward){typewriter.textContent=text.substring(0,i++);
    document.title=text.substring(0,i);
    if(i>text.length){forward=false;setTimeout(typeWriter,1000);return;}
  } else {typewriter.textContent=text.substring(0,i--);
    document.title=text.substring(0,i);
    if(i===0){forward=true;setTimeout(typeWriter,500);return;}
  }
  setTimeout(typeWriter,350);
}
typeWriter();

// Visitor counter
visitorCount.innerText=0;
fetch("https://api.countapi.xyz/hit/sora-profile-card/visits")
  .then(res=>res.json())
  .then(data=>{
    if(data.value!==undefined) visitorCount.innerText=data.value;
    else visitorCount.innerText=0;
  })
  .catch(err=>visitorCount.innerText=0);

// เล่นเพลงมือถือ/คอม หลังแตะ
function enableMusic(){music.play().catch(err=>console.log("Autoplay blocked:",err));
document.removeEventListener("click",enableMusic);
document.removeEventListener("touchstart",enableMusic);}
document.addEventListener("click",enableMusic);
document.addEventListener("touchstart",enableMusic);
