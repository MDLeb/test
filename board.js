
class Figure {

    constructor (x, y, width, height) {
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.currentSpeedRes = 0;
        this.currentSpeedX = 0;
        this.currentSpeedY = 0;
        this.a = 0;
        this.interval;

    }
    
    //Общая функция для движения
    //from, to - принимает {x:'значение', y:'значение'}
    //speedX, speedY - принимает начальные значения скорости по x и y
    //a - ускорение


    move = (from, to, speedX, speedY, a = 0) => {
        console.log('start');
        let t = 0;
        this.a = a;
        console.log(speedX, speedY);
        let speedRes = Math.pow((Math.pow(speedX, 2) + Math.pow(speedY, 2)), 0.5);
        let aX = a*speedX/speedRes; //ускорение по х
        let aY = a*speedY/speedRes;//ускорение по у
        this.interval = setInterval(() => {
            this.currentSpeedX = speedX + t*aX*0.001; //скорость по x в момент времени t
            this.currentSpeedY = speedY + t*aY*0.001; //скорость по y в момент времени t
            this.currentSpeedRes = Math.pow((Math.pow(this.currentSpeedX, 2) + Math.pow(this.currentSpeedY, 2)), 0.5);
            this.x = from.x + this.currentSpeedX*t; //координата по x в момент времени t
            this.y = from.y + this.currentSpeedY*t; //координата по y в момент времени t
            t += 1;

            if ((this.currentSpeedX > 0 && (this.x >= to.x) ||
                (this.currentSpeedX < 0 && (to.x >= this.x)))){ //завершение функции если текущие координаты совпали с требуемыми
               clearInterval(this.interval);
               this.currentSpeedRes = 0;
               this.currentSpeedX = 0;
               this.currentSpeedY = 0;
            }
            return [this.x, this.y, this.currentSpeedRes]; //каждую милисекунду возвращает текущие координаты x, y и результирующую скорость
        }, 1);
    }

    //Функция для равноускоренного движения
    //from, to - принимает {x:'значение', y:'значение'}
    //duration - принимает время движения в секундах

    moveToEvenly = (from, to, duration) => {
        let speedX = (to.x-from.x)/duration;
        let speedY = (to.y-from.y)/duration;
        this.move(from, to, speedX, speedY);
    }
    //Функция для движения с ускорением
    //from, to - принимает {x:'значение', y:'значение'}
    //startSpeed - начальная скорость  ед/cекунду
    //a - ускорение ед/cекунду2
    moveToWithBoost = (from={x:0, y:0}, to={x:50, y:150}, startSpeed, a) => {
        if(startSpeed <= 0) startSpeed = 0.1; //чтобы ускорение не становилось NaN
        console.log(startSpeed, this.currentSpeedRes); //чтобы не тормозило при изменении направления
        if(startSpeed < this.currentSpeedRes) startSpeed = this.currentSpeedRes;
        let path = Math.pow((Math.pow((to.x-from.x), 2)+Math.pow((to.y-from.y), 2)), 0.5);
        let startSpeedX = startSpeed * (to.x-from.x)/path;
        let startSpeedY = startSpeed * (to.y-from.y)/path;
        this.move(from, to, startSpeedX, startSpeedY, a);
    }
   
    stopMovement = () => {
        console.log('stop');
        clearInterval(this.interval);
    }
}

class Board { 
    constructor(ctx) {
        this.ctx = ctx;
        this.interval = setInterval(() => {
            this.clear();
            this.draw()
        }, 10);
        this.X = this.ctx.canvas.offsetLeft;
        this.Y = this.ctx.canvas.offsetTop;
        this.ctx.canvas.addEventListener('click', (e) => {
            this.figure.stopMovement();
            this.moveFigTo(e);
        });
        this.figure = new Figure(0, 0, 20, 20);
        this.draw();
    }

    moveFigTo = (e) => {
          let x = e.x-this.X;
          let y = e.y-this.Y;
          console.log(x, y);
        this.figure.moveToWithBoost({x:this.figure.x, y:this.figure.y}, {x:x, y:y}, 0, 10);

    }    
    draw = () => {
        ctx.fillStyle = 'blue';
        ctx.fillRect(this.figure.x, this.figure.y, this.figure.width, this.figure.height);
    }
    clear = () => {
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    }


}

