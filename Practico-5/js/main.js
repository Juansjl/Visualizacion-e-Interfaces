let comments;
let cont = 0; 
let commentId = 'textComment';
let nombreId = 'nombre';
let imgId = 'avatar';
comments = '<div class= "comment"><img id=' + imgId + ' src="https://www.w3schools.com/howto/img_avatar.png" alt="avatar"><div><h5 id=' + nombreId + '>Robert</h5><span id=' + commentId + '>I just made a comment about this comment box which is purely made from CSS.</span></div></div>';
$("#boxComment").append(comments);

fetch('http://jsonplaceholder.typicode.com/users?_start=0&_limit=5')
  .then(responseUsers => responseUsers.json())
  .then(function(responseUsers){
    fetch('http://jsonplaceholder.typicode.com/photos')
    .then(responsePhotos => responsePhotos.json())
    .then(function(responsePhotos){
        fetch('http://jsonplaceholder.typicode.com/posts')  
        .then(response => response.json())
        .then(function(response){                 
            for (var u = 0; u < responseUsers.length; u++) {
            for (var i = 0; i < response.length; i++) {
                if(responseUsers[u].id == response[i].userId){
                    commentId += cont;
                    nombreId += cont;
                    imgId += cont;
                    comments = '<div class="comment"><img id=' + imgId + ' src="https://www.w3schools.com/howto/img_avatar.png" alt="avatar"><div><h5 id=' + nombreId + '>NombreUsuario</h5><span id=' + commentId + '>I just made a comment about this comment box which is purely made from CSS.</span></div></div>';
                    $("#boxComment").append(comments);
                    document.getElementById(commentId).innerHTML = response[i].body;
                    document.getElementById(nombreId).innerHTML = responseUsers[u].username;
                    document.getElementById(imgId).src = responsePhotos[u].url;
                    cont++;
                    i = response.length;
                    }
                }
            }
        });
    });
});