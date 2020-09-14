
var form = document.querySelector('.formWithValidation');
var validateBtn = document.getElementById("submitBtn");
var textField = document.getElementById("Yvalue");

form.addEventListener('submit', function(event ){
    event.preventDefault()
  console.log('clicked o');
  console.log('Y value'+textField.value);
})