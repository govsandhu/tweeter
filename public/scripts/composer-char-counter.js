
$(document).ready(function() {
    let textAreaElement = document.getElementById('textArea');
    
    function characterCount () {
        const maxLength = 140;
        let currentLength = $(this).val().length;
        let remainingCharacters = maxLength - currentLength;
        console.log(remainingCharacters)
        document.getElementById('characterCounter').innerHTML = remainingCharacters
        
    }

    textAreaElement.addEventListener('input', characterCount)


});

