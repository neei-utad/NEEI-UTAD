//libraries
//------------------------------------------------
//AOS
AOS.init();
setTimeout(() => {
  AOS.refresh();
}, 1000);

document.querySelector("#tudo").onclick = function () {
  this.classList.add("btn-dark");
  document.querySelector("#roupa").classList.remove("btn-dark");
  document.querySelector("#objetos").classList.remove("btn-dark");

  var objetos = document.getElementsByClassName("objetos");
  for (var i = 0; i < objetos.length; i++) {
    objetos[i].style.display = "block";
  }

  var roupa = document.getElementsByClassName("roupa");
  for (var i = 0; i < roupa.length; i++) {
    roupa[i].style.display = "block";
    AOS.refresh();
  }
};

document.querySelector("#roupa").onclick = function () {
  this.classList.add("btn-dark");
  document.querySelector("#objetos").classList.remove("btn-dark");
  document.querySelector("#tudo").classList.remove("btn-dark");

  var objetos = document.getElementsByClassName("objetos");
  for (var i = 0; i < objetos.length; i++) {
    objetos[i].style.display = "none";
  }

  var roupa = document.getElementsByClassName("roupa");
  for (var i = 0; i < roupa.length; i++) {
    roupa[i].style.display = "block";
  }
  AOS.refresh();
};

document.querySelector("#objetos").onclick = function () {
  this.classList.add("btn-dark");
  document.querySelector("#roupa").classList.remove("btn-dark");
  document.querySelector("#tudo").classList.remove("btn-dark");

  var objetos = document.getElementsByClassName("objetos");
  for (var i = 0; i < objetos.length; i++) {
    objetos[i].style.display = "block";
  }

  var roupa = document.getElementsByClassName("roupa");
  for (var i = 0; i < roupa.length; i++) {
    roupa[i].style.display = "none";
  }
  AOS.refresh();
};