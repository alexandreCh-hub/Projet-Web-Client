$(document).ready(function(){
    load();
    //envoie le message
    $("#sendButton").click(function(){send(); load();});
});

//fonction de chargement des messages 
function load(){

    $.ajax({
        url: '../htbin/chatget.py',
        type : 'GET',
        dataType : 'json',
        success : function(reponse){
            var contenu = '';
            $.each(reponse, function(index, donnee){
                contenu = '<tr>' + 
                '<td>' + '<img src="images/whiteLogin.png" alt="logo de profil">'+
                '<ul>'+
                    '<li>'+donnee.user+'</li>'+
                    '<li> date : '+donnee.date+'</li>'+
                    '<li> heure :'+donnee.time+'</li>'+
                '</ul>'+
                '<td>'+donnee.msg+'</td>'+
                '</tr>' + contenu;
            });

            $('tbody').html(contenu);
        },
        error: function(xhr,status,error){
            console.log("erreur de fonctionnement : "+error);
        }
    });
}

/*+ donnee.user +
                '\ndate : '+ donnee.date +
                '\nheure : '+donnee.time+'</td>' +
                '<td>' + donnee.msg + '</td>' +*/

//fonction d'envoie de messages
function send(){
    var message = $("#input");

    $.ajax({
        url: '../htbin/chatsend.py',
        type : 'POST',
        data : {msg : message.val()},
        success : function(reponse){
            var erreur = document.getElementById("error");
            message.val('');
            if(reponse.num == 0){
                error.style.dispaly = "none";
            }else if(reponse.num==1){
                erreur.innerHTML = "Le message est vide";
                error.style.display = "block";
            }else{
                erreur.innerHTML = "Erreur de nom d'utilisateur";
            }
        },
        error: function(xhr,status,error){
            console.log("erreur de fonctionnement : "+error);
        }
    });
}