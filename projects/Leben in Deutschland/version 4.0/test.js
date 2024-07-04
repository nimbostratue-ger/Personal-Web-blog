const container = document.getElementById('id2')
const a="apple";
const o ="orange";
const b = 'bana"na';

container.innerHTML= setContent()


function setContent(){
    return`<p> 'a,' '${o}', "${b}", ${a}</p>`
}

