function toaster(type, message) {
    if (type == "warning") {
        toastr.error(message);
    } else {
        toastr.success(message);
    }
}

$(document).ready(function () {
    $('#becomeAHostForm').submit(function (e) {
        e.preventDefault();

        $('#becomeAHostForm :submit').attr('disabled', 'disabled');
        $('#becomeAHostForm :submit').html('<center>Processing... <div class="spinner-border spinner-border-sm" role="status"></div></center>');
        values = $('#logForm :input').serializeArray();
        var fname = $('#fname').val();
        var lname = $('#lname').val();
        var email = $('#email').val();
        var phone = $('#phone').val();
        var address = $('#address').val();

        try {
            $.ajax({
                url: path + 'addNewHost',
                type: 'post',
                data: {
                    fname: fname, lname: lname, email: email, address: address, phone: phone
                },
                headers: {
                    'Authorization': authorization,
                },
                dataType: 'json',
                success: function (data) {
                    $('#becomeAHostForm :submit').removeAttr('disabled');
                    $('#becomeAHostForm :submit').html('Submit');
                    // $('.formSpan').html(data);
                    if (data.status == true) {
                        toastr.success(data.message);
                        $('#becomeAHostForm').trigger('reset');
                    }else{
                        toastr.error(data.message);
                    }
                }
            });
            return false;
        } catch (error) {
            console.log(error);
            $('#becomeAHostForm :submit').removeAttr('disabled');
            $('#becomeAHostForm :submit').html('Submit');
        }
    });
    $('#newsLetter').submit(function (e) {
        e.preventDefault();

        $('#newsLetter :submit').attr('disabled', 'disabled');
        $('#newsLetter :submit').html('<center><div class="spinner-border spinner-border-sm" role="status"></div></center>');
        values = $('#logForm :input').serializeArray();
        var email = $('#newsLetterEmail').val();

        try {
            $.ajax({
                url: path + 'addNewNewsLetter',
                type: 'post',
                data: {
                    email: email
                },
                headers: {
                    'Authorization': authorization,
                },
                dataType: 'json',
                success: function (data) {
                    $('#newsLetter :submit').removeAttr('disabled');
                    $('#newsLetter :submit').html('<i class="fas fa-envelope"></i>');
                    // $('.formSpan').html(data);
                    if (data.status == true) {
                        toastr.success(data.message);
                        $('#newsLetter').trigger('reset');
                    }else{
                        toastr.error(data.message);
                    }
                }
            });
            return false;
        } catch (error) {
            console.log(error);
            $('#newsLetter :submit').removeAttr('disabled');
            $('#newsLetter :submit').html('<i class="fas fa-envelope"></i>');
        }
    });
});
