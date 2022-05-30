export class Sprite{
    constructor({position,imageSrc,scale = 1,framesMax = 1, offset = {x: 0, y: 0},canvasView,canvasBlock}){
        this.canvasView = canvasView
        this.canvasBlock = canvasBlock
        this.scale = scale
        this.position = position
        this.height = 150
        this.width = 50
        this.image = new Image()
        this.image.src = imageSrc
        this.framesMax = framesMax
        this.framesCurrent = 0
        this.frameElapsed = 0
        this.framesHold = 5
        this.offset = offset
    }
    draw(){
        this.canvasView.drawImage(this.image,this.framesCurrent * (this.image.width / this.framesMax), 0,this.image.width / this.framesMax,this.image.height,this.position.x-this.offset.x, this.position.y - this.offset.y,(this.image.width / this.framesMax) * this.scale, this.image.height * this.scale)
        // this.canvasView.drawImage(this.image,this.framesCurrent * (this.image.width / this.framesMax), 0,this.image.width / this.framesMax,this.image.height,this.position.x-this.offset.x, this.position.y-this.offset.y, (this.image.width / this.framesMax) * this.scale, this.image.height * this.scale)
    }

    animateFrame(){
        this.frameElapsed++
        if(this.frameElapsed % this.framesHold === 0){
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
    constructor({position,velocity,sprites,color = 'blue',imageSrc, scale = 1,framesMax = 1, offset = {x: 0, y: 0}, attackBox = {offset: {}, width: undefined, height: undefined},canvasView,canvasBlock}){
        super({
            position,
            imageSrc,
            scale,
            framesMax,
            offset,
        })
        this.gravity = 0.2
        this.canvasBlock = canvasBlock
        this.canvasView = canvasView
        this.velocity = velocity
        this.color = color
        this.width = 50
        this.height = 150
        this.attackBox = {
            position:{
                x: this.position.x,
                y: this.position.y
            },
            offset: attackBox.offset,
            width: attackBox.width,
            height: attackBox.height
        }
        this.framesCurrent = 0
        this.frameElapsed = 0
        this.framesHold = 0
        this.dead = false
        this.sprites = sprites
        this.lastKey
        this.isAttack = false
        this.health = 100

        for(const sprite in sprites){
            sprites[sprite].image = new Image()
            sprites[sprite].image.src = sprites[sprite].imageSrc
        }
    }

    update(){
        this.draw()

        if(!this.dead){
            this.animateFrame()
        }
        
        this.attackBox.position.x = this.position.x + this.attackBox.offset.x
        this.attackBox.position.y = this.position.y + this.attackBox.offset.y

        this.canvasView.fillRect(this.attackBox.position.x, this.attackBox.position.y,this.attackBox.width,this.attackBox.height)
        
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        
        // for y postion
        if(this.position.y < 0){
            this.velocity.y  = +1
        }
        if(this.position.y + this.velocity.y + this.height >= this.canvasBlock.height){
            this.velocity.y = 0
        }
        else{
            this.velocity.y += this.gravity
        }
        // for x postion
        if(this.position.x < 0){
            this.position.x -= this.velocity.x
        }
        if (this.position.x >= 1024-this.width){
            this.position.x -= this.velocity.x
        }
    }

    attack(){
        this.isAttack = true
        setTimeout(() => {
            this.isAttack = false
        }, 100)
    }

    switchSprite(sprite){
        if(this.image === this.sprite.attack.image && this.framesCurrent < this.sprites.attack.framesMax - 1) return

        if(this.image === this.sprite.takeHit.image && this.framesCurrent < this.sprites.takeHit.framesMax - 1) return

        if(this.image === this.sprite.death.image){
            if(this.framesCurrent === this.sprites.death.framesMax - 1){
                this.dead = true
            }
            return
        }


        switch(sprite){
            case 'idle':
                if(this.image !== this.sprites.idle.image){
                    this.image = this.sprites.idle.image
                    this.framesMax = this.sprite.idle.framesMax
                }
                break
            case 'run':
                if(this.image !== this.sprites.run.image){
                    this.image = this.sprites.run.image
                    this.framesMax = this.sprite.run.framesMax
                }
                break
            case 'jump':
                if(this.image !== this.sprites.jump.image){
                    this.image = this.sprites.jump.image
                    this.framesMax = this.sprite.jump.framesMax
                }
                break
            case 'fall':
                if(this.image !== this.sprites.jump.image){
                    this.image = this.sprites.fall.image
                    this.framesMax = this.sprite.fall.framesMax
                }
                break
            case 'attack':
                if(this.image !== this.sprites.attack.image){
                    this.image = this.sprites.attack.image
                    this.framesMax = this.sprite.attack.framesMax
                    this.framesCurrent = 0
                }
                break
            case 'takeHit':
                if(this.image !== this.sprites.takeHit.image){
                    this.image = this.sprites.takeHit.image
                    this.framesMax = this.sprite.takeHit.framesMax
                    this.framesCurrent = 0
                }
                break
            case 'death':
                if(this.image !== this.sprites.death.image){
                    this.image = this.sprites.death.image
                    this.framesMax = this.sprite.death.framesMax
                    this.framesCurrent = 0
                }
                break
        }
    }
}