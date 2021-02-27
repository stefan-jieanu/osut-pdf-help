function loadPDFNames() {
    $.ajax({url: "http://25.64.181.255:3000/get-all", success: (result) => {
        $('#pdf-container').empty();
        $('#pdf-container').append(result); 
    }});
}