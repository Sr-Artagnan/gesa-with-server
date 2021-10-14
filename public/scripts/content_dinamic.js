
//Dinamic buttons

  const toggleContent = (button, content_target) => {
    let btnBrothers = Array.from(button.parentElement.children);
    let pBrothers = Array.from(document.querySelector(`.${content_target}`).parentElement.children)

    pBrothers.map(item => {
      item.classList.add('hidden');
    })

    document.querySelector(`.${content_target}`).classList.remove('hidden');


   btnBrothers.map(item => {
     item.classList.remove('active');
   })

    button.classList.add('active');
  }


  const dinamicButtons = Array.from(document.querySelectorAll('.dinamic-btn'));

  dinamicButtons.map(item => {
    item.onclick = (event) => toggleContent(event.target, event.target.getAttribute('data-target'));
  })


// Learn more 

let learnMoreButton = document.querySelector(".button_visible");
let information = document.querySelector(".information");

function infoVisible (){
  information.style.cssText = "display: flex;"
}

learnMoreButton.onclick = function() {infoVisible()};

