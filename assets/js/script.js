(function(){

    jQuery(document).ready(function(){
        jQuery('#formAddRamal').submit(function(){
            var dados = jQuery(this).serializeArray();

            var contact =  {
                "value": dados[0].value,
                "nome": dados[0].value,
                "cod": dados[1].value,
                "dep": "PL",
                "tel": dados[2].value
            };

            var ramals = JSON.parse(localStorage.getItem('ramals'));
            ramals.push(contact);

            localStorage.setItem('ramals', JSON.stringify(ramals));

            $('#add').modal('hide');

            snackShow("Contato registrado com sucesso!");

            showItens();

            $(this).trigger("reset");
           
            return false;
        });           
    });
         

    $(document).ready(function(){

        var ramals = JSON.parse(localStorage.getItem('ramals'));

        // upload href
        $("#upload_link").on('click', function(e){
            e.preventDefault();
            $("#file:hidden").trigger('click');
        });

        if(localStorage.getItem('ramals')!=null){

            var ramals = JSON.parse(localStorage.getItem('ramals'));

            ramals = sortByKey(ramals, 'value');

            ramals.forEach(element => {
                var ramal = element.tel.charAt(element.tel.length-4)
                + element.tel.charAt(element.tel.length-3)+
                + element.tel.charAt(element.tel.length-2)+ 
                element.tel.charAt(element.tel.length-1)
                $("#list").append("<li><a href='#'>"+element.value+" - "+ramal+"</a></li>");
            });     
            
            addButtonDownload(ramals);

            $("#empty").hide();
        } else {
            $("#empty").show();
        }

        document.getElementById('myInput').onkeyup = myFunction;


        $(".snackshow").on('click', function(e){
            var msg = $(this).attr("data-msg-return");
            if(msg!=null)
                snackShow(msg);
        });

        $('.remove').click( function(e) {e.preventDefault();             
                
            var resposta = confirm("Tem certeza que deseja remover todos os ramais?");
            if(resposta){
                deleteRamals();
                $('#download').remove();
                snackShow('Contatos excluídos com sucesso!');                
            }

             return false; 
            } 
        );
    });

    function deleteRamals() {
        localStorage.clear();
        $("#list").html("");
        $("#empty").show();
    }
    
    function myFunction() {
        var input, filter, ul, li, a, i, txtValue;
        input = document.getElementById("myInput");
        filter = input.value.toUpperCase();
        ul = document.getElementById("list");
        li = ul.getElementsByTagName("li");
        for (i = 0; i < li.length; i++) {
            a = li[i].getElementsByTagName("a")[0];
            txtValue = a.textContent || a.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                li[i].style.display = "";
            } else {
                li[i].style.display = "none";
            }
        }
    }

    function snackShow(text) {
        // Get the snackbar DIV
        var x = document.getElementById("snackbar");
    
        // Add the "show" class to DIV
        x.className = "show";
        x.innerHTML = text;
    
        // After 5 seconds, remove the show class from DIV
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 1500);
    }

}());

function sortByKey(array, key) {
    return array.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}

function addButtonDownload(ramals){
    var data = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(ramals));
    $(".navbar-header").append('<a href="data:'+data+'" id="download" download="ramals.json" data-tooltip="tooltip"  data-placement="bottom" title="Exportar contatos" innerHTML="download" class="export"><i class="fa fa-fw fa-download"></i> </a>'); 
}

function showItens(){
    var ramals = JSON.parse(localStorage.getItem('ramals'));

    ramals = sortByKey(ramals, 'value');

    ramals.forEach(element => {
        var ramal = element.tel.charAt(element.tel.length-4)
        + element.tel.charAt(element.tel.length-3)+
        + element.tel.charAt(element.tel.length-2)+ 
        element.tel.charAt(element.tel.length-1)
        $("#list").append("<li><a href='#'>"+element.value+" - "+ramal+"</a></li>");
    });  

    addButtonDownload(ramals);
    $("#empty").hide();
}