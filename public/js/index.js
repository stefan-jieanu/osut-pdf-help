function loadPDFNames() {
    $.ajax({url: "http://25.64.181.255:3000/get/this is keyword", success: (result) => {
        $('#pdf-container').empty();
        // only go to length - 1 because the last item is emtpy
        for (let i = 0; i < result.files.length - 1; i++) {
            $('#pdf-container').append(result.files[i]);
        }
    }});
}

$('#search-button').click(event => {
    event.preventDefault();

    keywords = $('#search-bar').val();
    
    $.post("http://25.64.181.255:3000/get/" + keywords, data => {
        console.log(data);
    });
});