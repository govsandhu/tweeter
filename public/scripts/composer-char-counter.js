
$(document).ready(function() {
    let textAreaElement = $('#textArea');
    
    function characterCount () {
        const maxLength = 140;
        let currentLength = $(this).val().length;
        let remainingCharacters = maxLength - currentLength;

        if (remainingCharacters < 0) {
            $(this).siblings('#characterCounter')
                .text(remainingCharacters)
                .css({ 'color': 'red'});
        } else if (remainingCharacters >= 0) {
            $(this).siblings('#characterCounter')
                .text(remainingCharacters)
                .css({'color': 'black'})
        }  
    }
    textAreaElement.on('input', characterCount)
});

