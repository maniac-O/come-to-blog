"use strict";

// Object, 객체지향, method
$(window).ready(function () {
  var fruits = [1, 2, 3, 4, 5];
  fruits.splice(1, 2, 2, 3);
  fruits.pop();
  console.log(fruits);
});