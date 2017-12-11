window.onload = function () {
    const canvas = document.getElementById('canvas');
    canvas.width = 1180;
    canvas.height = 580;

    const context = canvas.getContext('2d');


    // const background = new Image();

    // background.src = 'images/nebo.png';

    // background.onload = function () {
    //   context.drawImage(background,0,0);
    // };

    const game = new Game(canvas, context);     //Движение бэкграунда
    const bird = new Ptica(250, 250, context);  // Движение птицы
    //const tubeup = new Tube(600,-5,200,4,context);
    const tubes = [];
    setInterval(function () {
        let tubeset = generatorTube(context,canvas.width,canvas.height);
        tubes.push(tubeset.top,tubeset.bottom);
    }, 1000);// Период создания барьера
    Igra();
    function Igra() {                            //Игра
        let score = 0;
        //context.fillText(score,0,0,50);

        game.update();
        game.render();
        tubes.forEach(function (tubeup){
            tubeup.update();
            tubeup.render();
        });
        bird.update();
        bird.render();
        if(detect(bird,tubes)) {
            location.href = 'GameOver.html';
        }

       // if(fly(bird,tubes)) score += 1;
        //else{score +=1}
       // console.log(score);

        window.requestAnimationFrame(Igra);
    }
};


/////////////////////////////////////////////////////////////////////////////////////////////
const Game =function (canvas, context) {
    this.canvas = canvas;
    this.context = context;
    this.backpos = 0;                     // Позиция бэкграунда
    //this.forwpos = 0;                     // Позиция препятствий
    this.backSpeed = 7;                   // Скорость бэкграунда
    this.backwidth = 1280;                // Ширина бэка
    this.backImg1 = document.getElementById('back');
    this.backImg2 = document.getElementById('back2');         //Бэкграунд

};

Game.prototype.update = function(){
    this.backpos -= this.backSpeed;                   //Изменение позиции
    if(this.backpos < -this.backwidth)                //Цикл бэкграунда
        this.backpos = 0;
};

Game.prototype.render = function () {
    this.context.drawImage(this.backImg1,0,0);
    for(let i = 0; i <= this.canvas.width/this.backwidth+1; i ++)       // рендер кадров
        this.context.drawImage(this.backImg2,this.backpos+ i*this.backwidth,0); // копирование бэкграунда

};
//////////////////////////////////////////////////////////////////////////////////////////////////////////
const Ptica = function(x, y, context){
    this.x = x;                                     // позиция птицы по х
    this.y = y;                                     // позиция птицы по у
    this.context = context;                         // контекст
    this.changeposy = 0;                            //изменение позиции по у
    this.width = 50;                               // размеры кадров спрайта
    this.height = 45;
    this.ticks = 0;
    this.spriteindex=0;                             // изменение кадров спрайта
    this.sprite = [document.getElementById('body'),
        document.getElementById('body2'),
        document.getElementById('body3'),
        document.getElementById('body4'),
        document.getElementById('body5'),
        document.getElementById('body6'),
        document.getElementById('body7'),
        document.getElementById('body8'),
        document.getElementById('body9'),
        document.getElementById('body10'),
        document.getElementById('body11'),
        document.getElementById('body12'),
        document.getElementById('body13'),
        document.getElementById('body14')
    ];
    var self = this;                                // пееремещение по у вверх
     document.addEventListener('keydown',function(e){
      if(e.keyCode == 32){
          self.changeposy = -10;
          var audio = new Audio();
          audio.src = 'jump.mp3';
          audio.autoplay = true;
      }
     });
};

Ptica.prototype.update = function(){
    this.ticks ++;
    if(this.ticks % 5 == 0) this.spriteindex = (this.spriteindex+2) % this.sprite.length;   // скорость изменения кадров спрайта
    this.y += this.changeposy;                                                              // падение птицы
    this.changeposy +=0.7;                                                                    // скорость падения
};

Ptica.prototype.render = function () {
    let renderx = this.x - this.width;                                                         // координаты птицы
    let rendery = this.y - this.height;
    this.context.drawImage(this.sprite[this.spriteindex],renderx,rendery);                     // изменение кадров спрайта
};

/////////////////////////////////////////////////////////////////////////////////////////////////////


const Tube = function (xposition,yposition, length,speed, context){
    this.xposition = xposition;
    this.yposition = yposition;
    this.length = length;
    this.context = context;
    this.speed = speed;
    this.width = 150;
    //this.tubeup = document.getElementById("tubeup");
    //this.tubedown = document.getElementById("tubedown");
   // tubeup.width = 50;
    //tubeup.height = 150;
};

Tube.prototype.update = function(){
    this.xposition -= this.speed;

    };

Tube.prototype.render = function(){
    this.context.save();
    this.context.fillStyle = "#000000";
    this.context.fillRect(this.xposition,this.yposition,this.width,this.length);
    this.context.fillStyle = "#00bfb8";
    this.context.fillRect(this.xposition+5,this.yposition+5,this.width-10,this.length-10);
    //this.context.fillStyle = "#FFFFFF";

    //this.context.drawImage(tubeup,this.xposition,this.yposition+400,150,this.length-10);
};

function generatorTube(context,canvasWidth,canvasHeight){
    let lengthup = Math.round(Math.random()*200+150);
    let lengthdown = canvasHeight - 200 - lengthup;
    let returnVal = { };
    returnVal.top = new Tube(canvasWidth,-5,lengthup,4,context);
    returnVal.bottom = new Tube(canvasWidth,canvasHeight+5-lengthdown,lengthdown,4,context);
    return returnVal;

}

function detect(bird, tubes){
    let score = 0;
    for( var i = 0; i < tubes.length; i++){
        let e = tubes[i];
        let highTube = e.yposition <= 0 ;
        let x0 = e.xposition, x1 = e.xposition + e.width;
        if(highTube){
            let y0 = e.yposition + e.length;
            let a = bird.x;
            let b = bird.y - bird.height/2;
            if(a < x0)
            {
                score ++;
                console.log(score);
            }
            if(a  > x0 && a < x1 && b < y0){
                return true;
            }
        }
        else{
            let y2 = e.yposition;
            let a = bird.x;
            let b = bird.y + bird.height/2;
            if(a  > x0 && a < x1 && b > y2) return true;
        }
    }

return false;
}

function fly(bird, tubes) {
    for (var i = 0; i < tubes.length; i++) {
        let e = tubes[i];
        let highTube = e.yposition <= 0;
        let x0 = e.xposition, x1 = e.xposition + e.width;
        if (x0 < bird.x) {
            return true;
        }
    }
}