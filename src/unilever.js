var cenaInicial = new Phaser.Scene('Jogo')

var config = {
    type: Phaser.AUTO,
    width: 640,
    height: 360,
    scene: cenaInicial,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300},
            debug: false
        }
    }
    
}

var jogo = new Phaser.Game(config)
var imagemFundo
var personagemPrototipo
var piso
var teclasMovimento

cenaInicial.preload = function() {
    this.load.image('bg', '../assets/bg-inicial.png')
    this.load.image('personagem', '../assets/personagem.png')
}

cenaInicial.create = function() {
    imagemFundo = this.add.image(320, 180, 'bg').setScale(0.55)
    personagemPrototipo = this.physics.add.sprite(320, 300, 'personagem').setScale(0.2)
    this.physics.world.setBounds(0, 0, config.width, 330)
    personagemPrototipo.setCollideWorldBounds(true)
    teclasMovimento = this.input.keyboard.addKeys({
        up: 'W',
        left: 'A',
        down: 'S',
        right: 'D'
    })
}

cenaInicial.update = function() {

    if (teclasMovimento.left.isDown) {
        personagemPrototipo.setVelocityX(-150)
    } else if (teclasMovimento.right.isDown) {
        personagemPrototipo.setVelocityX(150)
    } else {
        personagemPrototipo.setVelocityX(0)
    }

    if (teclasMovimento.up.isDown && personagemPrototipo.y >= 280) {
        personagemPrototipo.setVelocityY(-150);
    }
}