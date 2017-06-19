(function() {
	class Umbrella {
		constructor(config) {
			this.context = config.context;
			this.scene = config.scene;
			this.radius = 100;

			this.position = { x: WIDTH / 2, y: HEIGHT / 2 };
		}

		update() {
			this.position.x = this.scene.mouse.x;
			this.position.y = this.scene.mouse.y;
		}

		render() {
			let ctx = this.context;

			ctx.beginPath();
			ctx.strokeStyle = 'white';
			ctx.fillStyle = "gray";
			ctx.arc(this.position.x, this.position.y, this.radius, Math.PI, 0);
			ctx.fill();
			ctx.moveTo(this.position.x - this.radius, this.position.y);
			ctx.lineTo(this.position.x + this.radius, this.position.y);
			ctx.moveTo(this.position.x, this.position.y);
			ctx.lineTo(this.position.x, this.position.y + this.radius);
			ctx.stroke();
			ctx.beginPath();
			ctx.arc(this.position.x + 15, this.position.y + this.radius, 15, Math.PI, 0, true);
			ctx.stroke();
		}
	};

	window.RainingNamespace = window.RainingNamespace || {};
	RainingNamespace.Umbrella = Umbrella;

	const
		WIDTH = 600,
		HEIGHT = 600,
		MAX_LENGTH = 20;
})();