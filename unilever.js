// definição da cena que será usada durante o desenvolvimento do jogo
var cenaInicial = new Phaser.Scene('Jogo') 

// com o uso do framework phaser3, esse objeto é usado como definição inicial para as regras que serão seguidas no projeto 
var config = {
    type: Phaser.AUTO,
    width: 640,
    height: 360,
    scene: cenaInicial,
    physics: {
        // a escolha pelo sistema de física 'arcade' se deve pelo estilo de jogo escolhido. esse modelo de física fornece métodos simples como gravidade e colisão com outros objetos dentro do canvas
        default: 'arcade',
        arcade: {
            gravity: { y: 600},
            debug: false
        }
    }
    
}

// definição das variáveis utilizadas no MVP
var jogo = new Phaser.Game(config)
var imagemFundo
var personagemPrototipo
var piso
var teclasMovimento

// função preload do phaser3 para o carregamento dos assets utilizados
cenaInicial.preload = function() {
    this.load.image('bg', 'assets/bg-inicial.png')
    this.load.image('personagem', 'assets/personagem.png')
}

// função create do phaser3 para atribuição de propriedades a elementos carregados na função anterior e definição de regras para o estilo de jogo escolhido pelo grupo
cenaInicial.create = function() {

    // é atribuída à variável imagemFundo as propriedades de posição, imagem de fonte previamente estabelecida e a proporção em relação ao tamanho original da imagem escolhida
    imagemFundo = this.add.image(320, 180, 'bg').setScale(0.55)
    
    // é atribuída à variável personagemPrototipo propriedades de imagem e regras de física estabelecidas na variável 'config'
    personagemPrototipo = this.physics.add.sprite(320, 300, 'personagem').setScale(0.2)
    
    // é atribuída à variável personagemPrototipo a propriedade de colisão com outros objetos do mapa, para evitar situações como o personagem cair indefinidamente ou andar para fora do mapa
    personagemPrototipo.setCollideWorldBounds(true)

    // usamos essa propriedade para atribuir os limites do mundo que vai poder ser explorado. Nesse caso, o mapa começa no canto superior esquerdo, tem os limites laterais iguais ao tamanho do canvas e um limite vertical de 330 pixels
    this.physics.world.setBounds(0, 0, config.width, 330)

    // é atribuída uma correspondência para as teclas WASD do teclado para definir os moviementos do personagem no mapa
    teclasMovimento = this.input.keyboard.addKeys({
        up: 'W',
        left: 'A',
        down: 'S',
        right: 'D'
    })
}

// função update do phaser3 para atribuição de características de atualização recorrente. No caso, os movimentos do personagem de acordo com as teclas pressionadas pelo usuário
cenaInicial.update = function() {

    // função condicional para que, ao apertar a tecla 'A' e, ao mesmo tempo, o personagem estiver a uma altura igual ou maior que 280 pixel, o personagem se move para a esquerda. A segunda condicional foi adicionada para evitar que o personagem se movimente enquanto executa o movimento de pular. além disso, foi adicionada uma funcionalidade para que o personagem mude de lado de acordo com a direção de movimento com o atributo setFlip
    if (teclasMovimento.left.isDown && personagemPrototipo.y >= 280) {
        personagemPrototipo.setVelocityX(-150)
        personagemPrototipo.setFlip(true, false)

    // função condicional para que, ao apertar a tecla 'D' e, ao mesmo tempo, o personagem estiver a uma altura igual ou maior que 280 pixel, o personagem se move para a direita. A segunda condicional foi adicionada para evitar que o personagem se movimente enquanto executa o movimento de pular. além disso, foi adicionada uma funcionalidade para que o personagem mude de lado de acordo com a direção de movimento com o atributo setFlip
    } else if (teclasMovimento.right.isDown && personagemPrototipo.y >= 280) {
        personagemPrototipo.setVelocityX(150)
        personagemPrototipo.setFlip(false, false)

    // finalização da estrutura condicional para que o personagem não se mova caso o usuário não esteja pressionando nenhuma tecla    
    } else {
        personagemPrototipo.setVelocityX(0)
    }
    // função condicional para que, se a tecla 'W' for pressionada e, ao mesmo tempo, o personagem estiver a uma altura igual ou maior que 280 pixels no canvas, o personagem pule
    if (teclasMovimento.up.isDown && personagemPrototipo.y >= 280) {
        personagemPrototipo.setVelocityY(-150);
    }
}