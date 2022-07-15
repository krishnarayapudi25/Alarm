const selectmenu = document.querySelectorAll('select');
const currenttime = document.querySelector('h1');
const almbutton =document.querySelector('button');
const content = document.querySelector('.content');

let allaramtime,isAlaramset = false;
let ringtone = new Audio("./files/ringtone.mp3");

for (let i = 12; i > 0; i--) {
    i = i < 10 ? "0"+ i : i ;
    let option =  `<option value = "${i}">${i}</option>`;
    selectmenu[0].firstElementChild.insertAdjacentHTML("afterend", option);
}
for (let i = 59; i >= 0; i--) {
    i = i < 10 ? "0"+ i : i ;
    let option =  `<option value = "${i}">${i}</option>`;
    selectmenu[1].firstElementChild.insertAdjacentHTML("afterend", option);
}
for (let i = 2; i > 0; i--) {
    let ampm = i == 1 ? "AM" :"PM";
    let option =  `<option value = "${ampm}">${ampm}</option>`;
    selectmenu[2].firstElementChild.insertAdjacentHTML("afterend", option);
}
setInterval(() => {
     let date = new Date();
     let h = date.getHours();
     let m = date.getMinutes();
     let s = date.getSeconds();
     ampm = "AM";
     if(h>12){
        h= h-12;
        ampm ="PM";
     }
     h = h == 0 ? 12 : h;
     h = h < 10 ? "0" + h:h;
     m = m < 10 ? "0" + m:m;
     s = s < 10 ? "0" + s:s;

     currenttime.innerText= `${h}:${m}:${s} ${ampm}`;

     if (allaramtime == `${h}:${m} ${ampm}`) {
        ringtone.play();
        ringtone.loop = true;
        }

    }, 1000);

almbutton.addEventListener("click",setalarm);

function setalarm(){
    if(isAlaramset){
        allaramtime = "";
        ringtone.pause();
        content.classList.remove("disable");
        almbutton.innerText = "Set Alarm";
        return isAlaramset = false;
    }
    let almtime = `${selectmenu[0].value}:${selectmenu[1].value} ${selectmenu[2].value}`;
    if(almtime.includes("Hours") || almtime.includes("Minutes") || almtime.includes("AM/Pm")){
        alert("Please enter valid time");
   
    }
    isAlaramset = true;
    allaramtime = almtime;
    content.classList.add("disable");
    almbutton.innerText = "Clear Alarm";
}



