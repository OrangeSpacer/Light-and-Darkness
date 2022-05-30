import { Fighter, Sprite } from "./sprite.js"
import { winner } from "./win.js"

export const drawCanvas = () => {
    const nextBtn = document.querySelector('.btn__next')
    const gameBlock = document.querySelector('.game__content')

    nextBtn.addEventListener('click', () => {
        gameBlock.style.display = 'inline-block'
        const canvasBlock = document.querySelector('canvas')
        const canvasView = canvasBlock.getContext('2d')


        canvasBlock.width = 1024
        canvasBlock.height = 576

        canvasView.fillRect(0, 0, canvasBlock.width, canvasBlock.height)


        const background = new Sprite({
            position: {
                x: 0,
                y: 0
            },
            imageSrc: '.././img/map/background.png',
            canvasBlock: canvasBlock,
            canvasView: canvasView
        })

        const player = new Fighter({
            position:{
                x: 0,
                y: 100
            },
            velocity:{
                x: 5,
                y: 1
            },
            offset: {
                x: -50,
                y: 0
            },
            color: 'blue',
            imageSrc: '.././img/person/Hero1/Idle.png',
            framesMax: 10,
            scale: 2.65,
            offset: {
                x: 215,
                y: 115
            },
            sprites: {
                idle: {
                    imageSrc : '.././img/person/Hero1//Idle.png',
                    framesMax: 10,
                },
                run: {
                    imageSrc: '.././img/person/Hero1//Run.png',
                    framesMax: 8,
                },
                jump: {
                    imageSrc: '.././img/person/Hero1/Jump.png',
                    framesMax: 3,
                },
                fall: {
                    imageSrc: '.././img/person/Hero1/Fall.png',
                    framesMax: 3,
                },
                attack:{
                    imageSrc: '.././img/person/Hero1/Attack1.png',
                    framesMax: 7,
                },
                takeHit:{
                    imageSrc: '.././img/person/Hero1/Take Hit.png',
                    framesMax: 3,
                },
                death:{
                    imageSrc: '.././img/person/Hero1/Death.png',
                    framesMax: 7,
                }
            },
            canvasView: canvasView,
            canvasBlock: canvasBlock
        })
        const enemy = new Fighter({
            position:{
                x: 400,
                y: 100
            },
            velocity:{
                x: 5,
                y: 1
            },
            offset: {
                x: 20,
                y: 0
            },
            color: 'blue',
            imageSrc: '.././img/person/Hero2/idle.png',
            framesMax: 6,
            scale: 1.6,
            offset: {
                x: 100,
                y: 35
            },
            sprites: {
                idle: {
                    imageSrc : '.././img/person/Hero2/idle.png',
                    framesMax: 6,
                },
                run: {
                    imageSrc: '.././img/person/Hero2/Run.png',
                    framesMax: 8,
                },
                jump: {
                    imageSrc: '.././img/person/Hero2/Jump.png',
                    framesMax: 2,
                },
                fall: {
                    imageSrc: '.././img/person/Hero2/Fall.png',
                    framesMax: 2,
                },
                attack:{
                    imageSrc: '.././img/person/Hero2/Attack1.png',
                    framesMax: 6,
                },
                takeHit:{
                    imageSrc: '.././img/person/Hero2/Hit.png',
                    framesMax: 4,
                },
                death:{
                    imageSrc: '.././img/person/Hero2/Death.png',
                    framesMax: 11,
                },
            },
            attackBox: {
                offset: {
                    x: -70,
                    y: 0
                },
                width: 100,
                height: 50
            },
            canvasView: canvasView,
            canvasBlock: canvasBlock
        })
        

        const keys = {
            d:{
                pressed: false
            },
            a:{
                pressed: false
            },
            w:{
                pressed: false
            },
            'ArrowRight':{
                pressed: false
            },
            'ArrowLeft':{
                pressed: false
            },
            'Enter':{
                pressed: false
            }
        }

        function collisonAttack({rectangle1,rectangle2}){
            return(
                rectangle1.attackBox.position.x + rectangle1.attackBox.width >= rectangle2.position.x && rectangle1.attackBox.position.x <= rectangle2.position.x + rectangle2.width && rectangle1.attackBox.position.y + rectangle1.attackBox.height >= rectangle2.position.y && rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height && rectangle1.isAttack 
            )
        }

        
        let timer = 10
        let timerID


        function timeGame(){
            const timeBlock = document.querySelector('.game__timer')
            if (timer > 0){
                timer--
                timerID = setTimeout(timeGame,1000)
                timeBlock.innerHTML = timer
                console.log(timer)
            }
            if(timer == 0){
                winner(player,enemy,timerID)
            }
        }

        timeGame()
    


        function animate(){
            window.requestAnimationFrame(animate)
            canvasView.fillStyle = 'black'
            canvasView.fillRect(0, 0, canvasBlock.width, canvasBlock.height)

            background.update()
            player.update()
            enemy.update()

            player.velocity.x = 0
            enemy.velocity.x = 0
            // player
            if(keys.d.pressed && player.lastKey === 'd'){
                player.velocity.x = 5
            }
            if(keys.a.pressed && player.lastKey === 'a'){
                player.velocity.x = -5
            }
            if(collisonAttack({rectangle1: player, rectangle2: enemy}) && player.isAttack){
                player.isAttack = false
                enemy.health -= 20
                document.querySelector('#player2').style.width = enemy.health + '%'
            }
            // enemy
            if(keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft'){
                enemy.velocity.x = -5
            }
            
            if(keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight'){
                enemy.velocity.x = 5
            }
            
            if(collisonAttack({rectangle1: enemy, rectangle2: player}) && enemy.isAttack){
                enemy.isAttack = false
                player.health -= 20
                document.querySelector('#player1').style.width = player.health + '%'
            }


            if(player.health == 0 || enemy.health == 0){
                winner(player,enemy,timerID)
            }

        }
        animate()

        window.addEventListener('keydown', (e) => {
            console.log(e.key)
            switch(e.key){
                // player
                case 'd':
                    keys.d.pressed = true
                    player.lastKey = 'd'
                    break
                case 'a':
                    keys.a.pressed = true
                    player.lastKey = 'a'
                    break
                case 'w':
                    player.velocity.y = -8
                    break
                case ' ':
                    player.attack()
                    break
                // enemy
                case 'ArrowLeft':
                    enemy.lastKey = 'ArrowLeft'
                    keys.ArrowLeft.pressed = true
                    break
                case 'ArrowRight':
                    enemy.lastKey = 'ArrowRight'
                    keys.ArrowRight.pressed = true
                    break
                case 'Enter':
                    enemy.velocity.y = -8
                    break
                case '/':
                    enemy.attack()
                    break
            }
        })

        window.addEventListener('keyup', (e) => {
            console.log(e.eky)
            switch(e.key){
                // player
                case 'd':
                    keys.d.pressed = false
                    break
                case 'a':
                    keys.a.pressed = false
                    break
                // enemy
                case 'ArrowLeft':
                    keys.ArrowLeft.pressed = false
                    break
                case 'ArrowRight':
                    keys.ArrowRight.pressed = false
                    break
            }
        })
    })
}
