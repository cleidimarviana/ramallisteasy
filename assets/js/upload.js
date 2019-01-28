
(function(){
    
    function onChange(event) {
        var reader = new FileReader();
        reader.onload = onReaderLoad;
        reader.readAsText(event.target.files[0]);
    }

    function onReaderLoad(event){
        console.log(event.target.result);
        var ramals = JSON.parse(event.target.result);

        localStorage.setItem('ramals', JSON.stringify(ramals));

        showItens();
    }
    
    document.getElementById('file').addEventListener('change', onChange);

    
    $(document).ready(function(){

        // tooltips bootstrap
        $('[data-tooltip="tooltip"]').tooltip();
    });
    

}());