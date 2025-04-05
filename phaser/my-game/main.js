const config = {
    type: Phaser.AUTO, // WebGL or Canvas 자동 선택
    width: 800,
    height: 600,
    backgroundColor: '#87ceeb',
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 0 },
        debug: false
      }
    },
    scene: {
      preload: preload,
      create: create,
      update: update
    }
  };
  
  let player;
  let cursors;
  
  // 게임 시작
  const game = new Phaser.Game(config);
  
  function preload() {
    this.load.image('player', 'assets/player.png');
  }
  
  function create() {
    player = this.physics.add.sprite(400, 420, 'player');
    player.setScale(0.18);
    cursors = this.input.keyboard.createCursorKeys();
  }
  
  function update() {
    player.setVelocity(0);
  
    if (cursors.left.isDown) {
      player.setVelocityX(-200);
    } else if (cursors.right.isDown) {
      player.setVelocityX(200);
    }
  
    if (cursors.up.isDown) {
      player.setVelocityY(-200);
    } else if (cursors.down.isDown) {
      player.setVelocityY(200);
    }
  }