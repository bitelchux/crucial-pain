CrucialPain.Level = (game) ->

CrucialPain.Level.prototype =
    create: ->
        game.mode = 'level'
        game.physics.startSystem Phaser.Physics.ARCADE
        game.stage.setBackgroundColor '#000000'
        @stateChange = false

        @wall1 = game.wall1 = new Wall()

        game.puck = new Puck()


        game.state.states.Default.create()
        game.ui.blank.fadeFrom()
    update: ->
        that = this
        game.state.states.Default.update()
        if @stateChange
            @stateChange()

        @wall1.update()

        game.puck.update()
    render: ->
        # game.debug.body @wall1.sprite