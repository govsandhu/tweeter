
$(document).ready(function() {
    let textAreaElement = document.getElementById('textArea');
    
    function characterCount () {
        const maxLength = 140;
        let currentLength = $(this).val().length;
        let remainingCharacters = maxLength - currentLength;
        
        
    }

    textAreaElement.addEventListener('input', characterCount)
});