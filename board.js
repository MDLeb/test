class Figure {

    constructor (x, y, z, width, height, length) {
        this.width = width;
        this.height = height;
        this.length = length;
        this.x = x;
        this.y = y;
        this.z = z;
        this.r = 0;//радиус поворота, deg
        this.currentSpeedRes = 0;
        this.currentSpeedX = 0;
        this.currentSpeedY = 0;
        this.currentSpeedZ = 0;
        this.a = 0;
        this.interval;//периодичность возвращения данных при движении
    }
    
    //Общая функция для движения
    //from, to - принимает {x:'значение', y:'значение', z:'занчение'}
    //speedX, speedY, speedZ - принимает начальные значения скорости по x и y
    //a - ускорение
    move = (from, to, speedX, speedY, speedZ, a = 0) => {
        let t = 0;
        this.a = a;
        let speedRes = Math.pow((Math.pow(speedX, 2) + Math.pow(speedY, 2) + Math.pow(speedZ, 2)), 0.5);
        let aX = a*speedX/speedRes; //ускорение по х
        let aY = a*speedY/speedRes;//ускорение по у
        let aZ = a*speedZ/speedRes;//ускорение по z
        this.interval = setInterval(() => {
            this.currentSpeedX = speedX + t*aX*0.001; //скорость по x в момент времени t
            this.currentSpeedY = speedY + t*aY*0.001; //скорость по y в момент времени t
            this.currentSpeedZ = speedZ + t*aZ*0.001; //скорость по z в момент времени t
            this.currentSpeedRes = Math.pow((Math.pow(this.currentSpeedX, 2) +
                                   Math.pow(this.currentSpeedY, 2) +
                                   Math.pow(this.currentSpeedZ, 2)), 0.5);            
            this.x = from.x + this.currentSpeedX*t*0.001; //координата по x в момент времени t
            this.y = from.y + this.currentSpeedY*t*0.001; //координата по y в момент времени t
            this.z = from.z + this.currentSpeedZ*t*0.001; //координата по z в момент времени t
            t += 1;

            if ((this.currentSpeedX > 0 && (this.x >= to.x) ||
                (this.currentSpeedX < 0 && (to.x >= this.x)))){ //завершение функции если текущие координаты совпали с требуемыми
               this.stopMovement();
               this.currentSpeedRes = 0;
               this.currentSpeedX = 0;
               this.currentSpeedY = 0;
               this.currentSpeedZ = 0;
            }
            return [this.x, this.y, this.z, this.currentSpeedRes]; //возвращает текущие координаты x, y, z и результирующую скорость
        }, 1);
    }

    //Функция для равноускоренного движения
    //from, to - принимает {x:'значение', y:'значение', z: 'значение'}
    //duration - принимает время движения в секундах

    moveToEvenly = (from, to, duration) => {
        let speedX = (to.x-from.x)/duration;
        let speedY = (to.y-from.y)/duration;
        let speedZ = (to.z-from.z)/duration;
        this.move(from, to, speedX, speedY, speedZ);
    }

    //Функция для движения с ускорением
    //from, to - принимает {x:'значение', y:'значение', z:'значение'}
    //startSpeed - начальная скорость  ед/cекунду
    //a - ускорение ед/cекунду2
    moveToWithBoost = (from={x:0, y:0, z:0}, to={x:50, y:150, z:0}, startSpeed, a) => {
        if(startSpeed <= 0) startSpeed = 0.0001; //чтобы если скорость 0, ускорение в методе move() не было NaN
        if(startSpeed < this.currentSpeedRes) startSpeed = this.currentSpeedRes;//чтобы не замедлялось при изменении направления
        let path = Math.pow((Math.pow((to.x-from.x), 2) + Math.pow((to.y-from.y), 2) + Math.pow((to.z-from.z), 2)), 0.5);
        let startSpeedX = startSpeed * (to.x-from.x)/path;
        let startSpeedY = startSpeed * (to.y-from.y)/path;
        let startSpeedZ = startSpeed * (to.z-from.z)/path;
        this.move(from, to, startSpeedX, startSpeedY, startSpeedZ, a);
    }
   
    rotate = (angle) => {
        this.r += angle;
        this.r >= 360 ? this.r -= 360 : '';
    }

    stopMovement = () => {
        clearInterval(this.interval);
    }
}



//класс для тестирования движения на плоскости (без поворота фигуры)
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
        this.figure = new Figure(0, 0, 0, 20, 20, 0);
        // this.radioBtn = document.querySelectorAll('#radioBtns input');
        // this.radioBtn.addEventListener('change', () => {console.log('+')})
        this.draw();
    }

    moveFigTo = (e) => {
          let x = e.x-this.X;
          let y = e.y-this.Y;
        i
          this.figure.moveToEvenly({x:this.figure.x, y:this.figure.y, z:0}, {x:x, y:y, z:0}, 0.2);  //равномерно
        
        this.figure.moveToWithBoost({x:this.figure.x, y:this.figure.y, z:this.figure.z}, {x:x, y:y, z:0}, 100, 100); //ускоренно

    }    
    draw = () => {
        this.ctx.fillStyle = 'blue';
        this.ctx.fillRect(this.figure.x, this.figure.y, this.figure.width, this.figure.height);
    }
    clear = () => {
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

}

