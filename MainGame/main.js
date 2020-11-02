var press = "...Press Spacebar..."
var Main = {
    preload : function(){
        game.load.spritesheet("JUMP", "./assets/JUMP.png", 128, 256);
        game.load.spritesheet("SLIDE", "./assets/SLIDE.png", 50, 76);
        game.load.spritesheet("REROLL", "./assets/REROLL.png", 128, 256);
        game.load.spritesheet("player", "./assets/Hero.png", 44, 110);
        game.load.image("bg1", "./assets/background1.png");
        game.load.image("textPanel", "./assets/TEXTPANEL.png");
        game.load.image("ground", "./assets/Ground.png");
        game.load.image("normalBullet", "./assets/bullet.png");
        game.load.image("trackingBullet", "./assets/bullet2.png");
        game.load.image("button", "./assets/button.png");
        game.load.image("JUMP_UP", "./assets/JUMP_UP.png");
        game.load.image("Trap1", "./assets/Trap1.png");
        game.load.image("Trap2", "./assets/Trap2.png");
        game.load.image("Trap3", "./assets/Trap3.png");
        game.load.image("Trap4", "./assets/Trap4.png");
        game.load.image("NoCard", "./assets/NoCard.png");
        game.load.audio("bgm", "./assets/Ryugihak.mp3");
        //
        game.load.image("building1", "./assets/map/top.png");
        game.load.image("building2", "./assets/map/mid.png");
        game.load.image("building3", "./assets/map/mid_2.png");
        game.load.image("building4", "./assets/map/bot.png");
        //
        game.load.image("NPC1", "./assets/Gomacho.png");
        game.load.image("Table", "./assets/SitSitSit.png");
        game.load.image("PeopleSit", "./assets/People_Sit.png");
        game.load.spritesheet("Crow", "./assets/crow.png", 80, 78);
        game.load.image("Draw", "./assets/WhiteCenter.png");
    },
    create : function(){
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
        game.stage.backgroundColor = "#1c242e";
        this.start();
        let text = game.add.text(0 , 0, press);
    },
    start : function(){
        game.state.start("Play");
    }

}
game.state.add("Main", Main);
game.state.start("Main");