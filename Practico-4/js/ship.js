class Ship {
    constructor(args = {}) {
        this.width = args.w;
        this.height = args.h;
        this.id = args.id;
        this.element = args.htmlDOM;

        this.x = 0;
        this.y = 0;
    }

    create(x,y){
        $("#game").append(this.element);
        this.x = x;
        this.y = y;
        this.setPos(x,y);
    }

    setPos(x, y){
        let css = document.getElementById(this.id).style;
        css.left = x + "px";
        css.bottom = y + "px";
    }

    calculatePos(){
        let rect;
        let posData = {};

        let elem = document.getElementById(this.id);
        if(elem){
            rect = elem.getBoundingClientRect();
            let dif = 25;
            posData.top = rect.top - dif;
            posData.bottom = rect.bottom + dif;
            posData.left = rect.left + dif;
            posData.right = rect.right - dif;
        }
        return posData;
    }

    moveLeft(x){
        this.x -= x;
        let css = document.getElementById(this.id).style;
        css.left = this.x + "px";
    }

    moveRight(x){
        this.x += x;
        let css = document.getElementById(this.id).style;
        css.left = this.x + "px";
    }

    moveUp(y){
        this.y += y;
        let css = document.getElementById(this.id).style;
        css.bottom = this.y + "px";
    }

    moveDown(y){
        this.y -= y;
        let css = document.getElementById(this.id).style;
        css.bottom = this.y + "px";
    }

    checkCollition(enemyPos){
        let shipPos = this.calculatePos();

        //El cuadro lo detecta como el canvas arriba el menor, abajo el mayor
        if((shipPos.bottom <= enemyPos.bottom) && (shipPos.bottom >= enemyPos.top)){
            if((shipPos.left >= enemyPos.left) && (shipPos.left <= enemyPos.right)){
                return true;
            }
            if((shipPos.right <= enemyPos.right) && (shipPos.right >= enemyPos.left)){
                return true;
            }
        }
        if((shipPos.top >= enemyPos.top) && (shipPos.top <= enemyPos.bottom)){
            if((shipPos.left >= enemyPos.left) && (shipPos.left <= enemyPos.right)){
                return true;
            }
            if((shipPos.right <= enemyPos.right) && (shipPos.right >= enemyPos.left)){
                return true;
            }
        }
        return false;
    }

    setAnimation(animation){
        let elem = document.getElementById(this.id);
        elem.classList.add(animation);
    }

    getId(){
        return this.id;
    }
}