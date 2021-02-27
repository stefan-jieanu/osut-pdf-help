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
    
    $('.search-result-container').empty();
    $('#loading-animation').css('visibility', 'visible');

    $.post("http://25.64.181.255:3000/get/" + keywords, data => {
        if (data) {
        $('#loading-animation').css('visibility', 'hidden');

            for (let i = 0; i < data.file_names.length - 1; i++) {
                $('.search-result-container').append(
                    `
                    <div class="search-result">
                        <span>
                            <img src="http://25.64.181.255:3000/static/images/files.svg">
                        </span>
                        <a href="http://25.64.181.255:3000/static/uploads/ROF OSUT-mai-2019.pdf">ROF OSUT-mai-2019.pdf</a>
                        <p>&nbsp;&nbsp;Lorem ipsum doloroem etul um epsolo dol</p>
                    </div>
                    `
                );
            }
        }
    });
});