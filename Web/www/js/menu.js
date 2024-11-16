function toggleMenu() {
    var menu = document.getElementById("menu");
    if (menu.className === "topnav") {
        menu.className += " responsive";
      } else {
        menu.className = "topnav"; 
      }
  }

var menuBurger = document.getElementById("menu-burger");
menuBurger.addEventListener("click", toggleMenu);