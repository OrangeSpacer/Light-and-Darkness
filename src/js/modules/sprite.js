export class Sprite{
    constructor({position, imageSrc, scale = 1, framesMax = 1, offset = {x:0, y:0},canvasBlock,canvasView}){
        this.position = position
        this.height = 150
        this.width = 50
        this.image = new Image()
        this.image.src = imageSrc
        this.scale = scale
        this.framesMax = framesMax
        this.framesCurrent = 0
        this.framesElapsed = 0
        this.framesHold = 5
        this.offset = offset
        this.canvasBlock = canvasBlock
        this.canvasView = canvasView
    }

    draw(){
        this.canvasView.drawImage(this.image,this.framesCurrent * (this.image.width / this.framesMax), 0,this.image.width / this.framesMax,this.image.height,this.position.x-this.offset.x, this.position.y-this.offset.y, (this.image.width / this.framesMax) * this.scale, this.image.height * this.scale)
    }

    animateFrame(){
        this.framesElapsed++

        if(this.framesElapsed % this.framesHold === 0){
            if(this.framesCurrent < this.framesMax - 1){
                this.framesCurrent++
            }
            else{
                this.framesCurrent = 0
            }
        }
    }

    update(){
        this.draw()
        this.animateFrame()
    }
}

export class Fighter extends Sprite{
    constructor({position,velocity,color='green',imageSrc, scale = 1, framesMax = 1, offset = {x: 0,y: 0}, sprites, attackBox = {offset: {},width: undefined,height: undefined},canvasBlock,canvasView}){
        super({
            position,
            imageSrc,
            scale,
            framesMax,
            offset,
        })
        this.velocity = velocity
        this.height = 150
        this.width = 150
        this.lastKeys
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            offset: attackBox.offset,
            width: attackBox.width,
            height: attackBox.height, 
        },
        this.color = color,
        this.isAttack
        this.health = 100
        this.framesCurrent = 0
        this.framesElapsed = 0
        this.framesHold = 5
        this.sprites = sprites
        this.dead = false
        this.canvasBlock = canvasBlock
        this.canvasView = canvasView
        this.gravity = 0.4

        for(const sprite in this.sprites){
            sprites[sprite].image = new Image()
            sprites[sprite].image.src = sprites[sprite].imageSrc
        }

        console.log(this.sprites)
    }

    update(){
        this.draw()
        if(!this.dead){
            this.animateFrame()
            console.log(this.dead)
        }

        this.attackBox.position.x = this.position.x + this.attackBox.offset.x
        this.attackBox.position.y = this.position.y + this.attackBox.offset.y
        
        // this.canvasView.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)


        this.position.y += this.velocity.y
        this.position.x += this.velocity.x


        if(this.position.y < 0){
            this.velocity.y  = +1
        }

        if (this.position.y + this.velocity.y + this.height >= this.canvasBlock.height - 95){
            this.velocity.y  = 0
        }
        else{
            this.velocity.y += this.gravity
        }

        if(this.position.x < 0){
            this.position.x -= this.velocity.x
        }
        if (this.position.x >= 1024-this.width){
            this.position.x -= this.velocity.x
        }
    }

    attack(){
        this.isAttack = true
        this.swicthSprite('attack')

    }

    takeHit(){
        this.health -= 20

        if(this.health <= 0){
            this.swicthSprite('death')

        }
        else{
            this.swicthSprite('takeHit')
        }
    }

    swicthSprite(sprite){
        if(this.image === this.sprites.attack.image && this.framesCurrent < this.sprites.attack.framesMax - 1) return

        if(this.image === this.sprites.takeHit.image && this.framesCurrent < this.sprites.takeHit.framesMax - 1) return

        if(this.image === this.sprites.death.image){
            if(this.framesCurrent === this.sprites.death.framesMax -1){
                this.dead = true
            }
            return
        }


        switch(sprite){
            case 'idle':
                if (this.image !== this.sprites.idle.image){
                    this.image = this.sprites.idle.image
                    this.framesMax = this.sprites.idle.framesMax
                }
                break
            case 'run':
                if (this.image !== this.sprites.run.image){
                    this.image = this.sprites.run.image
                    this.framesMax = this.sprites.run.framesMax
                }
                break
            case 'jump':
                if (this.image !== this.sprites.run.image){
                    this.image = this.sprites.jump.image
                    this.framesMax = this.sprites.jump.framesMax
                }
                break
            case 'fall':
                if (this.image !== this.sprites.jump.image){
                    this.image = this.sprites.fall.image
                    this.framesMax = this.sprites.fall.framesMax
                }
                break
            case 'attack':
                if (this.image !== this.sprites.attack.image){
                    this.image = this.sprites.attack.image
                    this.framesMax = this.sprites.attack.framesMax
                    this.framesCurrent = 0
                }
                break
            case 'takeHit':
                if (this.image !== this.sprites.takeHit.image){
                    this.image = this.sprites.takeHit.image
                    this.framesMax = this.sprites.takeHit.framesMax
                    this.framesCurrent = 0
                }
                break
            case 'death':
                if (this.image !== this.sprites.death.image){
                    this.image = this.sprites.death.image
                    this.framesMax = this.sprites.death.framesMax
                    this.framesCurrent = 0
                }
                break
        }
    }
}



