var End = {
  create: function() {
    let mainButton = game.add.button(
      600,
      game.world.height / 2,
      "button",
      this.goMain
    );
    let _score = game.add.text(
      600,
      game.world.height / 3,
      "score : " + Math.floor(score)
    );
  },
  goMain: function() {
    game.state.start("Main");
  }
};
game.state.add("End", End);
