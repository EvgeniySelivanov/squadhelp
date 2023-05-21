const menuBtn = document.getElementById('menu');
const navMenu = document.getElementById('navUl');
const regBtnNav = document.getElementById('regBtnNav');
const accordion=document.querySelectorAll('accordion__header');

const coursePanel = document.getElementsByClassName("course-panel");
const courseAccordion = document.getElementsByClassName("course-accordion");
const courseAccordionActive = document.getElementsByClassName("course-accordion active");
//this is the button
const acc = document.getElementsByClassName("course-accordion");


for (let i = 0; i < acc.length; i++) {
  //when one of the buttons are clicked run this function
  acc[i].onclick = function() {
  //variables
 
  let panel = this.nextElementSibling;
  /*if pannel is already open - minimize*/
  if (panel.style.maxHeight){
    //minifies current pannel if already open
    panel.style.maxHeight = null;
    //removes the 'active' class as toggle didnt work on browsers minus chrome
    this.classList.remove("active");
  } else { //pannel isnt open...
    //goes through the buttons and removes the 'active' css (+ and -)
    for (let j = 0; j < courseAccordionActive.length; j++) {
      courseAccordionActive[j].classList.remove("active");
    }
    //Goes through and removes 'activ' from the css, also minifies any 'panels' that might be open
    for (let k = 0; k < coursePanel.length; k++) {
      this.classList.remove("active");
      coursePanel[k].style.maxHeight = null;
    }
    //opens the specified pannel
    panel.style.maxHeight = panel.scrollHeight + "px";
    //adds the 'active' addition to the css.
    this.classList.add("active");
  } 
  }//closing to the acc onclick function
}//closing to the for loop.


Fancybox.bind("[data-fancybox]", {
  // Your custom options
});


function createElement(tag = 'div', { classNames, listeners, attrs, styles } = {}, ...children) {
  const elem = document.createElement(tag);
  if (classNames) {
    elem.classList.add(...classNames);
  }
  if (listeners) {
    for (const [typeEvent, handler] of Object.entries(listeners)) {
      elem.addEventListener(typeEvent, handler);
    }
  }
  if (attrs) {
    for (const [typeAttr, valueAttr] of Object.entries(attrs)) {
      elem.setAttribute(typeAttr, valueAttr);
    }
  }
  if (styles) {
    for (const [nameStyle, valueStyle] of Object.entries(styles)) {
      elem.style[nameStyle] = valueStyle;
    }
  }
  elem.append(...children);
  return elem;
}

menuBtn.addEventListener('click', (e) => {
  if (navMenu.style.display == 'block'&&regBtnNav.style.display == 'block') {
    navMenu.style.display = 'none';
    regBtnNav.style.display = 'none';
    document.location.reload();
  }
  else {
    navMenu.style.display = 'block';
    regBtnNav.style.display = 'block';
    createNav(dataText);
  }
});


function createNav(dataText) {

  for (i = 0; i <= dataText.length; i++) {
    let li = createElement('li', { classNames: ['liNav'] },
      createElement('div', {}, document.createTextNode(dataText[i].title)),
      createElement('div', {},
        createElement('img', {
          className: ['chevron'],
          attrs: {
            'src': '../../../task4/assets/images/icons/chevron-down.svg', 'alt': 'no image'
          }
        }))

    )
    navMenu.append(li);
  }

  let btn1 = createElement('button', { classNames: ['btn1'] },document.createTextNode('Login'));
  let btn2 = createElement('button', { classNames: ['btn2'] },document.createTextNode('Sign Up'));

  regBtnNav.append(btn1);
  regBtnNav.append(btn2);

}



