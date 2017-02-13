(function() {
	function RaindropCollisionEffect(config) {
		var that = this;

		that.context = config.context;
		that.scene = config.scene;
		that.x = config.position.x;
		that.y = config.position.y;
		that.isActive = true;

		that.particles = [];

		for (var i = 0; i < PARTICLES_COUNT; i++) {
			that.particles.push({
				x: that.x,
				y: that.y,
				speedX: (Math.random() * 4-2),
				speedY : (Math.random() * -4),
				radius : 0.65 + Math.floor(Math.random() * 1.6)
			});
		}
	}

	RaindropCollisionEffect.prototype = {
		update: function () {
			var that = this;

			if (!that.isActive)
				return;

			for (var i = 0; i < that.particles.length; i++) {
				var particle = that.particles[i];

				particle.x += particle.speedX;
				particle.y += particle.speedY;
				particle.radius -= 0.075;
			}

			that.particles = that.particles.filter(item => item.radius > 0);
			that.isActive = that.particles.length > 0;

			if (!that.isActive) {
				that.scene.onCollisionEffectDone(that);
			}
		},

		render: function() {
			var that = this,
				ctx = that.context;

			if (!that.isActive) {
				return;
			}

			for (var i = 0; i < that.particles.length; i++) {
				var particle = that.particles[i];

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