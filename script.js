const celebrationModal = document.getElementById("celebrationModal");
celebrationModal.classList.add("hidden");

// Create floating hearts
function createFloatingHearts(){
    const heartsBg=document.querySelector(".hearts-bg");
    const hearts=['❤️','💕','💖','💗','💓','💞'];
    
    for(let i=0;i<15;i++){
        const heart=document.createElement("div");
        heart.className="floating-heart";
        heart.innerText=hearts[Math.floor(Math.random()*hearts.length)];
        heart.style.left=Math.random()*100+"%";
        heart.style.animationDelay=Math.random()*15+"s";
        heart.style.fontSize=(15+Math.random()*15)+"px";
        heartsBg.appendChild(heart);
    }
}

createFloatingHearts();

/* CAPTCHA */

const images=[
    {src:"WhatsApp Image 2026-02-07 at 1.03.01 PM.jpeg",correct:true},
    {src:"WhatsApp Image 2026-02-07 at 1.10.24 PM.jpeg",correct:false},
    {src:"WhatsApp Image 2026-02-07 at 1.05.19 PM.jpeg",correct:true},
    {src:"WhatsApp Image 2026-02-07 at 1.11.15 PM.jpeg",correct:false},
    {src:"WhatsApp Image 2026-02-07 at 1.09.42 PM.jpeg",correct:true},
    {src:"WhatsApp Image 2026-02-07 at 1.59.15 AM.jpeg",correct:false}
];

const grid=document.getElementById("imageGrid");
const resultMsg=document.getElementById("resultMsg");

let selected=[];

images.forEach((img,index)=>{
    const wrapper=document.createElement("div");
    wrapper.style.position="relative";
    
    const el=document.createElement("img");
    el.src=img.src;
    
    const tick=document.createElement("div");
    tick.className="tick-mark";
    tick.innerText="✓";

    el.onclick=()=>{
        if(selected.includes(index)){
            selected=selected.filter(i=>i!==index);
            el.classList.remove("selected");
            tick.style.display="none";
        }else if(selected.length<3){
            selected.push(index);
            el.classList.add("selected");
            tick.style.display="flex";
        }
    };

    wrapper.appendChild(el);
    wrapper.appendChild(tick);
    grid.appendChild(wrapper);
});

document.getElementById("submitBtn").onclick=()=>{
    if(selected.length!==3){
        resultMsg.innerText="Please select exactly 3";
        return;
    }

    if(selected.every(i=>images[i].correct)){
        showChat();
    }else{
        resultMsg.innerText="Incorrect choice, Try Again!\nHint: Correct answer appears in mirror 😉";
    }
};

/* CHAT */

function showChat(){
    document.querySelector(".container").classList.add("hidden");
    document.getElementById("chatScreen").classList.remove("hidden");
    startChat();
}

const chatBox=document.getElementById("chatBox");
let tncRead=false;

function sender(text){
    const wrapper=document.createElement("div");
    wrapper.className="msg-row sender-row";
    
    const avatar=document.createElement("div");
    avatar.className="avatar";
    avatar.innerText="A";
    
    const d=document.createElement("div");
    d.className="sender";
    d.innerText=text;
    
    wrapper.appendChild(avatar);
    wrapper.appendChild(d);
    chatBox.appendChild(wrapper);
}

function receiver(text){
    const wrapper=document.createElement("div");
    wrapper.className="msg-row receiver-row";
    
    const d=document.createElement("div");
    d.className="receiver";
    d.innerText=text;
    
    const avatar=document.createElement("div");
    avatar.className="avatar";
    avatar.innerText="J";
    
    wrapper.appendChild(d);
    wrapper.appendChild(avatar);
    chatBox.appendChild(wrapper);
}

function startChat(){

    sender("Hello Jagannath Panda 👋");

    setTimeout(()=>{
        sender("You have won a lucky draw and eligible for special gift. Please answer few questions to claim your reward.");
        setTimeout(()=>{
            sender("Are you ready?");
            showInitialOptions();
        },800);
    },800);

}

function showInitialOptions(){
    const wrapper=document.createElement("div");
    wrapper.className="option-wrapper";

    ["Yes","Obviously Yes"].forEach(o=>{
        const btn=document.createElement("button");
        btn.className="option-btn";
        btn.innerText=o;

        btn.onclick=()=>{
            receiver(o);
            wrapper.remove();
            askQuestion1();
        };

        wrapper.appendChild(btn);
    });

    chatBox.appendChild(wrapper);
}

function askQuestion1(){
    setTimeout(()=>{
        sender("Question 1: When did our story begin?");
        showQ1Options();
    },500);
}

function showQ1Options(){
    const wrapper=document.createElement("div");
    wrapper.className="option-wrapper";

    ["The moment we met","The moment we had our first conversation","The moment I stole your heart","Still Loading... ❤️"].forEach(o=>{
        const btn=document.createElement("button");
        btn.className="option-btn";
        btn.innerText=o;

        btn.onclick=()=>{
            receiver(o);
            wrapper.remove();
            askQuestion2();
        };

        wrapper.appendChild(btn);
    });

    chatBox.appendChild(wrapper);
}

function askQuestion2(){
    setTimeout(()=>{
        sender("Question 2: What is Awantika's favourite place to be?");
        showQ2Options();
    },500);
}

function showQ2Options(){
    const wrapper=document.createElement("div");
    wrapper.className="option-wrapper";

    ["With her Pichus","Home Sweet Home","Anywhere travelling (in luxury)","Office"].forEach(o=>{
        const btn=document.createElement("button");
        btn.className="option-btn";
        btn.innerText=o;

        btn.onclick=()=>{
            receiver(o);
            wrapper.remove();
            askQuestion3();
        };

        wrapper.appendChild(btn);
    });

    chatBox.appendChild(wrapper);
}

function askQuestion3(){
    setTimeout(()=>{
        sender("Question 3: Which year did we celebrate our first Balcony Valentine's day?");
        enableBalconyYearInput();
    },500);
}

function enableBalconyYearInput(){
    const input=document.getElementById("chatInput");
    const btn=document.getElementById("sendBtn");
    
    input.disabled=false;
    btn.disabled=false;
    input.focus();
    
    btn.onclick=()=>{
        if(input.value.trim()==="2023"){
            receiver(input.value);
            input.value="";
            input.disabled=true;
            btn.disabled=true;
            btn.onclick=null;
            askQuestion4();
        }else{
            alert("Incorrect answer, try again!");
        }
    };
    
    input.onkeypress=(e)=>{
        if(e.key==="Enter" && input.value.trim()){
            btn.click();
        }
    };
}

function askQuestion4(){
    setTimeout(()=>{
        sender("Question 4: Who sends random reel at 2AM?");
        showQ4Options();
    },500);
}

function showQ4Options(){
    const wrapper=document.createElement("div");
    wrapper.className="option-wrapper";

    ["Awantika","Jagannath","Our Shared brain cell"].forEach(o=>{
        const btn=document.createElement("button");
        btn.className="option-btn";
        btn.innerText=o;

        if(o==="Awantika"){
            btn.onmouseover=()=>{
                btn.innerText="Bhagwan ka sharam karo";
            };
            btn.onmouseout=()=>{
                btn.innerText="Awantika";
            };
            btn.onclick=(e)=>{
                e.preventDefault();
                return false;
            };
        }else{
            btn.onclick=()=>{
                receiver(o);
                wrapper.remove();
                askQuestion5();
            };
        }

        wrapper.appendChild(btn);
    });

    chatBox.appendChild(wrapper);
}

function askQuestion5(){
    setTimeout(()=>{
        sender("Question 5: Why do you want to be my Valentine?");
        enableTextInput();
    },500);
}

function enableTextInput(){
    const input=document.getElementById("chatInput");
    const btn=document.getElementById("sendBtn");
    
    input.disabled=false;
    btn.disabled=false;
    input.focus();
    
    btn.onclick=()=>{
        const wordCount=input.value.trim().split(/\s+/).filter(w=>w.length>0).length;
        if(wordCount<10){
            alert("Please write at least 10 words");
            return;
        }
        if(input.value.trim()){
            receiver(input.value);
            input.value="";
            input.disabled=true;
            btn.disabled=true;
            btn.onclick=null;
            askFinalQuestion();
        }
    };
    
    input.onkeypress=(e)=>{
        if(e.key==="Enter" && input.value.trim()){
            btn.click();
        }
    };
}

function askFinalQuestion(){
    setTimeout(()=>{
        sender("You are almost there. One final and most important question.");
        setTimeout(()=>{
            showTncPrompt();
        },800);
    },500);
}

function showTncPrompt(){
    const wrapper=document.createElement("div");
    wrapper.className="msg-row sender-row";
    
    const avatar=document.createElement("div");
    avatar.className="avatar";
    avatar.innerText="A";
    
    const msg=document.createElement("div");
    msg.className="sender";
    msg.innerHTML=`Do you accept becoming Awantika's Valentine???<br><br>Carefully go through the <span class="link-btn" onclick="openAgreement()">💌 Final Agreement</span>`;
    
    wrapper.appendChild(avatar);
    wrapper.appendChild(msg);
    chatBox.appendChild(wrapper);
    
    showAgreementChoices();
}

function showOptions(opts){

    const wrapper=document.createElement("div");
    wrapper.className="option-wrapper";

    opts.forEach(o=>{
        const btn=document.createElement("button");
        btn.className="option-btn";
        btn.innerText=o;
        btn.disabled=true;
        btn.style.opacity="0.5";

        btn.onclick=()=>{
            if(!tncRead)return;
            receiver(o);
            wrapper.remove();
            showAgreement();
        };

        wrapper.appendChild(btn);
    });

    chatBox.appendChild(wrapper);
}

/* Agreement */

function showAgreement(){

    setTimeout(()=>{
        sender("You have unlocked access to Awantika's heart.");
        showAgreementChoices();
    },700);

}

const agreementModal=document.getElementById("agreementModal");

function openAgreement(){
    agreementModal.classList.remove("hidden");
    tncRead=true;
    document.querySelectorAll(".option-btn").forEach(btn=>{
        btn.disabled=false;
        btn.style.opacity="1";
    });
}

document.getElementById("closeAgreement").onclick=()=>{
    agreementModal.classList.add("hidden");
};

document.getElementById("closeCelebration").onclick=()=>{
    celebrationModal.classList.add("hidden");
};

function showAgreementChoices(){

    const wrapper=document.createElement("div");
    wrapper.className="option-wrapper";

    ["Agree","Re-read Agreement"].forEach(o=>{
        const btn=document.createElement("button");
        btn.className="option-btn";
        btn.innerText=o;
        btn.disabled=true;
        btn.style.opacity="0.5";

        btn.onclick=()=>{
            if(!tncRead)return;
            receiver(o);

            if(o==="Agree"){
                wrapper.remove();
                startGlitch();
            }else{
                openAgreement();
            }
        };

        wrapper.appendChild(btn);
    });

    chatBox.appendChild(wrapper);
}

/* Glitch */

function startGlitch(){

    sender("System Error");
    sender("Error Code: 031215");
    sender("Cause - Excessive love detected");
    sender("Manual intervention required");

    setTimeout(()=>{
        showRetryButton();
    },2000);
}

function showRetryButton(){
    const wrapper=document.createElement("div");
    wrapper.className="option-wrapper";

    const btn=document.createElement("button");
    btn.className="option-btn";
    btn.innerText="Retry";

    btn.onclick=()=>{
        receiver("Retry");
        wrapper.remove();
        setTimeout(()=>{
            sender("Successful ✓ Thank you for choosing me, again and always.");
            setTimeout(()=>{
                celebrationModal.classList.remove("hidden");
            },2000);
        },2000);
    };

    wrapper.appendChild(btn);
    chatBox.appendChild(wrapper);
}