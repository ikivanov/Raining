(function() {
	function Umbrella(config) {
		var that = this;

		that.context = config.context;
		that.scene = config.scene;
		that.radius = 100;

		that.position = { x: WIDTH / 2, y: HEIGHT / 2 };
	}

	Umbrella.prototype = {
		update: function () {
			var that = this;

			that.position.x = that.scene.mouse.x;
			that.position.y = that.scene.mouse.y;
		},

		render: function() {
			var that = this,
				ctx = that.context;

			ctx.beginPath();
			ctx.strokeStyle = 'white';
			ctx.fillStyle = "gray";
			ctx.arc(that.position.x, that.position.y, that.radius, Math.PI, 0);
			ctx.fill();
			ctx.moveTo(that.position.x - that.radius, that.position.y);
			ctx.lineTo(that.position.x + that.radius, that.position.y);
			ctx.moveTo(that.position.x, that.position.y);
			ctx.lineTo(that.position.x, that.position.y + that.radius);
			ctx.stroke();
			ctx.beginPath();
			ctx.arc(that.position.x + 15, that.position.y + that.radius, 15, Math.PI, 0, true);
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