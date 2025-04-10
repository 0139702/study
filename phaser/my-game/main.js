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
  const block_width = 800;
  const block_count = 3;
  
  const game = new Phaser.Game(config);
  
  function preload() {
    this.load.image('player', './assets/player.png');
    this.load.image('bg1', './assets/bg1.png');
    this.load.image('bg2', './assets/bg2.png');
    this.load.image('bg3', './assets/bg3.png');
    //debug box 같은 이상한 초록 outline stroke 사각형 보임 -> b1, b1, b1으로 이미지 불러와서...
  }
  
  function create() {
    this.add.image(0, 0, 'bg1').setOrigin(0);
    this.add.image(800, 0, 'bg2').setOrigin(0);
    this.add.image(1600, 0, 'bg3').setOrigin(0);

    player = this.physics.add.sprite(400, 465, 'player');
    player.setScale(0.18);
    player.setSize(600, 1150);
    player.setCollideWorldBounds(true);

    this.cameras.main.setBounds(0, 0, 2400, 600);
    this.physics.world.setBounds(0, 0, 2400, 600);
    this.cameras.main.startFollow(player);

    cursors = this.input.keyboard.createCursorKeys();
    jumpKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    
    const graphics = this.add.graphics();
    graphics.fillStyle(0, 1);
    graphics.fillRect(0, 569, 2400, 50);
    ground = this.physics.add.staticGroup();

    // const ground0 = ground.create(400, 585, null)
    //   .setSize(1600, 30)
    //   .setDisplaySize(1600, 30)
    //   .setVisible(false)
    //   .refreshBody();
    
    for (let i = 0; i < block_count; i++) {
      const x = i * block_width + block_width / 2;
      ground.create(x, 585, null)
        .setSize(block_width, 30)
        .setDisplaySize(block_width, 30)
        .setVisible(false)
        .refreshBody();
    }
    this.physics.add.collider(player, ground); //ground0 영역만 인식해서 setCollidWorldBounds로 수정
  }
  
  function update() {
    player.setVelocity(0); //키보드를 안 눌렀을 때는 캐릭터 속도가 0이 되도록 default로 설정
  
    //player move LEFT-RIGHT
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

    //player move UP-DOWN
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

    if(Phaser.Input.Keyboard.JustDown(jumpKey) && player.body.onFloor()) { //cursors.up.isDown
      player.setVelocityY (-1000);
    }
  }
