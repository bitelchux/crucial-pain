Controls = ->
    @up = false
    @down = false
    @left = false
    @right = false
    @esc = false
    @f = false
    @e = false
    @primary = false
    @newPrimary = false
    @previousPrimary = false
    @x = 0
    @y = 0
    @worldX = 0
    @worldY = 0
    @cursors = {}
    @mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test navigator.userAgent
    this

Controls::create = ->
    @cursors.up = game.input.keyboard.addKey(Phaser.Keyboard.W)
    @cursors.left = game.input.keyboard.addKey(Phaser.Keyboard.A)
    @cursors.down = game.input.keyboard.addKey(Phaser.Keyboard.S)
    @cursors.right = game.input.keyboard.addKey(Phaser.Keyboard.D)
    @shift = game.input.keyboard.addKey(Phaser.Keyboard.SHIFT)
    @esc = game.input.keyboard.addKey(Phaser.Keyboard.ESC)
    @f = game.input.keyboard.addKey(Phaser.Keyboard.F)
    @e = game.input.keyboard.addKey(Phaser.Keyboard.E)
    this

Controls::update = ->
    @previousPrimary = @primary
    @primary = game.input.activePointer.isDown
    @newPrimary = false
    @newSecondary = false
    @newPrimary = true if @primary and not @previousPrimary
    @newSecondary = true if @secondary and not @previousSecondary
    @worldX = game.input.activePointer.worldX
    @worldY = game.input.activePointer.worldY
    @x = game.input.activePointer.x
    @y = game.input.activePointer.y
    @up = @cursors.up.isDown
    @down = @cursors.down.isDown
    @left = @cursors.left.isDown
    @right = @cursors.right.isDown
    this