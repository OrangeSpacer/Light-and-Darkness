import { enemyPlayer, personPlayer } from "./choisePerson.js"
import { personDraw } from "./PersonDraw.js"
import { Fighter, Sprite } from "./sprite.js"
import { winner } from "./win.js"

export const drawCanvas = () => {
    const nextBtn = document.querySelector('.btn__next')
    const gameBlock = document.querySelector('.game__content')

    console.log(personPlayer)
    nextBtn.addEventListener('click', () => {
        document.querySelector('.game').style.display='block'
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

        const shop = new Sprite({
            position: {
                x: 600,
                y: 135
            },
            imageSrc: '.././img/map/shop_anim.png',
            scale: 2.7,
            framesMax: 6,
            canvasBlock: canvasBlock,
            canvasView: canvasView
        })

        const player = new Fighter({
            position:{
                x: personDraw[`${personPlayer}`].position.x,
                y: personDraw[`${personPlayer}`].position.y,
            },
            velocity:{
                x: personDraw[`${personPlayer}`].velocity.x,
                y: personDraw[`${personPlayer}`].velocity.x
            },
            offset: {
                x: 20,
                y: 100
            },
            imageSrc: personDraw[`${personPlayer}`].imageSrc,
            framesMax: personDraw[`${personPlayer}`].framesMax,
            scale: personDraw[`${personPlayer}`].scale,
            offset: {
                x: personDraw[`${personPlayer}`].offset.x,
                y:  personDraw[`${personPlayer}`].offset.y
            },
            sprites: {
                idle: {
                    imageSrc : personDraw[`${personPlayer}`].sprites.idle.imageSrc,
                    framesMax: personDraw[`${personPlayer}`].sprites.idle.framesMax,
                },
                run: {
                    imageSrc: personDraw[`${personPlayer}`].sprites.run.imageSrc,
                    framesMax: personDraw[`${personPlayer}`].sprites.run.framesMax,
                },
                jump: {
                    imageSrc: personDraw[`${personPlayer}`].sprites.jump.imageSrc,
                    framesMax: personDraw[`${personPlayer}`].sprites.jump.framesMax,
                },
                fall: {
                    imageSrc: personDraw[`${personPlayer}`].sprites.fall.imageSrc,
                    framesMax: personDraw[`${personPlayer}`].sprites.fall.framesMax,
                },
                attack:{
                    imageSrc: personDraw[`${personPlayer}`].sprites.attack.imageSrc,
                    framesMax: personDraw[`${personPlayer}`].sprites.attack.framesMax,
                },
                takeHit:{
                    imageSrc: personDraw[`${personPlayer}`].sprites.takeHit.imageSrc,
                    framesMax: personDraw[`${personPlayer}`].sprites.takeHit.framesMax,
                },
                death:{
                    imageSrc: personDraw[`${personPlayer}`].sprites.death.imageSrc,
                    framesMax: personDraw[`${personPlayer}`].sprites.death.framesMax,
                },
            },
            attackBox: {
                offset: {
                    x: personDraw[`${personPlayer}`].attackBox.offset.x,
                    y: personDraw[`${personPlayer}`].attackBox.offset.y
                },
                width: personDraw[`${personPlayer}`].attackBox.width,
                height: personDraw[`${personPlayer}`].attackBox.height
            },
            canvasView: canvasView,
            canvasBlock: canvasBlock
        })
        const enemy = new Fighter({
            position:{
                x: personDraw[`${enemyPlayer}`].position.x,
                y: personDraw[`${enemyPlayer}`].position.y,
            },
            velocity:{
                x: personDraw[`${enemyPlayer}`].velocity.x,
                y: personDraw[`${enemyPlayer}`].velocity.x
            },
            offset: {
                x: 20,
                y: 100
            },
            imageSrc: personDraw[`${enemyPlayer}`].imageSrc,
            framesMax: personDraw[`${enemyPlayer}`].framesMax,
            scale: personDraw[`${enemyPlayer}`].scale,
            offset: {
                x: personDraw[`${enemyPlayer}`].offset.x,
                y:  personDraw[`${enemyPlayer}`].offset.y
            },
            sprites: {
                idle: {
                    imageSrc : personDraw[`${enemyPlayer}`].sprites.idle.imageSrc,
                    framesMax: personDraw[`${enemyPlayer}`].sprites.idle.framesMax,
                },
                run: {
                    imageSrc: personDraw[`${enemyPlayer}`].sprites.run.imageSrc,
                    framesMax: personDraw[`${enemyPlayer}`].sprites.run.framesMax,
                },
                jump: {
                    imageSrc: personDraw[`${enemyPlayer}`].sprites.jump.imageSrc,
                    framesMax: personDraw[`${enemyPlayer}`].sprites.jump.framesMax,
                },
                fall: {
                    imageSrc: personDraw[`${enemyPlayer}`].sprites.fall.imageSrc,
                    framesMax: personDraw[`${enemyPlayer}`].sprites.fall.framesMax,
                },
                attack:{
                    imageSrc: personDraw[`${enemyPlayer}`].sprites.attack.imageSrc,
                    framesMax: personDraw[`${enemyPlayer}`].sprites.attack.framesMax,
                },
                takeHit:{
                    imageSrc: personDraw[`${enemyPlayer}`].sprites.takeHit.imageSrc,
                    framesMax: personDraw[`${enemyPlayer}`].sprites.takeHit.framesMax,
                },
                death:{
                    imageSrc: personDraw[`${enemyPlayer}`].sprites.death.imageSrc,
                    framesMax: personDraw[`${enemyPlayer}`].sprites.death.framesMax,
                },
            },
            attackBox: {
                offset: {
                    x: personDraw[`${enemyPlayer}`].attackBox.offset.x,
                    y: personDraw[`${enemyPlayer}`].attackBox.offset.y
                },
                width: personDraw[`${enemyPlayer}`].attackBox.width,
                height: personDraw[`${enemyPlayer}`].attackBox.height
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

        
        let timer = 20
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
            shop.update()
            player.update()
            enemy.update()

            player.velocity.x = 0
            enemy.velocity.x = 0
            // player
            if(!player.dead){
                player.swicthSprite('idle')
                if(keys.d.pressed && player.lastKey === 'd'){
                    player.velocity.x = 5
                    player.swicthSprite('run')
                }
                if(keys.a.pressed && player.lastKey === 'a'){
                    player.velocity.x = -5
                    player.swicthSprite('run')
                }
                if(collisonAttack({rectangle1: player, rectangle2: enemy}) && player.isAttack && player.framesCurrent === 4){
                    player.isAttack = false
                    enemy.takeHit()
                    document.querySelector('#player2').style.width = enemy.health + '%'
                }

                
                if(player.velocity.y < 0){
                    player.swicthSprite('jump')
                }
                if(player.velocity.y > 0){
                    player.swicthSprite('fall')
                }

                
                if(player.isAttack && player.framesCurrent === 4){
                    player.isAttack = false
                }
            }
            // enemy
            if(!enemy.dead){
                enemy.swicthSprite('idle')
                if(keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft'){
                    enemy.velocity.x = -5
                    enemy.swicthSprite('run')
                }
                
                if(keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight'){
                    enemy.velocity.x = 5
                    enemy.swicthSprite('run')
                }

                
                if(collisonAttack({rectangle1: enemy, rectangle2: player}) && enemy.isAttack && enemy.framesCurrent === 4){
                    enemy.isAttack = false
                    player.takeHit()
                    console.log('Attack 2')
                    document.querySelector('#player1').style.width = player.health + '%'
                }

                if(enemy.isAttack && enemy.framesCurrent === 4){
                    enemy.isAttack = false
                }
                
                if(enemy.velocity.y < 0){
                    enemy.swicthSprite('jump')
                }
                if(enemy.velocity.y > 0){
                    enemy.swicthSprite('fall')
                }
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
            switch(e.key){
                // player
                case 'd':
                    keys.d.pressed = false
                    break
                case 'a':
                    keys.a.pressed = false
                    break
                case 'w':
                    keys.w.pressed = false
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
