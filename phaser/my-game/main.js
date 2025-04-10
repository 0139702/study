const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#87ceeb',
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 1500 },
        debug: true
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
  let jumpKey;
  let ground;
  let gameSettings = {
    playerSpeed: 200,
  }
  
  const game = new Phaser.Game(config);
  
  function preload() {
    this.load.image('player', './assets/player.png');
  }
  
  function create() {
    player = this.physics.add.sprite(400, 465, 'player');
    player.setScale(0.18);
    player.setSize(600, 1150);

    cursors = this.input.keyboard.createCursorKeys();
    jumpKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    
    const graphics = this.add.graphics();
    graphics.fillStyle(0x000000, 1);
    graphics.fillRect(0, 569, 800, 50);
    ground = this.physics.add.staticGroup();

    const ground0 = ground.create(400, 585, null)
      .setSize(800, 30)
      .setVisible(false)
      // .refreshBody();

    this.physics.add.collider(player, ground); //ground0 영역만 인식해서 setCollidWorldBounds로 수정
  }
  
  function update() {
    player.setVelocity(0); //키보드를 안 눌렀을 때는 캐릭터 속도가 0이 되도록 default로 설정
  
    if (cursors.left.isDown) {
      player.setVelocityX(-gameSettings.playerSpeed);
    } else if (cursors.right.isDown) {
      player.setVelocityX(gameSettings.playerSpeed);
    }
  
    if (cursors.up.isDown) {
      player.setVelocityY(-gameSettings.playerSpeed);
    } else if (cursors.down.isDown) {
      player.setVelocityY(gameSettings.playerSpeed);
    }

    // if(cursors.left.isUp && cursors.right.isUp) {
    //   player.setFrame(0);
    //   // player.setVelocityX(0);
    // }

    player.setCollideWorldBounds(true); //this.player 때문에 오류(지역변수처럼 사용하려고 해서)

    if(player.body.velocity.x > 0) { //방향키에 따라 캐릭터 뒤집기
        player.setFlipX(true);
    } else if (player.body.velocity.x < 0) {
        player.setFlipX(false);
    }

    if(Phaser.Input.Keyboard.JustDown(jumpKey) && player.body.onFloor()) { //cursors.up.isDown && player.body.onFloor()
      player.setVelocityY (-800);
    }
  }
