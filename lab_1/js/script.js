var form = document.querySelector('.formWithValidation');
var fields = form.querySelectorAll('.field');
var checkboxes = form.querySelectorAll('.checkbox-data');
var button1 = document.getElementById("btn1");
var button2 = document.getElementById("btn2");
var button3 = document.getElementById("btn3");
var button4 = document.getElementById("btn4");
var button5 = document.getElementById("btn5");
var buttonId;
var tableHead = document.getElementById("animated-table");
var clearBtn = document.getElementById("clearBtn");
var firstRow = document.getElementById("first-row");
var fourthRow = document.getElementById("fourth-row");
var fifthRow = document.getElementById("fifth-row");


clearBtn.addEventListener('click', function (event) {
    event.preventDefault();
    fetch('php/clear.php', {
        method: 'POST',
    }).then(response => response.text())
        .then((data) =>  {
            if (document.getElementById("tableBody")!=null) {
                tableHead.removeChild(document.getElementById("tableBody"));
            }
        })
})
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

          var error = document.createElement('td');
          error.className='error';
          error.style.color = 'red';
          error.innerHTML = 'Значение Y не должен быть пустым';
          fourthRow.append(error);
          errFlag++;
      }
      else if (isNaN(fields[i].value)){
          console.log('field is NaN', fields[i]);
          var error = document.createElement('td');
          error.className='error';
          error.style.color = 'red';
          error.innerHTML = 'Значение Y должен быть числом';
          fourthRow.append(error);
          errFlag++;
      }
      else if (fields[i].value <-5 || fields[i].value > 3){
          console.log('field is not in range (-5;3)', fields[i]);
          var error = document.createElement('td');
          error.className='error';
          error.style.color = 'red';
          error.innerHTML = 'Значение Y должно находиться в пределах [-5;3]';
          fourthRow.append(error);
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
      var errorChbox = document.createElement('td');
      errorChbox.className='error';
      errorChbox.style.color = 'red';
      errorChbox.innerHTML = 'Вы должны выбрать значение(я) Х';
      firstRow.append(errorChbox);
      errFlag++;
    }

    if (buttonId===undefined){
        var errorBtn = document.createElement('td');
        errorBtn.className='error';
        errorBtn.style.color = 'red';
        errorBtn.innerHTML = 'Вы должны выбрать значение(я) R';
        fifthRow.append(errorBtn);
        errFlag++;
    }

    if (errFlag===0) {
        var buttonValue = document.getElementById(buttonId).value;

        var checkbox = [];
        for (var i = 0; i < checkboxes.length; i++){
            if (checkboxes[i].checked){
                checkbox.push(checkboxes[i].value);
            }
        }

        var textValue = document.getElementById('Yvalue').value;
        console.log(textValue);

        const formData = new FormData(document.querySelector('#form'));
        formData.append('R',buttonValue);
        formData.append('X', checkbox);
        fetch('php/check.php', {
            method: 'POST',
            body: formData,
        }).then(response => response.text())
            .then((data) =>  {
                if (document.getElementById("tableBody")!=null) {
                    tableHead.removeChild(document.getElementById("tableBody"));
                }

                var body = document.createElement('tbody');
                body.innerHTML = data.trim();
                body.id = "tableBody";
                tableHead.append(body);

            })


    }



})