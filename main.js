window.onload = function () {
    const canvas = document.getElementById('canvas');
    canvas.width = 1150;
    canvas.height = 580;

    const context = canvas.getContext('2d');

   // const background = new Image();

   // background.src = 'images/nebo.png';

   // background.onload = function () {
     //   context.drawImage(background,0,0);
   // };

    const game = new Game(canvas, context);     //Движение бэкграунда
    const bird = new Ptica(250, 400, context);  // Позиция птицы
    Loop();
    function Loop() {                           //Игра
      game.update();
      game.render();
      bird.update();
      bird.render();
      window.requestAnimationFrame(Loop);
    }
};



const Game =function (canvas, context) {
  this.canvas = canvas;
  this.context = context;
  this.backpos = 0;                     // Позиция бэкграунда
  this.forwpos = 0;                     // Позиция препятствий
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

const Ptica = function(x, y, context){
    this.x = x;                                     // позиция птицы по х
    this.y = y;                                     // позиция птицы по у
    this.context = context;                         // контекст
    this.changeposy = 0;                            //изменение позиции по у
    this.width = 184;                               // размеры кадров спрайта
    this.height = 168;
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
   // document.addEventListener('keydown',function(e){
     //  if(e.keyCode == 32){
      //      self.changeposy = -16;
     //  }
   // });
};

Ptica.prototype.update = function(){
    this.ticks ++;
    if(this.ticks % 5 == 0) this.spriteindex = (this.spriteindex+2) % this.sprite.length;   // скорость изменения кадров спрайта
    this.y += this.changeposy;                                                              // падение птицы
    this.changeposy +=0;                                                                    // скорость падения
};

Ptica.prototype.render = function () {
  let renderx = this.x - this.width;                                                         // координаты птицы
  let rendery = this.y - this.height;
  this.context.drawImage(this.sprite[this.spriteindex],renderx,rendery);                     // изменение кадров спрайта
};