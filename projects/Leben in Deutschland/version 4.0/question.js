export default class Question{

    constructor(number, question, o1, o2, o3, o4, ans,img){
        this.number = number
        this.question= question;
        this.option1 = o1;
        this.option2 = o2;
        this.option3 = o3;
        this.option4 = o4;
        this.answer = ans;
        this.image = img;

    }
    
    html(){
        return (`
        <fieldset id="field${this.number}">
            <legend onclick='play(${this.number},false)' id="legend${this.number}" style="font-size: 30px;">Question ${this.number}</legend><br>
            <label id="${this.number}" class='lb'>${this.question}</label><br><br>
            <input type="radio" name="${this.number}" id="option1${this.number}"  onclick="check(this)" value ='${this.option1}'>
            <label for="option1${this.number}" id="option1${this.number}l" class='lb'> ${this.option1}</label><br>
            <input type="radio" name="${this.number}" id="option2${this.number}"  onclick="check(this)" value ='${this.option2}'>
            <label for="option2${this.number}" id="option2${this.number}l" class='lb'>${this.option2}</label><br>
            <input type="radio" name="${this.number}" id="option3${this.number}"  onclick="check(this)" value ='${this.option3}'>
            <label for="option3${this.number}" id="option3${this.number}l" class='lb'>${this.option3}</label><br>
            <input type="radio" name="${this.number}" id="option4${this.number}"  onclick="check(this)" value='${this.option4}'>
            <label for="option4${this.number}" id="option4${this.number}l" class='lb'>${this.option4}</label><br>
            ${this.image==="none"?"":"<img src='./images/"+this.image+"' height='300' alt=''>"}
        </fieldset><br>
        `)
    }

    toString(){
        return this.number+": "+this.answer;
    }

}

