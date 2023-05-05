const tasks=[];
let time= 0;
let timer= null;
let timerBreak=null;
let current = null;


const bAdd= document.getElementById("bAdd");
const itTask= document.getElementById("itTask");
const form = document.getElementById("form");
const taskName= document.querySelector("#time #taskName");


form.addEventListener("submit",e=>{
    e.preventDefault();
    if(itTask.value !=""){
        createTask(itTask.value);   // limpiar
        itTask.value="";
        renderTask();
    }
})

const createTask = task =>{     //limpiar
     newTask= {
        id: (Math.round(Math.random()*100)),
        title: task,
        completed: false
    }
    tasks.unshift(newTask);
}

const renderTask = ()=>{
    const html= tasks.map(task=>{
        return `
        <div class="task">
            <div class="completed">${task.completed ?"<spam class='done'>Done</spam>" :`<button class="start-button" data-id="${task.id}">Start</button>` }</div>
            <div class="title">${task.title}</div>
        </div>
        `;
    })
    const taskConteiner = document.getElementById("tasks");
    console.log(html);
    taskConteiner.innerHTML = html.join("");

    const startButton= document.querySelectorAll(".task .start-button");

    startButton.forEach(button =>{
        button.addEventListener("click",e=>{
            if(!timer){
                const id= button.getAttribute("data-id");
                button.textContent= "in progress...";
                starButtonHandler(id);
            }
        })
    })
}

const starButtonHandler= id=>{
    time= 25*60;
    current= id;
    const taskIndex= tasks.findIndex(task => task.id== id);
    taskName.textContent= tasks[taskIndex].title;
    
    timer= setInterval(()=>{
      timeHandler(id);
    },1000)
}

const timeHandler =(id)=>{
    time--;
    renderTime();
    if(time==0){
        clearInterval(timer);
        markCompleted(id);
        timer=null;
        renderTask();
        startBreak();
    }
}

const startBreak = ()=>{
    time= 5*60;
    taskName.textContent ="break";
    timerBreak= setInterval(()=>{
        timerBreakHandler();
    },1000)
}
const timerBreakHandler= ()=>{
    time--;
    renderTime();
    if(time==0){
        clearInterval(timerBreak);
        current= null;
        timerBreak= null
        taskName.textContent= "";
        renderTask(); 
    }
}


const renderTime=()=>{
    const timediv =document.querySelector("#time #value");
    const minutes = parseInt(time/60);
    const seconds = parseInt(time % 60);

    timediv.textContent= `${minutes <10 ? '0': ''}${minutes}:${seconds<10 ? '0': ''}${seconds}`;
}

const markCompleted= id=>{
   const taskIndex= tasks.findIndex(task => task.id== id);
    tasks[taskIndex].completed=true;
}
renderTask();
renderTime();