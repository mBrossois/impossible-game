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
        if(this.y === 0) {
            this.ySpeed = 25 * this.game.ratio
        }
    }
    updateSize() {
        this.height = this.baseSize * this.game.ratio
        this.width = this.baseSize * this.game.ratio

        this.x = this.game.room.getGameCenter().x - this.width / 2
        this.yBase = this.game.room.getGameCenter().y - this.height - 1
    }
    setHeight() {
        if(this.y + this.ySpeed < 0) {
            this.y = 0    
        } else {
            this.y += this.ySpeed
        }
    }
    setSpeed() {
        if(this.y !== 0) {
            this.ySpeed -= 1 * this.game.ratio
        } else {
            this.ySpeed = 0
        }
    }
    draw() {
       this.setHeight()

        this.game.context.drawImage(this.img, this.x, this.yBase - this.y, this.height, this.width)

        this.setSpeed()
    }
}