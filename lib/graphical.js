'use strict';
var Projection;
Projection = function(min, max) {
    this.min = min;
    this.max = max;
};

Projection.prototype.overlap = function(projection) {
    return Math.min(this.max, projection.max) - Math.max(this.min, projection.min);
};

var inherit, Shape, Line, Polygon, Circle;

inherit = function(Child, Parent) {
	Child.prototype = Object.create(Parent.prototype, {
		'constructor': Child
	})
}

Shape = function(points) {
	this.points = points || [];
}
Object.assign(Shape.prototype, {
	collidesWith: function(anotherShape) {
    var axes = this.getAxes().concat(anotherShape.getAxes()),
   	 	mtv;

    return mtv.overlap > 0 ? true : false;
	}

	// 检查每个轴上投影的间隔，存在返回最小偏移量
	minimumTranslationVector: function(axes, anotherShape) {
    var minOverlap = Infinity,
      i, axis, projection1, projection2, 
      overlap, axisWithSmallOverlap;

    for (i = 0; i < axes.length; i++) {
      axis = axes[i];
      projection1 = this.project(axis);
      projection2 = anotherShape.project(axis);
      overlap = projection1.overlap(projection2);
      if (overlap < minOverlap) {
        axisWithSmallOverlap = axis;
        minOverlap = overlap;
      }
      if (overlap <= 0) break;
    }

	    return {
        axis: axisWithSmallOverlap,
        overlap: minOverlap
	    };
	},

	// 获取轴线
	getAxes: function() {
    throw 'getAxes() not implemented';
	},

	// 获取在某一轴线上的投影
	project: function(axis) {
    throw 'project(axis) not implemented';
	}
})

Line = function(points) {
	Shape.call(this, points);
}
inherit(Line, Shape);

Polygon = function(points) {
	Shape.call(this, points);
}
inherit(Polygon, Shape);

Object.assign(Polygon.prototype, {

})
