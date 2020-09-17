var form = document.querySelector('.formWithValidation');
var fields = form.querySelectorAll('.field');
var checkboxes = form.querySelectorAll('.chbox');
var button1 = document.getElementById("btn1");
var button2 = document.getElementById("btn2");
var button3 = document.getElementById("btn3");
var button4 = document.getElementById("btn4");
var button5 = document.getElementById("btn5");
var buttonId;

button1.addEventListener('click', function (event){
    event.preventDefault();
    buttonId = 'btn1';
    console.log('this is buttonId', buttonId);
})

button2.addEventListener('click', function (event){
    event.preventDefault();

    buttonId = 'btn2';
    console.log('this is buttonId', buttonId);
})

button3.addEventListener('click', function (event){
    event.preventDefault();

    buttonId = 'btn3';
    console.log('this is buttonId', buttonId);
})
button4.addEventListener('click', function (event){
    event.preventDefault();

    buttonId = 'btn4';
    console.log('this is buttonId', buttonId);
})
button5.addEventListener('click', function (event){
    event.preventDefault();

    buttonId = 'btn5';
    console.log('this is buttonId', buttonId);
})


form.addEventListener('submit', function(event ){

    event.preventDefault()

    var errFlag = 0;
    var errors = form.querySelectorAll('.error');
    var chFlag = 0;

    for (var i = 0; i < errors.length; i++) {
        errors[i].remove()
    }
    for (var i=0; i<fields.length; i++) {
      console.log(isNaN(fields[i].value));
      if (!fields[i].value){
          console.log('field is blank', fields[i]);
          var error = document.createElement('div');
          error.className='error';
          error.style.color = 'red';
          error.innerHTML = 'Cannot be blank';
          fields[i].parentElement.insertBefore(error, fields[i]);
          errFlag++;
      }
      else if (isNaN(fields[i].value)){
          console.log('field is NaN', fields[i]);
          var error = document.createElement('div');
          error.className='error';
          error.style.color = 'red';
          error.innerHTML = 'Cannot be NaN';
          fields[i].parentElement.insertBefore(error, fields[i]);
          errFlag++;
      }
      else if (fields[i].value <-5 || fields[i].value > 3){
          console.log('field is not in range (-5;3)', fields[i]);
          var error = document.createElement('div');
          error.className='error';
          error.style.color = 'red';
          error.innerHTML = 'Cannot be in this range';
          fields[i].parentElement.insertBefore(error, fields[i]);
          errFlag++;
      }
    }

    for (var i=0; i<checkboxes.length; i++) {

      if (checkboxes[i].checked){
          console.log(checkboxes[i])
          chFlag++;

      }
    }

    if (chFlag===0){
      var errorChbox = document.createElement('div');
      errorChbox.className='error';
      errorChbox.style.color = 'red';
      errorChbox.innerHTML = 'Cannot be blank';

      checkboxes[0].parentElement.insertBefore(errorChbox, checkboxes[0]);
      errFlag++;
    }

    if (buttonId===undefined){

        var errorBtn = document.createElement('div');
        errorBtn.className='error';
        errorBtn.style.color = 'red';
        errorBtn.innerHTML = 'Cannot be untouched';
        button1.parentElement.insertBefore(errorBtn, button1);
        errFlag++;
    }

    if (errFlag===0) {
        var buttonValue = document.getElementById(buttonId);
        console.log(buttonValue.value);
        var checkbox = [];
        for (var i = 0; i < checkboxes.length; i++){
            if (checkboxes[i].checked){
                checkbox.push(checkboxes[i].value);
            }
        }
        var textValue = document.getElementById('Yvalue');
        console.log(textValue.value);


        console.log(checkbox);
        var data = {
            checkData: checkbox,
            textData: textValue.value,
            btnData: buttonValue.value,

        }
        var json = JSON.stringify(data);
        var request = new XMLHttpRequest();
        request.open("POST", "php/postjson.php");
        request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        request.onreadystatechange = function () {
            if (request.readyState == 4 && request.status == 200) {
                document.getElementById("output").innerHTML = request.responseText;
            }
        }
        request.send(json);

    }


})