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
            window.location = "perfilPaciente.html";
        }
    }
    $("#loginButton").click( function() {
        $("#loginButtonTxt").hide();
        $("#loadingSpinner").show();
        if (!verifyInputs()) {
            $("#loginButtonTxt").show();
            $("#loadingSpinner").hide();
            return;
        }
        var body = {
            "email":$("#emailField").val(),
            "role":$('input[name=optradio]:checked', '#loginForm').val(),
            "password":$("#passwordField").val()
        };
        var urll = window.hostUrl+"/login"
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
                else {
                    var settings = {
                        "async": true,
                        "crossDomain": true,
                        "url": window.hostUrl+"/pacientes/"+response.userId,
                        "method": "GET",
                        "headers": {
                            "x-auth-token": response.token,
                            "cache-control": "no-cache"
                        }
                    };
                    $.ajax(settings).done(function (response) {
                        window.localStorage.setItem('patient', JSON.stringify(response));
                        window.location = "perfilPaciente.html";
                    });
                }
            })
            .fail(function (xhr, status, error) {
                $("#loadingSpinner").hide();
                $("#loginButtonTxt").show();
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
