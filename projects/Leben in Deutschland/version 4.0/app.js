import { bamfQuestions, bamfQuestionsArabic, bamfQuestionsGerman, bamfQuestionsEnglish } from "./bamf.js"
import Question from "./question.js"
import CSVToArray from "./utility.js"

window.check = check
window.play = play

let questions = [];
let pause = false;

const btnPlayAll = document.getElementById('btnPlayAll');
const arabic_check = document.getElementById('arabic')
const english_check = document.getElementById('english')

btnPlayAll.addEventListener('click', () => {
    if(btnPlayAll.value=="Play All"){
        btnPlayAll.value="Pause";
        play(1, true);
    }
    else if(btnPlayAll.value=="Pause")
    {
        pause = true;
        btnPlayAll.value="Resume";
    }
    else if(btnPlayAll.value=="Resume"){
        pause = false;
        btnPlayAll.value="Pause";

    }
    // stop = false;
    // btnPlayAll.disabled = true
    // isAllplaying=true;

})

arabic_check.addEventListener('click', () => translateArabic())
english_check.addEventListener('click', () => translateEnglish())

const parsed = CSVToArray(bamfQuestions);
const arab = CSVToArray(bamfQuestionsArabic).flat();
const germ = CSVToArray(bamfQuestionsGerman).flat();
const eng = CSVToArray(bamfQuestionsEnglish).flat();
const timer = (ms) => new Promise((res) => setTimeout(res, ms));
function pauser() {
    return new Promise((resolve) => {
      let playbuttonclick = function () {
        btnPlayAll.removeEventListener("click", playbuttonclick);
        pause = false;
        resolve("resolved");
      };
      btnPlayAll.addEventListener("click", playbuttonclick);
    });
  }


for (let index = 0; index < parsed.length; index++) {

    let arr = parsed[index];
    let q = new Question(index + 1, arr[0], arr[1], arr[2], arr[3], arr[4], arr[5], arr[6]);
    questions.push(q);
    document.getElementById("container").innerHTML += q.html();

}


function check(input) {
    let index = input.name - 1
    let selected = input.value
    let answer = questions[index].answer
    let option = input.id
    let label = document.getElementById(option + 'l')
    // console.log("answer:>", answer)
    // console.log("selected", selected)

    if (selected !== answer) { label.style.backgroundColor = 'lightcoral' }
    else
        label.style.backgroundColor = 'lightgreen'

    //console.log(index, selected,":", answer)
}


async function play(id, playAll) {

    if (id == questions.length + 1){
        btnPlayAll.value="Play All";
        pause=false;
        return
    }
        

    let fieldSet = document.getElementById('field' + id)
    let legend = document.getElementById('legend' + id)
    let label = document.getElementById(id)

    fieldSet.scrollIntoView({
        behavior: 'auto',
        block: 'center',
        inline: 'center'
    });
    legend.style.backgroundColor = "red";
    label.style.backgroundColor = 'lightgreen';

    let answer = questions[id - 1].answer;
    let question = questions[id - 1].question;
    let msg = new SpeechSynthesisUtterance();
    msg.lang = "de";
    msg.text = question + answer;
    msg.onstart=()=>console.log('start...')
     window.speechSynthesis.speak(msg);
     
     await timer(3000);
    msg.onend =async () => { 
        if (pause) await pauser();
        legend.style.backgroundColor = "forestgreen";
        return playAll && play(++id, playAll)
    }



    for (let i = 1; i < 5; i++) {
        let optionid = "option" + i + id;
        let option = document.getElementById(optionid)
        if (option.value === answer)
            option.click()

    }
}


const selector = document.querySelectorAll('label.lb');

function translateArabic() {

    if (arabic_check.checked)
        for (let [key, value] of arab.entries())
            selector[key].innerHTML+= `  <span style='color:red'>${value}</span>` 
            // selector[key].innerText += " | " + value
    else if (english_check.checked)
        for (let [key, value] of germ.entries())
            selector[key].innerHTML = value + `  <span style='color:blue'>${eng[key]}</span>` 
    else
        for (let [key, value] of germ.entries())
            selector[key].innerHTML = value

}

function translateEnglish() {

    if (english_check.checked)
        for (let [key, value] of eng.entries())
            selector[key].innerHTML+= `   <span style='color:blue'>${value}</span>` 
            // selector[key].innerText += " | " + value
    else if (arabic_check.checked)
        for (let [key, value] of germ.entries())
            selector[key].innerHTML = value +`  <span style='color:red'>${arab[key]}</span>`
    else
        for (let [key, value] of germ.entries())
            selector[key].innerHTML = value
}
















