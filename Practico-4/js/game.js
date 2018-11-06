class Game {
    constructor(args = {}) {
        this.ship = new Ship({
            w: 130,
            h: 100,
            htmlDOM: '<div id="ship" class="ship"></div>',
            id: 'ship'
        });
        this.start = false;
        this.contEnemy = 0;
        this.puntaje = 0;
        this.loses = 0;
        this.bestScore = 0;
        this.spawnTimer;
        this.enemies = [];
        this.intervals = [];      
    }
    
    startGame(){
        this.start = true;
        document.getElementById("game").classList.add("background-animation");
        document.getElementById("puntaje").innerHTML = this.puntaje;
        document.getElementById("loses").innerHTML = this.loses;
        document.getElementById("bestScore").innerHTML = this.bestScore;
        this.spawnPlayer();
        let that = this;
        this.spawnTimer = setInterval(function(){
            that.spawnEnemy();
            that.puntaje += 100;
            document.getElementById("puntaje").innerHTML = that.puntaje;
        }, 4500);
        
        document.getElementById("ship").addEventListener("animationend", () => {
            let elem = document.getElementById("ship").classList;
            if (elem.contains("explosion")) {
                this.cleanGame();
            }
        });
    }

    cleanGame(){
        clearInterval(this.spawnTimer);
        $("#ship").remove();
        if(this.bestScore < this.puntaje){
            this.bestScore = this.puntaje;
        }
        this.puntaje = 0;
        this.loses++;
        for(let i = 0; i < this.enemies.length; i++){
            let enemy = this.enemies[i];
            $('#' + enemy.getId()).remove();            
        }
        for(let i = 0; i < this.intervals.length; i++){
            clearInterval(this.intervals[i]);        
        }
        this.enemies = []; 
        this.intervals = [];
        document.getElementById("game").classList.remove("background-animation");
    }

    detectCollision(){
        for(let i = 0; i < this.enemies.length; i++){
            let enemy = this.enemies[i];
            let posData = enemy.calculatePos();
            if(this.ship.checkCollition(posData)){
                this.ship.setAnimation("explosion");
            }
        }
    }

    spawnPlayer() {
        if (this.start) {
            this.ship.create(275, 50);
        }
    }

    spawnEnemy(){
        if (this.start){
            let nRandom = Math.floor(Math.random() * 2);
            let x;
            let enemy;
            if(nRandom == 0){
                enemy = new Ship({
                    w: 100,
                    h: 100,
                    htmlDOM: '<div class="asteroid" id="asteroid' + this.contEnemy  + '"></div>',
                    id: 'asteroid' + this.contEnemy
                });
                x = Math.floor(Math.random() * 600);
                enemy.create(x, 650);
                this.enemies.unshift(enemy);
            }else{
                enemy = new Ship({
                    w: 100,
                    h: 100,
                    htmlDOM: '<div class="mine" id="mine' + this.contEnemy  + '"></div>',
                    id: 'mine' + this.contEnemy
                });
                x = Math.floor(Math.random() * 600);
                enemy.create(x, 650);
                this.enemies.unshift(enemy);
            }
            this.contEnemy++;
            let that = this;
            $('#' + enemy.getId()).on("animationstart", function () {
                let interval = setInterval(() => {
                   that.detectCollision();
                }, 1500);
                that.intervals.unshift(interval);
            });
        }
    }

    moveLeft(){
        if (this.start) {
            this.ship.moveLeft(15);
        }
    }

    moveRight(){
        if (this.start) {
            this.ship.moveRight(15);
        }
    }

    moveUp(){
        if (this.start) {
            this.ship.moveUp(15);
        }
    }

    moveDown(){
        if (this.start) {
            this.ship.moveDown(15);
        }
    }
}
