const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#87ceeb',
    physics: {
      default: 'arcade',
      arcade: {
        gravity: {y: 0},
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
  let ground;
  
  const game = new Phaser.Game(config);
  
  function preload() {
    this.load.image('player', 'assets/player.png');
  }
  
  function create() {
    player = this.physics.add.sprite(400, 465, 'player');
    player.setScale(0.18);
    player.setSize(600, 1150);

    cursors = this.input.keyboard.createCursorKeys();
    
    const graphics = this.add.graphics();
    graphics.fillStyle(0x000000, 1);
    graphics.fillRect(0, 569, 800, 50);
    ground = this.physics.add.staticGroup();

    const ground0 = ground.create(400, 585, null)
    .setSize(50, 50)
    .setVisible(false)
    .refreshBody();

    this.physics.add.collider(player, ground);
  }
  
  function update() {
    player.setVelocity(0);
  
    if (cursors.left.isDown) {
      player.setVelocityX(-200);
    } else if (cursors.right.isDown) {
      player.setVelocityX(200);
    }
  
    if (cursors.up.isDown) {
      player.setVelocityY(-300);
    } else if (cursors.down.isDown) {
      player.setVelocityY(300);
    }
  }
