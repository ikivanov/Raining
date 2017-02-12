(function() {
	function Raindrop(config) {
		var that = this;

		that.context = config.context;
		that.scene = config.scene;

		that.speedVector = { x: 0, y: 0	};
		that.position = { x: 0, y: 0 };
		that.speedVector = { x: 0, y: 0, z: 0 };
		that.length = 0;
		that.isFallen = false;

		that.reset();
	}

	Raindrop.prototype = {
		reset: function() {
			var that = this;

			that.length = Math.floor(that.randomRange(MAX_LENGTH / 2, MAX_LENGTH));
			that.position.x = Math.floor(that.randomRange(1, WIDTH));
			that.position.y = -Math.floor(that.randomRange(1, HEIGHT));
			that.speedVector.x = 0;
			that.speedVector.y = 0.75 * that.length;
			that.speedVector.z = 0;
			that.isFallen = false;
		},

		_isVisible: function() {
			var that = this;

			return that.position.x > 0 && that.position.x < WIDTH &&
					that.position.y > 0  && that.position.y < HEIGHT;
		},

		update: function () {
			var that = this;

			if (that.isFallen) {
				return;
			}

			that.position.x += that.speedVector.x;
			that.position.y += that.speedVector.y;

			that.isFallen = that.scene.hasCollision(that);

			if (that.isFallen) {
				that.scene.onRaindropFallen(that);
			}
		},

		render: function() {
			var that = this,
				ctx = that.context;

			if (that.isFallen || !that._isVisible()) {
				return;
			}

			ctx.beginPath();
			ctx.strokeStyle = 'white';
			ctx.moveTo(that.position.x, that.position.y);
			ctx.lineTo(that.position.x, that.position.y + that.length);
			ctx.stroke();
		},

		randomRange: function(min, max)
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