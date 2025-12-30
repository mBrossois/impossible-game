class Room {
    constructor(game) {
        this.game = game
        this.widthDefault = 19658 * 1.5
        this.heightDefault = 18 * 1.5
        this.floorX = 0
        this.currentFloor = 1;

        this.img = new Image(); // Create new img element
        this.img.src = "src/assets/img/Floor.svg"; // Set source path

        this.linePosYDefault = 80
        this.setGameSize()
        this.updateStart()
    }
    updateStart() {
        this.floorX = this.game.canvas.width / 2 - this.game.player.width
    }
    setGameSize() {
        this.width = this.widthDefault * this.game.ratio
        this.height = this.heightDefault * this.game.ratio
        this.y = this.game.canvas.height
        this.linePosY = this.y - (this.linePosYDefault * this.game.ratio)
    }
    getGameCenter() {
        return {x: this.game.canvas.width / 2, y: this.linePosY}
    }
    updateFloor() {
        this.floorX -= this.game.speed
    }
    draw() {
        this.game.context.drawImage(this.img, this.floorX, this.linePosY, this.width, this.height)
    }
}