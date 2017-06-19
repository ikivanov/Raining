(function() {
	class RaindropCollisionEffect {
		constructor(config) {
			this.context = config.context;
			this.scene = config.scene;
			this.x = config.position.x;
			this.y = config.position.y;
			this.isActive = true;

			this.particles = [];

			for (let i = 0; i < PARTICLES_COUNT; i++) {
				this.particles.push({
					x: this.x,
					y: this.y,
					speedX: (Math.random() * 4-2),
					speedY : (Math.random() * -4),
					radius : 0.65 + Math.floor(Math.random() * 1.6)
				});
			}
		}

		update() {
			if (!this.isActive)
				return;

			for (let i = 0; i < this.particles.length; i++) {
				let particle = this.particles[i];

				particle.x += particle.speedX;
				particle.y += particle.speedY;
				particle.radius -= 0.075;
			}

			this.particles = this.particles.filter(item => item.radius > 0);
			this.isActive = this.particles.length > 0;

			if (!this.isActive) {
				this.scene.onCollisionEffectDone(this);
			}
		}

		render() {
			let ctx = this.context;

			if (!this.isActive) {
				return;
			}

			for (let i = 0; i < this.particles.length; i++) {
				let particle = this.particles[i];

				ctx.beginPath();
				ctx.strokeStyle = 'white';
				ctx.fillStyle = "gray";
				ctx.arc(particle.x, particle.y, particle.radius, 0, 2 * Math.PI);
				ctx.fill();
			}
		}
	};

	window.RainingNamespace = window.RainingNamespace || {};
	RainingNamespace.RaindropCollisionEffect = RaindropCollisionEffect;

	const
		PARTICLES_COUNT = 5,
		WIDTH = 600,
		HEIGHT = 600,
		MAX_LENGTH = 20;
})();