$(document).ready(function () 
{
    $('#Formulario').submit(function (event) 
    {
        event.preventDefault(); 
        var name = $('#name').val();
        var email = $('#email').val();
        var anexo = $('#file')[0].files[0]; 
        var formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('file', anexo);

        // Send form data to the server using AJAX
        $.ajax({
            url: '../php/SendEmail.php', 
            data: formData,
            contentType: false, // Prevent jQuery from automatically setting the content type
            processData: false, // Prevent jQuery from processing the data
            success: function (response) 
            {
                // Reset form fields after successful submission
                $('#name').val('');
                $('#email').val('');
                $('#file').val('');

            },
            error: function ()
            {
                alert('Ocorreu um erro a mandar ficheiros para o php. Por favor, tente novamente.');
            }
        });
    });
});
