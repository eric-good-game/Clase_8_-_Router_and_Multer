const inputs = document.getElementsByTagName('input');
const form = document.getElementById('addProduct');
const modal = document.getElementById('modal');
let block = false;

function getRandomData(){
  const data = [
    ['Mochila','Lapíz','Libreta','Globo terráqueo','Regla','Calculadora'],
    ['7','200.00','75.30','345.67','15','164'],
    [
      'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-1024.png',
      'https://cdn3.iconfinder.com/data/icons/education-209/64/book-note-paper-school-1024.png',
      'https://cdn3.iconfinder.com/data/icons/education-209/64/bag-pack-container-school-1024.png',
      'https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-1024.png',
      'https://cdn3.iconfinder.com/data/icons/education-209/64/pencil-pen-stationery-school-1024.png',
      'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-1024.png'
    ]
  ]
  const ids = ['name','price','thumbnail']
  ids.forEach((id, idx)=>{
    let num;
    for (let i = 0; i < 10; i++) {
      num = Math.floor(Math.random() * 6);
    }
    document.getElementById(id).value = data[idx][num]
    console.log(idx);
  })
}

document.getElementById('randomData').onclick = (e)=>{
  getRandomData()
}

modal.addEventListener("animationend", listener, false);

function listener(event) {
  let l = '';
  switch(event.type) {
    case "animationend":
      if(event.animationName=='fadein'){
        modal.classList.replace('fadeIn','fadeOut');
      }
      if(event.animationName=='fadeout'){
        modal.className = 'hidden';
      }
      break;
  }
}

form.onsubmit = async (e) => {
  e.preventDefault();
  if(block) return;
  block=true;

  const data = {};
  Object.keys(e.srcElement).forEach(key => {
    const elem = e.srcElement[key];
    if(elem.tagName.toLowerCase() == 'input'){
      data[elem.id] = elem.value;
    }
  })

  try {
    const response = await fetch('http://localhost:8080/api/products', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
  
    if(!response?.ok)throw Error()
    
    console.log(await response.json());
    modal.firstElementChild.innerHTML = 'Producto añadido correctamente.'
    modal.className = 'fadeIn success'
    
    block=false;
  } catch (error) {
    modal.firstElementChild.innerHTML = 'Error al añadir el producto.'
    modal.className = 'fadeIn error';
    block=false;
    return
    
  }


  Object.keys(e.srcElement).forEach(key => {
    const elem = e.srcElement[key];
    if(elem.tagName.toLowerCase() == 'input'){
      elem.value=''
    }
  })
}

function handleInput(e){
  e.target.parentNode.classList.toggle('focus')
}

Object.keys(inputs).forEach(key => {
  inputs[key].onfocus = handleInput
  inputs[key].onblur = handleInput
})
