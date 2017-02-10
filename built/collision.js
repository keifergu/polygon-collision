"use strict";
var graphical_1 = require("./graphical");
var shapeWord = {
    line: "line",
    point: "point",
    circle: "circle",
    polygon: "polygon",
};
var collisionObject;
collisionObject = {
    polygon_circle: function (polygon, circle) {
        var c, p, normals, overlap, pj1, pj2;
        c = new graphical_1.Circle(circle.points[0].x, circle.points[0].x, circle.radius);
        p = new graphical_1.Polygon(polygon.points);
        normals = p.getNormals();
        for (var _i = 0, normals_1 = normals; _i < normals_1.length; _i++) {
            var n = normals_1[_i];
            pj2 = c.getProjection(n);
            pj1 = p.getProjection(n);
            overlap = Math.min(pj1.max, pj2.max) - Math.max(pj1.min, pj2.min);
            if (overlap < 0) {
                return false;
            }
        }
        return true;
    },
    circle_polygon: function (circle, polygon) {
        return this.polygon_circle(polygon, circle);
    },
};
function collision(s1, s2) {
    var methodName = s1.shape + "_" + s2.shape;
    return collisionObject[methodName](s1, s2);
}
exports.collision = collision;
;
