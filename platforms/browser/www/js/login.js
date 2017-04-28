/**
 * Created by felipeplazas on 4/25/17.
 */
$(document).ready(function() {
    var token = JSON.parse(window.localStorage.getItem('user'));
    if (token == null || token.expireTimeStamp < new Date().getTime()){
        $("#pageBody").show();
    }
    else{
        if (token.userGroup == 'medicos')
            window.location = "pacientesDelMedico.html";
        else if (token.userGroup == 'pacientes'){
            swal(
                'Oops...',
                'This app does not support patients yet.',
                'error'
            )
        }
    }
    $("#loginButton").click( function() {
        if (!verifyInputs()) return;
        var body = {
            "email":$("#emailField").val(),
            "role":$('input[name=optradio]:checked', '#loginForm').val(),
            "password":$("#passwordField").val()
        };
        var urll = window.hostUrl+"/login"
        console.log(urll);
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": urll,
            "method": "POST",
            "data":JSON.stringify(body),
            "headers": {
                "content-type": "application/json",
                "cache-control": "no-cache"
            }
        }

        $.ajax(settings)
            .done(function (response) {
                window.localStorage.setItem('user', JSON.stringify(response));
                if ($('input[name=optradio]:checked', '#loginForm').val() == 'medico')
                    window.location = "pacientesDelMedico.html";
                    // window.location.href = window.hostUrl+"/pages/pacientesDelMedico.html";
                else {
                    swal(
                        'Oops...',
                        'This app does not support patients yet.',
                        'error'
                    )
                }
            })
            .fail(function (xhr, status, error) {
                swal(
                    'Oops...',
                    'ERROR: '+xhr.responseJSON.message,
                    'error'
                )
            });
    });


    function verifyInputs() {
        var email = $("#emailField").val();
        if (email == undefined || email == '' || email.indexOf("@") == -1 || email.indexOf(".co") == -1){
            swal(
                'Oops...',
                'Debes escribir un correo válido',
                'error'
            )
            return false;
        }
        var password = $("#passwordField").val();
        if (password == undefined || password == '' || password.length < 5){
            swal(
                'Oops...',
                'Debes escribir una contraseña válida de una longitud de al menos 5 caracteres.',
                'error'
            )
            return false;
        }
        return true;
    }
});
