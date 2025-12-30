class Obstacle {
    constructor(game, x, y) {
        this.game = game

        this.sizeOriginal = 48 * 1.5
        this.height = this.sizeOriginal * this.game.ratio
        this.width = this.sizeOriginal * this.game.ratio

        this.xOriginal = x
        this.x = this.xOriginal * this.game.ratio
        this.y = y

        this.resize()

        this.img = new Image()
        this.img.src = "src/assets/img/Block.svg"
    }
    resize() {
        this.height = this.sizeOriginal * this.game.ratio
        this.width = this.sizeOriginal * this.game.ratio

        this.x = this.xOriginal * this.game.ratio
    }
    getYPos(amount) {
       return (this.game.room.getGameCenter().y - this.sizeOriginal * this.game.ratio) - amount * this.sizeOriginal
    }
    draw() {
        this.x -= this.game.speed
        this.game.context.drawImage(this.img, this.x, this.getYPos(this.y), this.width, this.height)
    }
}