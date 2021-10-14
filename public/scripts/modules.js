const container_mod1 = document.querySelector(".container_mod1");
const container_mod2 = document.querySelector(".container_mod2");
const container_mod3 = document.querySelector(".container_mod3");
const container_mod4 = document.querySelector(".container_mod4");
const container_mod5 = document.querySelector(".container_mod5");
const container_mod6 = document.querySelector(".container_mod6");
const container_module_btns = document.querySelector(".container_module_btns");
const containers = Array.from(document.querySelectorAll(".container_func"))
containers.map((item) => {
  item.classList.add("hidden");
});

//buttons select
function Select_btn(button) {
  const options_buttons = Array.from(button.parentElement.children);
  const containers = Array.from(document.querySelectorAll(".container_func"))

  container_module_btns.style.cssText = "margin-bottom: 0px";

  options_buttons.map((item) => {
   item.classList.remove("user")
   if (item.classList.contains("active")) {button.classList.add("user")}
  })
  

  containers.map((item) => {
    item.classList.add("hidden");
  });

  if (button.classList.contains("mod1_btn")) {
    container_mod1.classList.remove("hidden")
  }
  if (button.classList.contains("mod2_btn")) {
    container_mod2.classList.remove("hidden")
  }
  if (button.classList.contains("mod3_btn")) {
    container_mod3.classList.remove("hidden")
  }
  if (button.classList.contains("mod4_btn")) {
    container_mod4.classList.remove("hidden")
  }
}

const choice_btn = Array.from(document.querySelectorAll(".module_btn"));
choice_btn.map((btn) => {
  btn.onclick = (event) => Select_btn(event.target);
});