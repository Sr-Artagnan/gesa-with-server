// Menu mobile display

let menu_mob = document.querySelector('.menu_mobile')
let menu_button = document.querySelector('#menu_button')
let close_menu = document.querySelector('#close_menu_mobile')

function openMenu() {
  menu_mob.style.cssText = 'menu_mob_animation'; menu_mob.classList.toggle('hidden');
}

function closeMenu() {
  menu_mob.style.cssText = 'menu_mob_animation'; menu_mob.classList.toggle('hidden'); menu_mob.classList.toggle('hidden');
}

menu_button.onclick = function() {openMenu()}
close_menu.onclick = function() {closeMenu()}
