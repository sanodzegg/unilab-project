function mobileQuary(v) {
  if (v.matches) { 
    document.getElementById('heroTxtH2').innerText = 'Amazing places in America';
  } else {
    document.getElementById('heroTxtH2').innerText = 'Amazing places in America to visit';
  }
}
  
var v = window.matchMedia("(max-width: 375px)");
mobileQuary(v);
v.addListener(mobileQuary);

let burgerMenu = document.getElementById('burgerMenu');
let burgerInner = document.getElementById('burgerInner');

document.getElementById('burgerIcon').onclick = function(){
  burgerMenu.style.width = '287px';
  burgerMenu.style.transition = 'width 1s';
  burgerInner.style.display = 'block';
  setTimeout(()=>{
    burgerInner.style.transition = 'opacity 1s';
    burgerInner.style.opacity = '1';
  },1000);
}
document.getElementById('burgerLogo').onclick = function(){
  burgerInner.style.opacity = '0';
  setTimeout(()=>{
    burgerMenu.style.width = '0px';
    burgerInner.style.display = 'none';
  },1000);
}

function fetchApi(v){
  let node = document.getElementById('info');
  for(let i = v; i <= v+10; i++) {
    let childNode = document.createElement('div');
    childNode.setAttribute(`id`, `d${i}`);
    node.appendChild(childNode);
  }
  fetch('https://jsonplaceholder.typicode.com/posts')
  .then(res => res.json())
  .then(data => {
    for(let i = v; i < v+10; i++) {
      document.getElementById(`d${i}`).innerHTML = 
      `
      <h1>User ID: ${data[i].userId}</h1>
      <h2>ID: ${data[i].id}</h2>
      <h3>Title: ${data[i].title}</h3>
      <p>Content: ${data[i].body}</p>
      `;
    }
    console.log(data);
  });
  for(let i = 0; i < 10; i++) {
    document.getElementById(`a${i}`).onclick = function() {
      if(this.id) {
        document.getElementById(`a${i}`).setAttribute('class', 'active-pagination')
        for(let e = 0; e < 10; e++) {
          if(i == e) {
            document.getElementById('info').innerHTML = '';
            fetchApi(e*10)
          } else {
            document.getElementById(`a${e}`).removeAttribute('class')
          }
        }
      }
    }
  }
}