const accordion = (coursePanel, courseAccordion, courseAccordionActive) => {
  for (let i = 0; i < courseAccordion.length; i++) {
    courseAccordion[i].onclick = function () {
      let panel = this.nextElementSibling;
      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
        this.classList.remove('active');
      } else {
        for (let j = 0; j < courseAccordionActive.length; j++) {
          courseAccordionActive[j].classList.remove('active');
        }
        for (let k = 0; k < coursePanel.length; k++) {
          this.classList.remove('active');
          coursePanel[k].style.maxHeight = null;
        }
        panel.style.maxHeight = panel.scrollHeight + 'px';

        this.classList.add('active');
      }
    };
  }
};
export default accordion;
