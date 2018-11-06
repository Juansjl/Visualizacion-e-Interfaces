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