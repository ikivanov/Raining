(function() {
	class Raindrop {
		constructor(config) {
			this.context = config.context;
			this.scene = config.scene;

			this.position = { x: 0, y: 0 };
			this.speedVector = { x: 0, y: 0, z: 0 };
			this.length = 0;
			this.isFallen = false;

			this.reset();
		}

		reset() {
			this.length = Math.floor(this.randomRange(MAX_LENGTH / 2, MAX_LENGTH));
			this.position.x = Math.floor(this.randomRange(1, WIDTH));
			this.position.y = -Math.floor(this.randomRange(1, HEIGHT));
			this.speedVector.x = 0;
			this.speedVector.y = 0.75 * this.length;
			this.speedVector.z = 0;
			this.isFallen = false;
		}

		_isVisible() {
			return this.position.x > 0 && this.position.x < WIDTH &&
					this.position.y > 0  && this.position.y < HEIGHT;
		}

		update() {
			if (this.isFallen) {
				return;
			}

			this.position.x += this.speedVector.x;
			this.position.y += this.speedVector.y;

			this.isFallen = this.scene.hasCollision(this);

			if (this.isFallen) {
				this.scene.onRaindropFallen(this);
			}
		}

		render() {
			let ctx = this.context;

			if (this.isFallen || !this._isVisible()) {
				return;
			}

			ctx.beginPath();
			ctx.strokeStyle = 'white';
			ctx.moveTo(this.position.x, this.position.y);
			ctx.lineTo(this.position.x, this.position.y + this.length);
			ctx.stroke();
		}

		randomRange(min, max)
		{
			return ((Math.random()*(max - min)) + min);
		}
	};

	window.RainingNamespace = window.RainingNamespace || {};
	RainingNamespace.Raindrop = Raindrop;

	const
		WIDTH = 600,
		HEIGHT = 600,
		MAX_LENGTH = 20;
})();