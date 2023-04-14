//  variables

let imgs = document.getElementsByTagName("img");
let buttonContainer = document.getElementById("btn-div");
let resultStatus = document.getElementById("status");
let container = document.getElementById("container");
let buttonList = document.querySelectorAll('#btn-div > button');
let para = document.getElementById("p");
let count;
let selectedObject;
let isAdded = false;


// shuffle img and add listener
function intialize() {
    count = 0;
    selectedObject = {};

    for (let j = 0; j < imgs.length; j++) {
        let i = Math.floor(Math.random() * imgs.length);
        let temp = imgs[i].src;
        imgs[i].src = imgs[j].getAttribute("src");
        imgs[j].src = temp;
        selectedObject[imgs[j].id] = false;
        imgs[j].style.border = "none";
        imgs[j].style.width ="100px";
        imgs[j].style.height ="100px";
    }
    if(!isAdded){
        for (let img of imgs) {
            img.addEventListener("click", (e)=>eventHandler(e));
        }
        buttonList[0].addEventListener("click", reset);
        buttonList[1].addEventListener("click", check);
        isAdded=true;
    }
    
    
}

// function to remove dynamic element created when reset button clicked
// function removeDynamicElements(removed) {

//     let child = removed.lastElementChild;
//     while (child) {
//         removed.removeChild(child);
//         child = removed.lastElementChild;
//     }
// }

function eventHandler(e){
    const img = e.target
    if (selectedObject[img.id] == false && count < 2) {
        selectedObject[img.id] = true;
        count++;
        img.style.border = "2px solid blue";
        img.style.width = "98px";
        img.style.height ="98px";
        
        if (count == 1) {
            buttonList[0].style.visibility = "visible";
        }
        if (count == 2) {
            buttonList[1].style.visibility = "visible";
        }
        console.log(count);

    } else if(selectedObject[img.id] == true) {
        selectedObject[img.id] = false;
        count--;
        if (count == 0) {
            buttonList[0].style.visibility = "hidden";
        } else if (count == 1) {
            buttonList[1].style.visibility = "hidden";
        }
        img.style.border = "none";
        img.style.width = "100px";
        img.style.height ="100px";
        console.log(count);
    }
}
// when verify button clicked
function check() {

    let selectOneId = null;
    let selecteTwoId = null;
    for (let obj in selectedObject) {
        if(selectedObject[obj] == true ){
            if (selectOneId == null) selectOneId = obj; 
            selecteTwoId = obj;
            
        }
        
    }
    // console.log(document.getElementById(selectOneId).src);
    // console.log(document.getElementById(selecteTwoId).src);
    if (document.getElementById(selectOneId).src === document.getElementById(selecteTwoId).src) {
        para.textContent = "You are a human. Congratulations! ";
        para.style.visibility = "visible";

    } else {
        para.textContent = "We can't verify you as a human. You selected the non-identical tiles.";
        para.style.visibility = "visible";
    }
}

// when reset button clicked
function reset() {
    for(let img of imgs){
        img.removeEventListener("click", (e)=>eventHandler(e));
    }
    buttonList[0].style.visibility = "hidden";
    buttonList[1].style.visibility = "hidden";
    para.textContent = "";
    para.style.visibility = "hidden";
    console.log(para);
    intialize();
}



// create dynamic element verify and reset button in document
// function createElement(buttonText) {

//     let btn = document.createElement("BUTTON");
//     btn.innerText = buttonText;
//     if (buttonText === "VERIFY") {
//         btn.addEventListener("click", check);

//     }
//     if (buttonText === "RESET") {
//         btn.addEventListener("click", reset);
//     }
//     buttonContainer.appendChild(btn);
// }

// call intialize function when 1st time loadded
intialize();
