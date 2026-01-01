class Player {
    constructor(game) {
        this.game = game
        this.x = 0
        this.y = 0
        this.yBase = 0
        this.baseSize = 48 * 1.5
        this.height = this.baseSize * this.game.ratio
        this.width = this.baseSize * this.game.ratio
        this.img = new Image(); // Create new img element
        this.img.src = "src/assets/img/Player.svg"; // Set source path

        this.status

        this.collisionX
        this.collisionY
        this.collisionSize = this.width;

        this.ySpeed = 0
        window.addEventListener('keydown', (event) => {
            switch(event.code) {
                case 'Space':
                    this.jump()
                    break
                case 'Escape':
                    console.log('escape')
                    break
            }
        })
        window.addEventListener('mousedown', () => {
            this.jump()
        })
    }
    jump() {
        if(this.y === 0 || this.status === playerStatus.bottom) {
            this.ySpeed = 25 * this.game.ratio
        }
    }
    updateSize() {
        this.height = this.baseSize * this.game.ratio
        this.width = this.baseSize * this.game.ratio

        this.x = this.game.room.getGameCenter().x - this.width / 2
        this.yBase = this.game.room.getGameCenter().y - this.height - 1

        this.collisionX = this.x
        this.collisionY = this.yBase
        this.collisionSize = this.width;
    }
    setHeight() {
        if(this.y + this.ySpeed < 0) {
            this.y = 0    
        } else {
            this.y += this.ySpeed
        }
    }
    setSpeed() {
        if(this.y !== 0 && this.status !== playerStatus.bottom) {
            this.ySpeed -= 1 * this.game.ratio
        } else {
            this.ySpeed = 0
        }
    }
    adjustCollided() {
        if(!this.status) {
            return
        }

        if(this.status === playerStatus.right) {
            this.x -= this.game.speed
            this.collisionX = this.x
            return
        }
    }
    draw() {
        this.adjustCollided()
        this.setHeight()

        this.collisionY = (this.yBase - this.y) - (this.ySpeed - 1 * this.game.ratio)

        this.game.context.drawImage(this.img, this.x, this.yBase - this.y, this.height, this.width)

        this.setSpeed()
    }
}