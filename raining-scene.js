(function() {
	function RainingScene(config) {
		var that = this;

		that.canvas = config.canvas;
		that.context = that.canvas.getContext("2d");

		that.background = that._getImage("images/background.png");

		that.oldTime = new Date();
		that.framesCounter = 0;
		that.fps = 0;

		that.mouse = {
			x: 0,
			y: 0
		};

		window.onmousemove = function(event) {
			that.mouse.x = event.clientX;
			that.mouse.y = event.clientY;
		}

		that.raindrops = [];
		that._generateRaindrops();

		that.collisionEffects = [];

		that.umbrella = new RainingNamespace.Umbrella({context: that.context, scene: this});
	}

	RainingScene.prototype = {
		render: function() {
			var that = this;

			requestAnimationFrame(that.render.bind(that));

			that._update();

			that.context.clearRect(0, 0, that.canvas.width, that.canvas.height);
			that._render();
		},

		hasCollision: function(raindrop) {
			var that = this,
				rainDropDummyRadius = 1,
				dx = raindrop.position.x - that.umbrella.position.x,
				dy = (raindrop.position.y + raindrop.length) - that.umbrella.position.y,
				distance = Math.sqrt(dx * dx + dy * dy);

			if (distance < rainDropDummyRadius + that.umbrella.radius) {
				return true;
			}

			return raindrop.position.y > HEIGHT;
		},

		onRaindropFallen: function(raindrop) {
			var that = this,
				collisionEffect = new RainingNamespace.RaindropCollisionEffect({context: that.context,
												scene: this,
												position: {
													x: raindrop.position.x,
													y: raindrop.position.y <= HEIGHT ? raindrop.position.y : HEIGHT
												}
											});

			that.collisionEffects.push(collisionEffect);

			raindrop.reset();
		},

		onCollisionEffectDone: function(collisionEffect) {
			var that = this,
				index = that.collisionEffects.indexOf(collisionEffect);

			that.collisionEffects.splice(index, 1);
		},

		_generateRaindrops: function() {
			var that = this;

			for (var i = 0; i < RAINDROPS_COUNT; i++) {
				var raindrop = new RainingNamespace.Raindrop({context: that.context, scene: this});

				that.raindrops.push(raindrop);
			}
		},

		_update: function() {
			var that = this;

			for (var i = 0; i < that.raindrops.length; i++) {
				that.raindrops[i].update();
			}

			for (var j = 0; j < that.collisionEffects.length; j++) {
				var effect = that.collisionEffects[j];

				if (!effect.isActive)
					continue;

				effect.update();
			}

			that.umbrella.update();
		},

		_render: function() {
			var that = this,
				ctx = that.context;

			that._renderBackground();

			for (var i = 0; i < that.raindrops.length; i++) {
				that.raindrops[i].render();
			}

			for (var j = 0; j < that.collisionEffects.length; j++) {
				var effect = that.collisionEffects[j];

				if (!effect.isActive)
					continue;

				effect.render();
			}

			that.umbrella.render();

			that._renderFPS();
		},

		_renderBackground: function() {
			var that = this,
				ctx = that.context;

			ctx.fillStyle = "black";
			ctx.fillRect(0, 0, WIDTH, HEIGHT);
		},

		_renderFPS: function() {
			var that = this,
				now = new Date(),
				ctx = that.context,
				diff = now.getTime() - that.oldTime.getTime();

			if (diff < 1000) {
				that.framesCounter++;
			} else {
				that.fps = that.framesCounter;
				that.framesCounter = 0;
				that.oldTime = new Date();
			}

			ctx.font = "14px Arial";
			ctx.fillStyle = "white";
			ctx.textAlign = "left";
			ctx.fillText("fps: " + that.fps, 550, 25);
		},

		_getImage: function(filename) {
			var image = new Image();
			image.src = filename;
			return image;
		},
	};

	window.RainingNamespace = window.RainingNamespace || {};
	RainingNamespace.RainingScene = RainingScene;

	const
		UPDATE_TIMEOUT = 1000 / 60,
		WIDTH = 600,
		HEIGHT = 600,
		RAINDROPS_COUNT = 500
})();