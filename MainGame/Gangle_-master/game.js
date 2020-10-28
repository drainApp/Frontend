var game = new Phaser.Game(1200, 800, Phaser.CANVAS, "GameDiv");
var text;
var score;
var scoreText;

class Player {
    constructor(){
        this.setBG = 0;
        this.sprite = game.add.sprite(800, 1900, "player"); 
        this.sprite.anchor.setTo(0.5, 0.5);
        game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
        this.key = game.input.keyboard.createCursorKeys();
        this.jumpKey = game.input.keyboard.addKey(Phaser.Keyboard.X);
        this.talkKey = game.input.keyboard.addKey(Phaser.Keyboard.Z);
        this.sprite.animations.add('move', [0, 1, 2], 7, true);
        this.moveSpeed= 200;
        this.jumpSpeed= -350;
        this.isJumping = false;
        this.sprite.body.gravity.y = 300;
        this.sprite.body.collideWorldBounds = true;
    }
    update() {
        
        score+=0.1;
    }
}
class Crow{
    constructor(x, y){
        this.sprite = game.add.sprite(x, y, "Crow"); 
        this.sprite.anchor.setTo(0.5, 0.5);
        game.physics.arcade.enable(this.sprite);
        this.sprite.animations.add('move', [0, 1], 7, true);
        this.sprite.animations.play('move');
    }
}
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
var textMessage = new Array( 
  "(어렸을 적, 그는 그림을 그리고 싶었다.)" //0
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

var npc1;
var h0;
var lastTextTime = 0;
var lastJumpTime = 0;
var textpanel;
var cardTime;
var cardTimeOn = false;
var cardDestroyAble = true;
var player;
var bullets = [];
var system;
var canTalk = false;
let platforms;
var music;
var canSlide = true;
var canJump = true;
let cards = [4];
var canInput = true;
var firstJumpPower;
var secondJumpPower;
let jumpButton;
let slideButton;
let rerollButton;
let trash;
let npc;
var stopTime;
let random3;
var play = {
    create : function(){
        game.physics.startSystem(Phaser.Physics.ARCADE);
        stopTime = game.time.now;
        canJump = true;
        trash = game.add.group();
        platforms = game.add.group();
        npc = game.add.group();
        
        platforms.enableBody = true;
        let ground = platforms.create(0, 2818, 'ground');
        ground.body.immovable = true;
        ground.scale.setTo(200, 2);
    
        // game.scale.pageAlignHorizontally = true;
        // game.scale.pageAlignVertically = true;
        game.stage.backgroundColor = "#1c242e";
        game.world.setBounds(0, 0, 222222, 4000);
        trash.create(334, 1806, 'building3');
        let h1= platforms.create(100, 200, 'building1');
        let h2= platforms.create(100, 1806, 'building2');
        let  h0= platforms.create(100, 2060, 'building4');
        // game.physics.enable(platforms, Phaser.Physics.ARCADE);
        // h0.body.collideWorldBounds = true;
        // h1.body.collideWorldBounds = true;
        // h2.body.collideWorldBounds = true;
        h0.body.immovable = true;
        h1.body.immovable = true;
        h2.body.immovable = true;
        npc.create(450, 1974, 'Table');
        npc.create(600, 1978, 'PeopleSit');
        npc.create(750, 1978, 'PeopleSit');
        npc.create(900, 1974, 'NPC1');
        npc.create(1050, 1978, 'PeopleSit');
        new Crow(1650, 2000);
        new Crow(1850, 2200);
        game.physics.enable(npc, Phaser.Physics.ARCADE);
        for(let i = 0; i< npc.length ; i++){
            npc.children[i].body.immovable = true;
            npc.children[i].body.checkCollision.right = false;
            npc.children[i].body.checkCollision.left = false;
            npc.children[i].body.checkCollision.down = false;
            npc.children[i].body.checkCollision.up = false;
        }
        npc.enableBody = true;
        player = new Player();
        textpanel = new TextPanel(0);
        player.sprite.animations.play('move');
        game.camera.follow(player.sprite);
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
       player.update();
       textpanel.sprite.x = game.camera.x;
       textpanel.text.x = game.camera.x+600;
       textpanel.sprite.y = game.camera.y + 600;
       textpanel.text.y = game.camera.y + 680;
       if(textpanel.text.text == ""){
        if(player.key.right.isDown ){
           player.sprite.body.velocity.x = player.moveSpeed;
           player.sprite.scale.setTo(-1, 1);
        }
        else if(player.key.left.isDown){
            player.sprite.body.velocity.x = -player.moveSpeed;
            player.sprite.scale.setTo(1, 1);
            }
        else{
            player.sprite.body.velocity.x = 0;
        }
        }

        if(player.jumpKey.isDown ){
            console.log("JUMP");
            player.sprite.body.y -= 5;
            player.sprite.body.velocity.y = -400;
            
            }
       //game.input.activePointer.leftButton.isDown
       if(player.talkKey.downDuration(25)&& lastTextTime+50 < game.time.now){
            lastTextTime = game.time.now;
            textpanel.destructor();
       }
    //    if(player.sprite.x > 1350 && player.sprite.body.velocity.x > 0)
    //         player.sprite.body.velocity.x = 0;
       game.physics.arcade.collide(player.sprite, platforms);
       game.physics.arcade.collide(player.sprite, npc, Npc1Collision, null, this);
    }
}
    game.state.add("Play", play);