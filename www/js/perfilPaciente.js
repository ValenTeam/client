/**
 * Created by felipeplazas on 4/23/17.
 */
$(document).ready(function () {
    window.hostUrl = "http://www.hospital-arquisoft.top";
    var patient = localStorage.getItem("patient");
    patient = JSON.parse(patient);
    $("#antecedentesPaciente").append(patient.antecedentes);
    $("#patientName").append(patient.name + " " + patient.apellido);
    $("#patiendEmail").append(patient.email);
    $("#patientAddress").append(patient.address);
    $("#patientId").append(patient.cedula);
    var token = JSON.parse(window.localStorage.getItem('user'));

    function updateConcejos() {
        var table3 = $('#consejosTable').DataTable({
            "bFilter": true,
            "bInfo": false,
            "bLengthChange": false,
            "order": [[ 1, "desc" ]]
        });
        table3.clear();
        patient.historiaClinica.consejos.forEach(function (consejo) {
            var date = new Date(consejo.fecha);
            table3.row.add([consejo.mensaje, date.toLocaleString()]).draw();
        });
    }

    updateConcejos();

    $("#icon2").click(function () {
        window.location = "historialMedicionesPaciente.html";
    });
});
