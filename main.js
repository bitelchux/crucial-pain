/*! CrucialPain - v0.0.1 - 2015-04-01
* http://outofscope-dev.com/
* Copyright (c) 2015 Jan Geselle */
var Bats,Blank,Box,Character,Controls,Crosshair,FPS,FoeView,Helpers,PauseMenu,PreloadBar,Skeletons,Slimes,StatusInfo,TextBox,TinyRPG,game,params;Helpers={GetRandom:function(a,b){return~~(Math.random()*(b-a))+a},GetDirectionFromVelocity:function(a,b){var c,d,e,f,g;return e=a.body.velocity,d=void 0,c=void 0,f=e.x,g=e.y,0===f&&(c="none"),f>0&&(c="Right"),0>f&&(c="Left"),0===g&&(d="none"),g>0&&(d="Down"),0>g&&(d="Up"),"none"===c&&"none"===d?"standDown":(f=Math.abs(f),g=Math.abs(g),f>g?c=b>f?"stand"+c:"walk"+c:d=b>g?"stand"+d:"walk"+d)}},Controls=function(){return this.up=!1,this.down=!1,this.left=!1,this.right=!1,this.esc=!1,this.f=!1,this.e=!1,this.primary=!1,this.secondary=!1,this.x=0,this.y=0,this.worldX=0,this.worldY=0,this.cursors={},this.formerMouse=-1,this.mobile=/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),this},Controls.prototype.create=function(){return this.cursors.up=game.input.keyboard.addKey(Phaser.Keyboard.W),this.cursors.left=game.input.keyboard.addKey(Phaser.Keyboard.A),this.cursors.down=game.input.keyboard.addKey(Phaser.Keyboard.S),this.cursors.right=game.input.keyboard.addKey(Phaser.Keyboard.D),this.shift=game.input.keyboard.addKey(Phaser.Keyboard.SHIFT),this.esc=game.input.keyboard.addKey(Phaser.Keyboard.ESC),this.f=game.input.keyboard.addKey(Phaser.Keyboard.F),this.e=game.input.keyboard.addKey(Phaser.Keyboard.E),this},Controls.prototype.update=function(){return(-1!==game.input.mouse.button||this.fomerMouse>-1)&&(game.input.mouse.button<0&&0===this.fomerMouse?this.primary=!1:game.input.mouse.button<0&&2===this.fomerMouse?this.secondary=!1:0===game.input.mouse.button&&this.fomerMouse!==game.input.mouse.button?(this.secondary=!1,this.primary=!0):2===game.input.mouse.button&&this.fomerMouse!==game.input.mouse.button&&(this.primary=!1,this.secondary=!0),this.fomerMouse=game.input.mouse.button),this.worldX=game.input.activePointer.worldX,this.worldY=game.input.activePointer.worldY,this.x=game.input.activePointer.x,this.y=game.input.activePointer.y,this.up=this.cursors.up.isDown,this.down=this.cursors.down.isDown,this.left=this.cursors.left.isDown,this.right=this.cursors.right.isDown,this},Blank=function(){function a(a){var b,c,d,e;null==a&&(a={}),e=null!=(b=a.visible)?b:!1,this.color=null!=(c=a.color)?c:"#000000",this.speed=null!=(d=a.speed)?d:400,this.width=game.camera.width,this.height=game.camera.height,this.x=0,this.y=0,this.sprite=this.createSprite(),this.sprite.visible=e,this.sprite.alpha=e?1:0}return a.prototype.createBitmapData=function(){var a;return a=game.add.bitmapData(this.width,this.height),a.context.fillStyle=this.color,a.context.fillRect(0,0,this.width,this.height),a},a.prototype.createSprite=function(){var a;return a=game.add.sprite(0,0,this.createBitmapData()),a.fixedToCamera=!0,a.cameraOffset.x=this.x,a.cameraOffset.y=this.y,a},a.prototype.isFading=function(){var a;return 0<(a=this.sprite.alpha)&&1>a},a.prototype.show=function(){return this.isFading()?void 0:(this.sprite.alpha=1,this.sprite.visible=!0)},a.prototype.hide=function(){return this.isFading()?void 0:(this.sprite.alpha=0,this.sprite.visible=!1)},a.prototype.fadeTo=function(a){var b;if(0===this.sprite.alpha)return this.sprite.bringToTop(),this.sprite.visible=!0,b=game.add.tween(this.sprite),b.to({alpha:1},this.speed),a&&b.onComplete.add(a,this),b.start(),this},a.prototype.fadeFrom=function(a){var b;if(1===this.sprite.alpha)return b=game.add.tween(this.sprite),b.to({alpha:0},this.speed),b.onComplete.add(function(){return this.sprite.visible=!1,a?a():void 0},this),b.start(),this},a}(),Box=function(){function a(a){var b,c,d,e,f,g;null==a&&(a={}),this.color=null!=(b=a.color)?b:"#597dce",this.width=null!=(c=a.width)?c:16,this.height=null!=(d=a.height)?d:16,this.x=null!=(e=a.x)?e:0,this.y=null!=(f=a.y)?f:0,this.scale=null!=(g=a.scale)?g:4,this.asset="boxborder",this.sprite=this.createSprite()}return a.prototype.createCorners=function(){return{topLeft:new Phaser.Rectangle(0,0,5,5),topRight:new Phaser.Rectangle(4,0,5,5),bottomRight:new Phaser.Rectangle(4,4,5,5),bottomLeft:new Phaser.Rectangle(0,4,5,5)}},a.prototype.renderBackground=function(a){return a.context.fillRect(5,5,this.width-10,this.height-10),a},a.prototype.renderCorners=function(a){var b;return b=this.createCorners(),a.copyRect(this.asset,b.topLeft,0,0),a.copyRect(this.asset,b.topRight,this.width-5,0),a.copyRect(this.asset,b.bottomRight,this.width-5,this.height-5),a.copyRect(this.asset,b.bottomLeft,0,this.height-5),a},a.prototype.renderBorders=function(a){return a.copy(this.asset,4,0,1,5,5,0,this.width-10,5),a.copy(this.asset,4,4,1,5,5,this.height-5,this.width-10,5),a.copy(this.asset,0,4,5,1,0,5,5,this.height-10),a.copy(this.asset,4,4,5,1,this.width-5,5,5,this.height-10),a},a.prototype.createBitmapData=function(){var a;return a=game.add.bitmapData(this.width,this.height),a.context.fillStyle=this.color,this.renderBackground(a),this.renderCorners(a),this.renderBorders(a),a},a.prototype.createSprite=function(){var a,b;return a=this.createBitmapData(),b=game.add.sprite(0,0,a),b.scale.setTo(this.scale),b.fixedToCamera=!0,b.cameraOffset.x=this.x,b.cameraOffset.y=this.y,b},a}(),StatusInfo=function(){function a(a){null==a&&(a={}),this.scale=4,this.background=this.createBackground(),this.createBars(),this.currentWeapon=this.createCurrentWeapon()}return a.prototype.barData={health:{color:"#D04648",x:39,y:155},mana:{color:"#597DCE",x:111,y:155},xp:{color:"#6CAA2C",x:183,y:155}},a.prototype.createBackground=function(){var a;return a=game.add.sprite(0,0,"statusinfo"),a.scale.setTo(this.scale),a.fixedToCamera=!0,a.cameraOffset.x=0,a.cameraOffset.y=game.camera.height-a.height,a.visible=!1,a},a.prototype.createCurrentWeapon=function(){var a;return a=game.add.sprite(0,0,"tiny16"),a.fixedToCamera=!0,a.cameraOffset.x=2*this.scale,a.cameraOffset.y=142*this.scale,a.visible=!0,a},a.prototype.createBarBitmapData=function(a,b,c){var d;return d=game.add.bitmapData(b,c),d.context.fillStyle=a,d.context.fillRect(0,0,b,c),d},a.prototype.createBar=function(a,b,c,d){var e;return e=this[a+"bar"]=game.add.sprite(0,0,this.createBarBitmapData(b,50,3)),e.scale.setTo(this.scale),e.fixedToCamera=!0,e.cameraOffset.x=c*this.scale,e.cameraOffset.y=d*this.scale,e.visible=!1,e},a.prototype.createBars=function(){var a,b,c,d;c=this.barData,d=[];for(a in c)b=c[a],d.push(this.createBar(a,b.color,b.x,b.y));return d},a.prototype.show=function(){return this.background.visible=!0,this.healthbar.visible=!0,this.manabar.visible=!0,this.xpbar.visible=!0,this.currentWeapon.visible=!0,this},a.prototype.hide=function(){return this.background.visible=!1,this.healthbar.visible=!1,this.manabar.visible=!1,this.xpbar.visible=!1,this.currentWeapon.visible=!1,this},a.prototype.updateBarLengths=function(){return this.healthbar.width=Math.ceil(game.player.health/2)*this.scale,this.manabar.width=Math.ceil(game.player.mana/2)*this.scale,this.xpbar.width=Math.ceil(game.player.xp/2)*this.scale,this},a.prototype.updateCurrentWeapon=function(){return this.currentWeapon.frame=game.player.activeWeapon.iconFrame,this},a.prototype.update=function(){var a,b;return b=game.state.states[game.state.current],null!=b.girl&&null!=(null!=(a=game.player)?a.health:void 0)?(this.show(),this.updateBarLengths(),this.updateCurrentWeapon()):this.hide(),this},a}(),FPS=function(){function a(){this.text=game.add.bitmapText(0,0,"silkscreen","",32),this.text.fixedToCamera=!0}return a.prototype.update=function(){return 60!==game.time.fps?(this.text.visible=!0,this.text.cameraOffset.x=game.camera.width-32-this.text.width,this.text.cameraOffset.y=32,this.text.setText((game.time.fps||"--")+" FPS")):this.text.visible=!1,this},a}(),TextBox=function(){function a(){this.background=this.createBackground(),this.text=this.createText(),this.initalMode=game.mode,this.lastOpened=game.time.now,this.hide(),this.addEvents()}return a.prototype.addEvents=function(){return game.input.onDown.add(function(){"dialog"===game.mode&&game.time.now-this.lastOpened>100&&this.hide()},this)},a.prototype.createBackground=function(){var a;return a=new Box({width:224,height:48,x:32,y:game.camera.height-192-32}),a.sprite},a.prototype.createText=function(){var a;return a=game.add.bitmapText(0,0,"silkscreen","",32),a.fixedToCamera=!0,a.cameraOffset.x=56,a.cameraOffset.y=game.camera.height-200,a},a.prototype.hide=function(){return this.background.visible=!1,this.text.visible=!1,game.mode=this.initalMode,this},a.prototype.show=function(a){return null!=a&&this.text.setText(a),this.lastOpened=game.time.now,this.background.visible=!0,this.text.visible=!0,game.mode="dialog",this},a}(),PauseMenu=function(){function a(){var a;for(this.scale=4,this.background=this.createBackground(),this.texts=[],this.clickables=[],a=this.entries.length-1;a>=0;)this.entries[a].index=a,this.texts[a]=this.createText(a),this.clickables[a]=this.createClickable(a),a--;this.activeIndicator=this.createActiveIndicator(),this.initalMode=game.mode,this.lastOpened=game.time.now,this.hide(),this.bindEscDown()}return a.prototype.entries=[{name:"Character",action:function(){return alert("Character")}},{name:"Save",action:function(){return alert("Save")}},{name:"Quit",action:function(){return alert("Quit")}}],a.prototype.createBackground=function(){var a,b;return b=10+this.entries.length-1+13*this.entries.length,a=new Box({width:73,height:b,x:game.camera.width-73*this.scale-8*this.scale,y:game.camera.height-b*this.scale-8*this.scale}),a.sprite},a.prototype.createText=function(a){var b;return b=game.add.bitmapText(0,0,"silkscreen",this.entries[a].name,8*this.scale),b.fixedToCamera=!0,b.cameraOffset.x=167*this.scale,b.cameraOffset.y=game.camera.height-10*this.scale-(this.entries.length-a)*this.scale*14,b},a.prototype.bindInputOver=function(a){return a.events.onInputOver.add(function(){return this.activeIndicator.visible=!0,this.activeIndicator.cameraOffset.x=157*this.scale,this.activeIndicator.cameraOffset.y=a.cameraOffset.y+3*this.scale},this)},a.prototype.bindInputOut=function(a){return a.events.onInputOut.add(function(){return this.activeIndicator.visible=!1},this)},a.prototype.bindInputDown=function(a){return a.events.onInputDown.add(function(){var b;return this.hide(),"function"==typeof(b=this.entries[a.menuIndex]).action?b.action():void 0},this)},a.prototype.bindEscDown=function(){return game.controls.esc.onDown.add(function(){return"menu"===game.mode&&game.time.now-this.lastOpened>100?this.hide():"level"===game.mode?this.show():void 0},this)},a.prototype.createClickable=function(a){var b;return b=game.add.sprite(0,0,"menuclickable"),b.menuIndex=a,b.fixedToCamera=!0,b.scale.setTo(this.scale),b.cameraOffset.x=164*this.scale,b.cameraOffset.y=game.camera.height-12*this.scale-(this.entries.length-a)*this.scale*14,b.data=this.entries[a],b.inputEnabled=!0,this.bindInputOver(b),this.bindInputOut(b),this.bindInputDown(b),b},a.prototype.createActiveIndicator=function(){var a;return a=game.add.sprite(0,0,"boxborderactive"),a.fixedToCamera=!0,a.scale.setTo(this.scale),a.cameraOffset.x=0,a.cameraOffset.y=0,a.visible=!1,a},a.prototype.hide=function(){var a,b,c,d,e,f,g,h;for(this.background.visible=!1,this.activeIndicator.visible=!1,f=this.texts,b=0,d=f.length;d>b;b++)h=f[b],h.visible=!1;for(g=this.clickables,c=0,e=g.length;e>c;c++)a=g[c],a.visible=!1;return game.mode=this.initalMode,this},a.prototype.show=function(){var a,b,c,d,e,f,g,h;for(this.lastOpened=game.time.now,this.background.visible=!0,f=this.texts,b=0,d=f.length;d>b;b++)h=f[b],h.visible=!0;for(g=this.clickables,c=0,e=g.length;e>c;c++)a=g[c],a.visible=!0,a.input.checkPointerOver(game.input.activePointer)&&a.events.onInputOver.dispatch();return game.mode="menu",this},a}(),Crosshair=function(){function a(a){var b,c,d,e;null==a&&(a={}),this.color=null!=(b=a.color)?b:"#ffffff",this.width=null!=(c=a.width)?c:1,this.height=null!=(d=a.height)?d:1,this.scale=null!=(e=a.scale)?e:1,this.showHelper=!1,this.x=0,this.y=0,this.previousPrimary=!1,this.offset={x:14,y:14},this.sprite=this.createSprite(),this.showHelper&&(this.helper=this.createHelper())}return a.prototype.createBitmapData=function(){var a;return a=game.add.bitmapData(this.width,this.height),a.context.fillStyle=this.color,a.context.fillRect(0,0,this.width,this.height),a},a.prototype.createHelper=function(){var a,b;return a=this.createBitmapData(),b=game.add.sprite(this.x,this.y,a),b.scale.setTo(this.scale),game.physics.enable(b),b.anchor.setTo(.5),b.fixedToCamera=!0,b},a.prototype.createSprite=function(){var a;return a=game.add.sprite(this.x+this.offset.x,this.y+this.offset.y,"cursor"),a.scale.setTo(this.scale),game.physics.enable(a),a.anchor.setTo(.5),a.fixedToCamera=!0,a.animations.add("loop",[0,1,2],10,!0),a.animations.add("click",[3,4,5,6,5,4,3],40,!1),a.animations.play("loop"),a},a.prototype.update=function(){var a,b,c,d;return c=!1,d=!1,game.controls.primary&&!this.previousPrimary&&(c=!0),this.previousPrimary&&!game.controls.primary&&(d=!0),this.previousPrimary=game.controls.primary,b=this.sprite.animations.currentAnim.name,a=this.sprite.animations.currentAnim.isFinished,c&&"click"!==b&&this.sprite.animations.play("click"),"click"===b&&a&&this.sprite.animations.play("loop"),this.x=game.controls.worldX,this.x=this.x?this.x:0,this.y=game.controls.worldY,this.y=this.y?this.y:0,this.showHelper&&this.helper.cameraOffset.setTo(this.x-game.camera.x,this.y-game.camera.y),this.sprite.cameraOffset.setTo(this.x-game.camera.x+this.offset.x,this.y-game.camera.y+this.offset.y),this},a}(),FoeView=function(){function a(a){var b,c,d,e,f;null==a&&(a={}),this.width=null!=(b=a.width)?b:2,this.height=null!=(c=a.height)?c:2,this.scale=null!=(d=a.scale)?d:4,this.maxFoes=null!=(e=a.maxFoes)?e:100,this.foeMarkers=this.createFoeMarkers(),this.state=game.state.states[game.state.current],this.player=null!=(f=this.state.girl)?f.player:void 0}return a.prototype.createFoeMarkers=function(){var a;return a=game.add.group(),a.createMultiple(this.maxFoes,"foemarker"),a.setAll("anchor.x",.5),a.setAll("anchor.y",.5),a.setAll("scale.x",this.scale),a.setAll("scale.y",this.scale),a.setAll("fixedToCamera",!0),a},a.prototype.update=function(){return"level"===game.mode&&this.foeMarkers.forEachAlive(function(a){return a.kill()},this),this},a.prototype.getInterfaceCorners=function(){var a;return a=game.camera,{topLeft:{x:a.x,y:a.y},topRight:{x:a.x+a.width,y:a.y},bottomLeftOne:{x:a.x+20*this.scale,y:a.y+a.height-7*this.scale},bottomLeftTwo:{x:a.x+20*this.scale,y:a.y+a.height-20*this.scale},bottomLeftThree:{x:a.x,y:a.y+a.height-20*this.scale},bottomRight:{x:a.x+a.width,y:a.y+a.height-7*this.scale}}},a.prototype.getInterfaceBorders=function(){var a;return a=this.getInterfaceCorners(),[new Phaser.Line(a.topLeft.x,a.topLeft.y,a.topRight.x,a.topRight.y),new Phaser.Line(a.topRight.x,a.topRight.y,a.bottomRight.x,a.bottomRight.y),new Phaser.Line(a.bottomRight.x,a.bottomRight.y,a.bottomLeftOne.x,a.bottomLeftOne.y),new Phaser.Line(a.bottomLeftOne.x,a.bottomLeftOne.y,a.bottomLeftTwo.x,a.bottomLeftTwo.y),new Phaser.Line(a.bottomLeftTwo.x,a.bottomLeftTwo.y,a.bottomLeftThree.x,a.bottomLeftThree.y),new Phaser.Line(a.bottomLeftThree.x,a.bottomLeftThree.y,a.topLeft.x,a.topLeft.y)]},a.prototype.getLineOfSight=function(a){var b,c;return c=this.player.body.center,b=a.body.center,new Phaser.Line(c.x,c.y,b.x,b.y)},a.prototype.updateGroup=function(a){var b;return game.controls.f.isDown&&"level"===game.mode&&(b=this.getInterfaceBorders(),a.forEachAlive(function(a){var c,d,e,f,g,h,i;if(this.foeMarkers.countDead()>0){for(h=this.getLineOfSight(a),f=0,g=b.length;g>f;f++)c=b[f],i=h.intersects(c),e=i?i:e;e&&(d=this.foeMarkers.getFirstDead(),d.reset(),d.cameraOffset.x=e.x-game.camera.x,d.cameraOffset.y=e.y-game.camera.y)}},this)),this},a}(),PreloadBar=function(){function a(a){var b,c,d,e,f;null==a&&(a={}),this.bg=null!=(b=a.bg)?b:!1,this.bg=this.createBg(),this.bar=null!=(c=a.bar)?c:!1,this.bar=this.createBar(),this.x=null!=(d=a.x)?d:0,this.y=null!=(e=a.y)?e:0,this.center=null!=(f=a.center)?f:!1,"vertical"===this.center&&this.vAlignCenter(),"horizontal"===this.center&&this.hAlignCenter(),this.center===!0&&this.alignCenter()}return a.prototype.createBg=function(){return this.bg?game.add.sprite(this.x,this.y,this.bg):!1},a.prototype.createBar=function(){return this.bar?game.add.sprite(this.x,this.y,this.bar):!1},a.prototype.vAlignCenter=function(){return this.bg&&(this.bg.position.y=game.height/2-this.bg.height/2),this.bar?this.bar.position.y=game.height/2-this.bar.height/2:void 0},a.prototype.hAlignCenter=function(){return this.bg&&(this.bg.position.x=game.width/2-this.bg.width/2),this.bar?this.bar.position.x=game.width/2-this.bar.width/2:void 0},a.prototype.alignCenter=function(){return this.vAlignCenter(),this.hAlignCenter()},a.prototype.getSprite=function(){return console.log(this.bar),this.bar},a}(),Character=function(){function a(a){null==a&&(a={}),this.scale=4,this.paused=!1,this.animations=[],this.health=100,this.hitTimeout=!1,this.bodySize={width:32,height:32,x:-16,y:0}}return a.prototype.addAnimations=function(){var a,b,c,d,e;for(d=this.animations,e=[],b=0,c=d.length;c>b;b++)a=d[b],e.push(this.sprite.animations.add(a));return e},a}(),Skeletons=function(a){return this.count=a,this},Skeletons.prototype.create=function(){var a,b,c,d,e,f,g;for(c=game.map,this.group=game.add.group(),this.group.enableBody=!0,b=0,d=void 0,e=void 0,a=105,f=void 0,g=3;b<this.count;)d=Helpers.GetRandom(0,c.width),e=Helpers.GetRandom(0,c.height),c.getTile(d,e)&&c.getTile(d,e).index===a&&(d>=15||e>=10)&&(f=this.group.create(d*c.tileWidth,e*c.tileHeight,"tiny16"),f.frame=134,f.body.setSize(32,32,16,28),f.health=50,f.hitTimeout=!1,b++,f.animations.add("standDown",[134],0,!1),f.animations.add("walkDown",[135,136],g,!0),f.animations.add("standLeft",[150],0,!1),f.animations.add("walkLeft",[151,152],g,!0),f.animations.add("standRight",[166],0,!1),f.animations.add("walkRight",[167,168],g,!0),f.animations.add("standUp",[182],0,!1),f.animations.add("walkUp",[183,184],g,!0),f.animations.play("standDown"),f.animations.currentAnim.timeLastChange=game.time.now-100);return this},Skeletons.prototype.update=function(){var a,b;return b=game.map,a=game.collision,this.group.setAll("body.velocity.x",0),this.group.setAll("body.velocity.y",0),"level"===game.mode?(this.group.forEach(function(c){var d,e,f,g,h;if(c.hitTimeout&&game.time.now-c.hitTimeout>100&&(c.hitTimeout=!1,c.blendMode=PIXI.blendModes.NORMAL),c.visible&&c.inCamera){if(f=new Phaser.Line(game.state.states[game.state.current].girl.player.body.center.x,game.state.states[game.state.current].girl.player.body.center.y,c.body.center.x,c.body.center.y),g=void 0,d=void 0,h=320,f.length<=h){if(g=a.getRayCastTiles(f,4,!1,!1),d=!0,g.length>0)for(e=0;e<g.length;)-1!==b.collideIndexes.indexOf(g[e].index)&&(d=!1),e++;d&&game.physics.arcade.moveToXY(c,game.state.states[game.state.current].girl.player.body.center.x-c.body.offset.x-c.body.width/2,game.state.states[game.state.current].girl.player.body.center.y-c.body.offset.y-c.body.height/2,Helpers.GetRandom(150,200))}Helpers.GetDirectionFromVelocity(c)!==c.animations.currentAnim.name&&game.time.elapsedSince(c.animations.currentAnim.timeLastChange)>25&&(c.animations.play(Helpers.GetDirectionFromVelocity(c,10)),c.animations.currentAnim.timeLastChange=game.time.now)}c.animations.paused&&(c.animations.paused=!1)}),game.ui.foeView.updateGroup(this.group)):this.group.forEach(function(a){a.animations.paused||(a.animations.paused=!0)}),this},Slimes=function(a){return this.count=a,this.paused=!1,this},Slimes.prototype.create=function(){var a,b,c,d,e,f,g;for(c=game.map,this.group=game.add.group(),this.group.enableBody=!0,b=0,d=void 0,e=void 0,a=105,f=void 0,g=4;b<this.count;)d=Helpers.GetRandom(0,c.width),e=Helpers.GetRandom(0,c.height),c.getTile(d,e)&&c.getTile(d,e).index===a&&(d>=15||e>=10)&&(f=this.group.create(d*c.tileWidth,e*c.tileHeight,"tiny16"),f.frame=192,f.body.setSize(40,44,12,16),f.health=30,b++,f.animations.add("standDown",[192],0,!1),f.animations.add("walkDown",[193,194],g,!0),f.animations.add("standLeft",[208],0,!1),f.animations.add("walkLeft",[209,210],g,!0),f.animations.add("standRight",[224],0,!1),f.animations.add("walkRight",[225,226],g,!0),f.animations.add("standUp",[240],0,!1),f.animations.add("walkUp",[241,242],g,!0),f.animations.play("standDown"),f.animations.currentAnim.timeLastChange=game.time.now-100);return this},Slimes.prototype.update=function(){return"level"===game.mode?this.paused?(this.group.forEach(function(a){a.body.velocity=a.body.savedVelocity,a.animations.paused&&(a.animations.paused=!1)}),this.paused=!1):(this.group.forEach(function(a){a.hitTimeout&&game.time.now-a.hitTimeout>100&&(a.hitTimeout=!1,a.blendMode=PIXI.blendModes.NORMAL),a.visible&&a.inCamera&&(0===a.body.velocity.x&&0===a.body.velocity.y?(a.body.velocity.x=Helpers.GetRandom(-80,80),a.body.velocity.y=Helpers.GetRandom(-80,80)):(a.body.velocity.x=(Helpers.GetRandom(-800,800)+120*a.body.velocity.x)/121,a.body.velocity.y=(Helpers.GetRandom(-800,800)+120*a.body.velocity.y)/121),Helpers.GetDirectionFromVelocity(a)!==a.animations.currentAnim.name&&game.time.elapsedSince(a.animations.currentAnim.timeLastChange)>1e3&&(a.animations.play(Helpers.GetDirectionFromVelocity(a,10)),a.animations.currentAnim.timeLastChange=game.time.now))}),game.ui.foeView.updateGroup(this.group)):this.paused||(this.group.forEach(function(a){a.body.savedVelocity=a.body.velocity,a.body.velocity.x=0,a.body.velocity.y=0,a.animations.paused||(a.animations.paused=!0)}),this.paused=!0),this},Bats=function(a){return this.count=a,this},Bats.prototype.create=function(){var a,b,c,d,e,f,g;for(d=game.map,this.group=game.add.group(),this.group.enableBody=!0,c=0,e=void 0,f=void 0,b=105,a=void 0,g=3;c<this.count;)e=Helpers.GetRandom(0,d.width),f=Helpers.GetRandom(0,d.height),d.getTile(e,f)&&d.getTile(e,f).index===b&&(e>=15||f>=10)&&(a=this.group.create(e*d.tileWidth,f*d.tileHeight,"tiny16"),a.frame=195,a.body.setSize(32,32,16,28),a.health=30,a.hitTimeout=!1,c++,a.animations.add("standDown",[195],0,!1),a.animations.add("walkDown",[196,197],g,!0),a.animations.add("standLeft",[211],0,!1),a.animations.add("walkLeft",[212,213],g,!0),a.animations.add("standRight",[227],0,!1),a.animations.add("walkRight",[228,229],g,!0),a.animations.add("standUp",[243],0,!1),a.animations.add("walkUp",[244,245],g,!0),a.animations.play("standDown"),a.animations.currentAnim.timeLastChange=game.time.now-100);return this},Bats.prototype.update=function(){var a,b,c,d,e,f;return c=void 0,a=void 0,e=void 0,f=void 0,b=void 0,d=void 0,this.group.setAll("body.velocity.x",0),this.group.setAll("body.velocity.y",0),"level"===game.mode?(this.group.forEach(function(e){var f,g,h,i,j,k,l,m,n;e.hitTimeout&&game.time.now-e.hitTimeout>100&&(e.hitTimeout=!1,e.blendMode=PIXI.blendModes.NORMAL),k=new Phaser.Line(game.state.states[game.state.current].girl.player.body.center.x,game.state.states[game.state.current].girl.player.body.center.y,e.body.center.x,e.body.center.y),m=void 0,j=void 0,n=1e3,l=128,k.length<=n&&k.length>l?(c=game.state.states[game.state.current].grid,a=new PF.AStarFinder({allowDiagonal:!0,dontCrossCorners:!0}),b=game.state.states[game.state.current].girl,h=Math.floor(b.player.body.center.x/64),i=Math.floor(b.player.body.center.y/64),f=Math.floor(e.body.center.x/64),g=Math.floor(e.body.center.y/64),d=a.findPath(f,g,h,i,c.clone()),d.length>2&&(d=PF.Util.smoothenPath(c,d)),d.length>1&&game.physics.arcade.moveToXY(e,64*d[1][0]+32-e.body.offset.x-e.body.width/2,64*d[1][1]+32-e.body.offset.y-e.body.height/2,Helpers.GetRandom(150,200))):k.length<=l&&game.physics.arcade.moveToXY(e,game.state.states[game.state.current].girl.player.body.center.x-e.body.offset.x-e.body.width/2,game.state.states[game.state.current].girl.player.body.center.y-e.body.offset.y-e.body.height/2,Helpers.GetRandom(200,300)),Helpers.GetDirectionFromVelocity(e)!==e.animations.currentAnim.name&&game.time.elapsedSince(e.animations.currentAnim.timeLastChange)>25&&(e.animations.play(Helpers.GetDirectionFromVelocity(e,10)),e.animations.currentAnim.timeLastChange=game.time.now),e.animations.paused&&(e.animations.paused=!1)}),game.ui.foeView.updateGroup(this.group)):this.group.forEach(function(a){a.animations.paused||(a.animations.paused=!0)}),this},TinyRPG={},TinyRPG.Boot=function(a){},TinyRPG.Boot.prototype={preload:function(){game.time.advancedTiming=!0,this.load.image("preloaderBg","asset/sprites/preload_bg.png"),this.load.image("preloaderBar","asset/sprites/preload_bar.png")},create:function(){game.scale.scaleMode=Phaser.ScaleManager.SHOW_ALL,game.scale.setScreenSize(),game.scale.refresh(),game.stage.disableVisibilityChange=!0,game.onBlur.add(function(){game.input.reset(),game.inactive=!0},this),game.onFocus.add(function(){game.inactive=!1},this),this.state.start("Preloader")}},TinyRPG.Default=function(a){},TinyRPG.Default.prototype={create:function(){null==game.controls&&(game.controls=new Controls,game.controls.create()),null==game.ui&&(game.ui={}),game.ui.foeView=new FoeView,game.ui.fps=new FPS,game.ui.statusInfo=new StatusInfo,game.ui.blank=new Blank({visible:!0}),game.ui.textbox=new TextBox,game.ui.pauseMenu=new PauseMenu,game.controls.mobile||(game.ui.crosshair=new Crosshair)},update:function(){game.controls.update(),game.ui.foeView.update(),game.ui.fps.update(),game.ui.statusInfo.update(),game.controls.mobile||game.ui.crosshair.update()},render:function(){}},TinyRPG.Preloader=function(a){},TinyRPG.Preloader.prototype={preload:function(){this.stage.backgroundColor="#000000",this.preloadBar=new PreloadBar({bg:"preloaderBg",bar:"preloaderBar",center:!0}),this.load.setPreloadSprite(this.preloadBar.getSprite()),this.load.spritesheet("titlescreen","asset/sprites/titlescreen.png",1024,768),this.load.spritesheet("cursor","asset/sprites/cursor.png",48,48),this.load.image("menubg","asset/backgrounds/main-menu.png"),this.load.image("boxborder","asset/sprites/box_border.png"),this.load.image("boxborderactive","asset/sprites/box_border_active.png"),this.load.image("menuclickable","asset/sprites/menu_clickable.png"),this.load.spritesheet("startbutton","asset/sprites/start_button.png",59,38),this.load.spritesheet("textbox","asset/sprites/textbox.png"),this.load.spritesheet("foemarker","asset/sprites/foe_marker.png"),this.load.spritesheet("statusinfo","asset/sprites/status_info.png"),this.load.spritesheet("tiny16","asset/tilesets/tiny16.png",64,64),this.load.spritesheet("collision","asset/tilesets/collision.png",64,64),this.load.tilemap("town","asset/rooms/town.json",null,Phaser.Tilemap.TILED_JSON),this.load.bitmapFont("silkscreen","asset/fonts/silkscreen/silkscreen.png","asset/fonts/silkscreen/silkscreen.fnt")},create:function(){return this.state.start("MainMenu")},render:function(){}},TinyRPG.MainMenu=function(a){},TinyRPG.MainMenu.prototype={create:function(){game.mode="menu",game.stage.setBackgroundColor("#000000"),window.splashScreen=this.add.sprite(0,0,"titlescreen"),splashScreen.animations.add("loop",[0,1,2],10,!0),splashScreen.animations.play("loop"),game.state.states.Default.create(),game.ui.blank.hide()},startGame:function(){game.ui.blank.fadeTo(function(){return game.state.clearCurrentState(),game.state.start("Town")})},update:function(){game.state.states.Default.update(),game.controls.primary,1},render:function(){}},TinyRPG.Town=function(a){},TinyRPG.Town.prototype={create:function(){game.mode="level",game.physics.startSystem(Phaser.Physics.ARCADE),game.stage.setBackgroundColor("#17091C"),this.map=game.add.tilemap("town"),this.map.addTilesetImage("tiny16"),this.map.addTilesetImage("collision"),this.map.setCollision([1]),this.collision=this.map.createLayer("collision"),this.collision.resizeWorld(),this.collision.visible=!1,this.map.createLayer("deco3"),this.map.createLayer("deco2"),this.map.createLayer("deco1"),this.map.createLayer("deco0"),this.girl=new Girl,this.girl.create(),this.stateChange=!1,this.waterTimer=0,this.fireplaceTimer=0,this.torchTimer=0,game.input.onDown.add(function(){var a,b,c,d,e,f;if(a=void 0,e=void 0,f=void 0,d=void 0,c=void 0,"level"===game.mode)for(b=this.events.length-1;b>=0;)a=this.events[b],"onTileClick"===a.trigger.type&&(e=Math.floor(game.input.worldX/64),f=Math.floor(game.input.worldY/64),a.trigger.location.x===e&&a.trigger.location.y===f&&("undefined"!=typeof a.trigger.layer&&(d=game.state.states[game.state.current].map.getTile(e,f,a.trigger.layer)),"undefined"!=typeof a.trigger.maxDistance&&(c=new Phaser.Line(this.girl.player.x-this.girl.player.width/2,this.girl.player.y-this.girl.player.height/2,64*e+32,64*f+32)),"undefined"!=typeof a.trigger.layer&&d.index!==a.trigger.index||!("undefined"==typeof a.trigger.maxDistance||c.length<=a.trigger.maxDistance)||"textbox"===a.action.type&&game.ui.textbox.show(a.action.text))),b--},this),game.state.states.Default.create(),game.ui.blank.fadeFrom()},update:function(){var a;a=this,game.state.states.Default.update(),game.ui.crosshair.update(),this.girl.update(),"level"===game.mode&&(0===this.torchTimer?(this.map.swap(214,213,void 0,void 0,void 0,void 0,"deco2"),this.torchTimer=64):16===this.torchTimer?this.map.swap(213,214,void 0,void 0,void 0,void 0,"deco2"):32===this.torchTimer?this.map.swap(214,215,void 0,void 0,void 0,void 0,"deco2"):48===this.torchTimer&&this.map.swap(215,214,void 0,void 0,void 0,void 0,"deco2"),this.torchTimer--,0===this.fireplaceTimer?(this.map.swap(89,88,void 0,void 0,void 0,void 0,"deco3"),this.fireplaceTimer=64):16===this.fireplaceTimer?this.map.swap(88,89,void 0,void 0,void 0,void 0,"deco3"):32===this.fireplaceTimer?this.map.swap(89,90,void 0,void 0,void 0,void 0,"deco3"):48===this.fireplaceTimer&&this.map.swap(90,89,void 0,void 0,void 0,void 0,"deco3"),this.fireplaceTimer--,0===this.waterTimer&&(this.map.swap(134,135,void 0,void 0,void 0,void 0,"deco2"),this.waterTimer=60),this.waterTimer--),this.stateChange&&this.stateChange(),game.physics.arcade.collide(this.girl.player,this.collision,function(b,c){42===c.x&&43===c.y&&(a.stateChange=function(){game.mode="stateChange",game.ui.blank.fadeTo(function(){return game.state.start("Dungeon",!0),game.state.clearCurrentState()})})}),game.physics.arcade.overlap(this.girl.bullets,this.collision,function(a){a.kill()})},render:function(){},events:[{name:"home_sign",trigger:{type:"onTileClick",location:{x:33,y:34},maxDistance:127,layer:"deco2",index:97},action:{type:"textbox",text:"You stand in front of your house\nreading your own address.\n\nWhat a pointless waste of time..."}},{name:"dungeon_sign",trigger:{type:"onTileClick",location:{x:43,y:45},maxDistance:127,layer:"deco2",index:97},action:{type:"textbox",text:"Evil Dungeon of Eternal Darkness"}},{name:"townhall_sign",trigger:{type:"onTileClick",location:{x:16,y:20},maxDistance:127,layer:"deco2",index:97},action:{type:"textbox",text:"Town Hall"}},{name:"shop_sign",trigger:{type:"onTileClick",location:{x:17,y:31},maxDistance:127,layer:"deco2",index:97},action:{type:"textbox",text:"Shop"}},{name:"lodging_sign",trigger:{type:"onTileClick",location:{x:13,y:39},maxDistance:127,layer:"deco2",index:97},action:{type:"textbox",text:"Night's Lodging"}},{name:"shop_dialog",trigger:{type:"onTileClick",location:{x:15,y:26},maxDistance:127,layer:"deco0",index:136},action:{type:"textbox",text:"His cold dead eyes are staring at you.\nHe doesn't say a word."}}]},params=Phaser.Net.prototype.getQueryString(),game=new Phaser.Game(1024,768,Phaser.CANVAS,"crucialPain",{},!1,!1),game.state.add("Boot",TinyRPG.Boot),game.state.add("Default",TinyRPG.Default),game.state.add("Preloader",TinyRPG.Preloader),game.state.add("MainMenu",TinyRPG.MainMenu),game.state.add("Town",TinyRPG.Town),game.state.start("Boot");