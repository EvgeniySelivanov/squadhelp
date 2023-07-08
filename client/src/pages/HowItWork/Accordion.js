const  accordion=(coursePanel,courseAccordion,courseAccordionActive)=>{
  for (let i = 0; i < courseAccordion.length; i++) {
    //when one of the buttons are clicked run this function
    courseAccordion[i].onclick = function() {
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
}
export default  accordion;