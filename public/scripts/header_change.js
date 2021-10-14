	// Change background color of header with sroll
  
  (function () {
  const header = document.querySelector('#header');
  window.addEventListener('scroll', function () {
      if (window.scrollY > 150) header.style.cssText = "background-color: #2DC670";
      else header.style.cssText = "background-color: transparent";
  });
})();
