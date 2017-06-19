(function() {
	class RainingScene {
		constructor(config) {
			this.canvas = config.canvas;
			this.context = this.canvas.getContext("2d");

			this.background = this._getImage("images/background.png");

			this.oldTime = new Date();
			this.framesCounter = 0;
			this.fps = 0;

			this.mouse = {
				x: 0,
				y: 0
			};

			window.onmousemove = (event) => {
				this.mouse.x = event.clientX;
				this.mouse.y = event.clientY;
			}

			this.raindrops = [];
			this._generateRaindrops();

			this.collisionEffects = [];

			this.umbrella = new RainingNamespace.Umbrella({context: this.context, scene: this});

			this.lastLighteningTime = new Date();
			this.nextLightheningInterval = this.randomRange(5000, 10000);

			this.lighteningEffect = null;
		}

		render() {
			requestAnimationFrame(this.render.bind(this));

			this._update();

			this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
			this._render();
		}

		hasCollision(raindrop) {
			let rainDropDummyRadius = 1,
				dx = raindrop.position.x - this.umbrella.position.x,
				dy = (raindrop.position.y + raindrop.length) - this.umbrella.position.y,
				distance = Math.sqrt(dx * dx + dy * dy);

			if (distance < rainDropDummyRadius + this.umbrella.radius) {
				return true;
			}

			return raindrop.position.y > HEIGHT;
		}

		onRaindropFallen(raindrop) {
			let collisionEffect = new RainingNamespace.RaindropCollisionEffect({context: this.context,
												scene: this,
												position: {
													x: raindrop.position.x,
													y: raindrop.position.y <= HEIGHT ? raindrop.position.y : HEIGHT
												}
											});

			this.collisionEffects.push(collisionEffect);

			raindrop.reset();
		}

		onCollisionEffectDone(collisionEffect) {
			let index = this.collisionEffects.indexOf(collisionEffect);

			this.collisionEffects.splice(index, 1);
		}

		onLighteningEffectDone(effect) {
			this.lighteningEffect = null;
			this.nextLightheningInterval = this.randomRange(5000, 10000);
		}

		_generateRaindrops() {
			for (let i = 0; i < RAINDROPS_COUNT; i++) {
				let raindrop = new RainingNamespace.Raindrop({context: this.context, scene: this});

				this.raindrops.push(raindrop);
			}
		}

		_update() {
			for (let i = 0; i < this.raindrops.length; i++) {
				this.raindrops[i].update();
			}

			for (let j = 0; j < this.collisionEffects.length; j++) {
				let effect = this.collisionEffects[j];

				if (!effect.isActive)
					continue;

				effect.update();
			}

			this.umbrella.update();

			let now = new Date();
			if (now.getTime() - this.lastLighteningTime.getTime() > this.nextLightheningInterval) {
				this.lighteningEffect = new RainingNamespace.LighteningEffect({context: this.context, scene: this, begin: now});
				this.lastLighteningTime = now;
			}

			if (this.lighteningEffect) {
				this.lighteningEffect.update();
			}
		}

		_render() {
			let ctx = this.context;

			this._renderBackground();

			for (let i = 0; i < this.raindrops.length; i++) {
				this.raindrops[i].render();
			}

			for (let j = 0; j < this.collisionEffects.length; j++) {
				let effect = this.collisionEffects[j];

				if (!effect.isActive)
					continue;

				effect.render();
			}

			this.umbrella.render();

			this._renderFPS();

			if (this.lighteningEffect) {
				this.lighteningEffect.render();
			}
		}

		_renderBackground() {
			let ctx = this.context;

			ctx.fillStyle = "black";
			ctx.fillRect(0, 0, WIDTH, HEIGHT);
		}

		_renderFPS() {
			let now = new Date(),
				ctx = this.context,
				diff = now.getTime() - this.oldTime.getTime();

			if (diff < 1000) {
				this.framesCounter++;
			} else {
				this.fps = this.framesCounter;
				this.framesCounter = 0;
				this.oldTime = new Date();
			}

			ctx.font = "14px Arial";
			ctx.fillStyle = "white";
			ctx.textAlign = "left";
			ctx.fillText("fps: " + this.fps, 550, 25);
		}

		_getImage(filename) {
			let image = new Image();
			image.src = filename;
			return image;
		}

		randomRange(min, max)
		{
			return ((Math.random()*(max - min)) + min);
		}
	};

	window.RainingNamespace = window.RainingNamespace || {};
	RainingNamespace.RainingScene = RainingScene;

	const
		UPDATE_TIMEOUT = 1000 / 60,
		WIDTH = 600,
		HEIGHT = 600,
		RAINDROPS_COUNT = 500
})();