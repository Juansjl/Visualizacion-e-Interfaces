let game = new Game();

document.getElementById("start").addEventListener("click", function () {
    game.startGame();
});

document.addEventListener("keydown", function(e){
    key = String.fromCharCode(event.key.charCodeAt(0));
    switch (key) {
        case 'a':
            game.moveLeft();
            break;
        case 'd':
            game.moveRight();
            break;
        case 'w':
            game.moveUp();
            break;
        case 's':
            game.moveDown();
            break;
    }
});

fetch('http://jsonplaceholder.typicode.com/users')
  .then(responseUsers => responseUsers.json())
  .then(function(responseUsers){
    fetch('http://jsonplaceholder.typicode.com/photos')
    .then(responsePhotos => responsePhotos.json())
    .then(function(responsePhotos){
        fetch('http://jsonplaceholder.typicode.com/posts?_start=10&_limit=10%27')
        .then(response => response.json())
        .then(function(response){
            for (var i = 0; i < response.length; i++) {
            document.getElementById("commet").innerHTML = response[i].body;
            for (var u = 0; u < responseUsers.length; u++) {
                if(responseUsers[u].id == response[i].userId){
                    document.getElementById("userName").innerHTML = responseUsers[u].username;
                    console.log(responsePhotos[u].url);
                    document.getElementById("photo").src = responsePhotos[u].url;
                    }
                }
            }
        });
    });
});



     