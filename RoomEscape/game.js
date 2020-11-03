var game = new Phaser.Game(1050 , 700, Phaser.CANVAS, "GameDiv");
var text;
var score;
var scoreText;

class TextPanel{
    constructor(a){
        this.sprite = game.add.sprite(0, 700, "textPanel");
        this.style = { font: "16px Arial", fill: "#ff0044", wordWrap: true, wordWrapWidth: this.sprite.width, align: "center" };
        this.text = game.add.text(game.camera.x+600, 750, textMessage[a], this.style);
        this.text.anchor.set(0.5);
        this.num = a;
    }
    destructor(){
        //this.text.destroy();
        console.log("dest");
        if(textMessage[this.num]!="")
        {
            this.text.setText(textMessage[this.num+1]);
            //this.text = game.add.text(game.camera.x+400, 750, textMessage[this.num+1], this.style);
            this.num = this.num+1;
            if(textMessage[this.num]=="")
                canTalk= false;
        }
        else{
            canTalk = true;
        }

    }
    changeText(n){
        console.log("ct");
        this.text.setText(textMessage[n]);
        this.num = n;
    }
}
class Npc{
    constructor(x, y, name, textIndex){
        this.sprite = npc.create(x, y, name);
        this.sprite.anchor.setTo(0.5, 0.5);
    }
}
class Furniture{
    constructor(x, y, name){
        this.sprite = furniture.create(x, y, name);
        this.sprite.anchor.setTo(0.5, 0.5);
    }
}
class DontMoveFurniture{
    constructor(x, y, name){
        this.sprite = furniture.create(x, y, name);
    }
}
class Item{
    constructor(name){
        var y = 50 + (items.length * 200);
        this.sprite = items.create(1120+game.camera.x, y, name);
        this.sprite.inputEnabled = true;
        this.sprite.anchor.setTo(0.5, 0.5);
        this.sprite.input.enableDrag();
       this.sprite.events.onDragStart.add(itemDragStart, this.sprite);
        this.sprite.events.onDragStop.add(listener, this.sprite);
    }
}
function getItem(_name){
    console.log(_name);
    switch(_name.key){
        case 'USB':
            itemUSB = new Item("USB");
            itemUSB.sprite.scale.x = 0.27;
            itemUSB.sprite.scale.y = 0.27;
            usbAlive = false;
            _name.destroy();
            game.physics.arcade.enable(itemUSB.sprite);
            break;
        case 'KEY':
            itemKEY = new Item("KEY");
            itemKEY.sprite.scale.x = 0.27;
            itemKEY.sprite.scale.y = 0.27;
            _name.destroy();
            game.physics.arcade.enable(itemKEY.sprite);
            break;

    }
}
function itemDragStart(_gagu){
    console.log("1");
    switch(_gagu.key){
        case "USB":
            itemPos[0] = _gagu.position.y;
            itemDragOn[0] = true;
            break;
        case "KEY":
            itemPos[1] = _gagu.position.y;
            itemDragOn[1] = true;
            break;
    }
}
function listener (_gagu){
    console.log("2");
    switch(_gagu.key){
        case "USB":
            itemDragOn[0] = false;
            _gagu.position.y = itemPos[0];
            _gagu.position.x = 1120+game.camera.x;
            break;
        case "KEY":
                itemDragOn[1] = false;
                _gagu.position.y = itemPos[1];
                _gagu.position.x = 1120+game.camera.x;
                break;
    }
}
function USBOn(_usb, _pc){
    console.log("ON");
    _pc.loadTexture('PC_USB', 0);
    Monitor.sprite.loadTexture('Monitor_Die', 0);
    game.add.text(470, 280, '@sokisinside', { font: "24px Arial", fill: "#ffffff", align: "center"});
    _usb.destroy();
}
function DoorOn(_key, _door){
    console.log("ON");
    _door.loadTexture('Door_Open', 0);
    _key.destroy();
}
function GameEnd(_door){
    if(endText == null && _door.key == "Door_Open"){
        game.add.text(1500, 280, "He's gone", { font: "24px Arial", fill: "#ffffff", align: "center"});
    }
}
function DrawerChange(_gagu){
    console.log(_gagu.key)
    switch(nowDrawers){
        case 0:
           _gagu.loadTexture('Drawer_Up');
            nowDrawers = 1;
            break;
        case 1:
            _gagu.loadTexture('Drawer');
            nowDrawers = 2;
            break;
        case 2:
            _gagu.loadTexture('Drawer_Down');
            nowDrawers = 3;
            if(usbAlive){
            if(f_items[0] == null){
                f_items[0] = game.add.sprite(1950, 450, "USB");
                f_items[0].inputEnabled = true;
                f_items[0].events.onInputDown.add(getItem, this);
            }
             f_items[0].scale.y = 0.2; f_items[0].scale.x = 0.2;
            }
            break;
        case 3:
            _gagu.loadTexture('Drawer');
            if(usbAlive){
                f_items[0].scale.y = 0; f_items[0].scale.x = 0;
            }
            nowDrawers = 0;
            break;
    }
}
function Npc1Collision (_pc, _npc){
    if(player.talkKey.downDuration(25) && textpanel.text._text == "" && canTalk){
    npc1 = _npc;
    switch(_npc.key){
        case "Table":
            textpanel.changeText(6);
            break;
        case "NPC1":
            textpanel.changeText(17);
            break;
        case "PeopleSit":
            textpanel.changeText(13);
            break;

    }
}
}
function MoverClick(_mover){
    
    console.log(_mover);
    console.log(_mover == mover[0]);
    if(_mover == mover[0])
    {
        if(game.camera.x == 3600)
            {
                game.camera.x = 0;
                mover[0].x -= 3600;
                mover[1].x -= 3600;
                trash.children[0].x -= 3600;
                for(var i =0; i<items.length;i++){
                    items.children[i].x -= 3600;
                }
            }
        else{
            game.camera.x += 1200;
            mover[0].x += 1200;
            mover[1].x += 1200;
            trash.children[0].x += 1200;
            for(var i =0; i<items.length;i++){
                items.children[i].x += 1200;
            }
        }
    }
    else if(_mover == mover[1]){
        if(game.camera.x == 0){
            game.camera.x = 3600;
            mover[0].x += 3600;
            mover[1].x += 3600;
            trash.children[0].x += 3600;
            for(var i =0; i<items.length;i++){
                items.children[i].x += 3600;
            }
        }
        else{
            game.camera.x -= 1200;
            mover[0].x -= 1200;
            mover[1].x -= 1200;
            trash.children[0].x -= 1200;
            for(var i =0; i<items.length;i++){
                items.children[i].x -= 1200;
            }
        }
    }
}
function keyPress(char) {
    if(game.camera.x == 2400){
        if(parseInt(char)>=1 && parseInt(char) <= 6 ){
            if(words.length== 4)
                words = "";
            words += char;
            text.setText(words);
            if(words == "4143"){
                GoldGo.sprite.loadTexture('GoldGo_Open');
                f_items[1] = new DontMoveFurniture(3140, 453, "KEY");
                f_items[1].sprite.inputEnabled = true;
                f_items[1].sprite.events.onInputDown.add(getItem, this);
                f_items[1].sprite.scale.x = 0.18;
                f_items[1].sprite.scale.y = 0.18;
            }
            console.log(words);
        }
    }
}
var textMessage = new Array( 
  "(으악)" //0
, "(그러나 이젠 그림을 그릴  수 없었다.)"
, "(그에겐 남은 시간이 얼마 없었기 때문에.)"
, "(도시에서 노동자는 소모품이었다.)"
, "(마지막으로, 그는 도시에서 벗어나기로 마음을 먹었다. . .)"
, ""
, "(수명단축의 맛, 무한노동 에너지 드링크.)" // 6
, "(책상엔 같은 캔이 여러 개 놓여있다. . .)"
, ""
, "(엘리베이터는 작동하지 않는다.)" //9
, "(들어오는 사람은 있어도 나가는 사람은 없기 때문이다.)"
, "(다른 출구를 찾아보자. . .)"
, ""
, "(그들은 쉴 틈 없이 일하고 있다.)" //13
, "(반복적인 일, 피폐한 정신, 내려온 다크서클.)"
, "(쌓이는 스트레스, 떡진 머리, 꿈이 없는 밤.)"
, ""
, "\"당신은 도시를 떠나려는 것 같아보이네요.\""//17
, "(그가 말했다.)"
, "(같은 회사를 다녔지만, 타인의 얼굴을 기억할 여유는 없었지만)"
, "(적어도 지금 그의 모습은 다른 도시 사람들과 조금은 달라보였다.)"
, "\"회사 밖에서, 붉은 지붕 집을 찾아가요.\""
, "\"도시 밖으로 나갈 방법을 알려줄 사람이 있을 거에요.\""
, "\"저는 결국 용기가 부족해 나가지 못했지만, 당신이라면 할 수 있을거에요.\""
, "(그 말을 끝으로, 그는 다시 자신의 할 일에 열중하기 시작했다.)"
, ""
, "" // 26
, ""
, ""
)
var words = "0000";
var text;
var endText;
var itemPos=[];
var itemDragOn=[];
var itemUI;
var trash;
var items;
var lastTextTime = 0;
var lastJumpTime = 0;
var textpanel;
var mover = [];
var bullets = [];
var system;
var canTalk = false;
let platforms;
var music;
var canInput = true;
var firstJumpPower;
var secondJumpPower;
let furniture;
var stopTime;
let random3;
var walls;
var bottoms;
let itemUSB;
let itemKEY;
let Monitor;
let PC;
let Door;
let Drawers;
let GoldGo;
var nowDrawers = 0;
var f_items = [];
var usbAlive = true;
var play = {
    create : function(){
        game.physics.startSystem(Phaser.Physics.ARCADE);
        stopTime = game.time.now;
        canJump = true;
        platforms = game.add.group();
        furniture = game.add.group();
        trash = game.add.group();
        items = game.add.group();
        trash.create(1050, 0, "UI");
        text = game.add.text(3140, 250, words, { font: "24px Arial", fill: "#B62C1F", align: "center" , backgroundColor: "#000000"});
        walls = new DontMoveFurniture(0, 0, "Wall");
        bottoms = new DontMoveFurniture(0, 490, "Bottom");
        new Furniture(530, 500, "Table");
        Monitor =  new Furniture(550, 210, "Monitor");
        new Furniture(543, 405, "KeyBoard");
        Door = new DontMoveFurniture(1450, 13, "Door");
        Door.sprite.inputEnabled = true;
        Door.sprite.events.onInputDown.add(GameEnd, this);
        Drawers = new DontMoveFurniture(1900, 300, "Drawer");
        Drawers.sprite.inputEnabled = true;
        Drawers.sprite.events.onInputDown.add(DrawerChange, this);
        GoldGo = new DontMoveFurniture(3100, 370, "GoldGo");
        PC = new Furniture(350, 330, "PC");
        new Furniture(700, 400, "Mouse");
        mover[0] = game.add.sprite(900, 300, "Mover")
        mover[1] = game.add.sprite(150, 300, "Mover" )
        for(var i = 0 ; i<2; i++){
            mover[i].scale.y = 0.4;
            mover[i].inputEnabled = true;
            mover[i].events.onInputDown.add(MoverClick, this);
        }
        mover[1].scale.x = -0.4;
        mover[0].scale.x = 0.4;
        for(var i = 0 ; i<furniture.length; i++){
            furniture.children[i].scale.x = 0.4;
            furniture.children[i].scale.y = 0.4;
            game.physics.arcade.enable(furniture.children[i]);
        }
        walls.sprite.scale.x = 10;
        walls.sprite.scale.y = 2;
        bottoms.sprite.scale.x = 10;
        bottoms.sprite.scale.y = 2;
        game.input.keyboard.addCallbacks(this, null, null, keyPress);
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
        game.stage.backgroundColor = "#1c242e";
        // system = new System();
        game.world.setBounds(0, 0, 222222, 4000);
        // textpanel = new TextPanel(0);
        score = 0;
        game.input.mouse.capture = true;
        
    },
    update : function(){
        if(music == null)
        {
        console.log("music on");
        music = game.add.audio('bgm');
        music.volume = 0.5;
        music.play();
        }
        if(itemDragOn[0] == false){
            if(itemUSB != null)
                game.physics.arcade.collide(itemUSB.sprite, PC.sprite, USBOn, null, this);
        }
        if(itemDragOn[1] == false){
        if(itemKEY != null)
                game.physics.arcade.collide(itemKEY.sprite, Door.sprite, DoorOn, null, this);
        }
    //    textpanel.sprite.x = game.camera.x;
    //    textpanel.text.x = game.camera.x+600;
    //    textpanel.sprite.y = game.camera.y + 600;
    //    textpanel.text.y = game.camera.y + 680;

       //game.input.activePointer.leftButton.isDown
    //    if(player.talkKey.downDuration(25)&& lastTextTime+50 < game.time.now){
    //         lastTextTime = game.time.now;
    //         textpanel.destructor();
    //    }
    }
}
    game.state.add("Play", play);