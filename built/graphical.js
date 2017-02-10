"use strict";
var vector_1 = require("./vector");
var Point = (function () {
    function Point(point, other) {
        if (typeof point === 'number') {
            this.x = point;
            this.y = other;
        }
        else if (typeof point === 'object') {
            this.x = point.x;
            this.y = point.y;
        }
    }
    return Point;
}());
exports.Point = Point;
var Line = (function () {
    function Line(p1, p2) {
        this.points = [p1, p2];
    }
    return Line;
}());
exports.Line = Line;
var Circle = (function () {
    function Circle(x, y, r) {
        this.x = x;
        this.y = y;
        this.r = r;
    }
    Circle.prototype.getProjection = function (normal) {
        var projection;
        var v = new vector_1.Vector(this.x, this.y);
        projection = v.dotProduct(normal);
        return {
            max: projection + this.r,
            min: projection - this.r
        };
    };
    return Circle;
}());
exports.Circle = Circle;
var Polygon = (function () {
    function Polygon(points) {
        if (points.length <= 2) {
            throw new Error("At leaste 3 points");
        }
        this.points = points;
    }
    Polygon.prototype.getNormals = function () {
        var v1 = new vector_1.Vector(0, 0), v2 = new vector_1.Vector(0, 0), normals = [];
        this.points.forEach(function (point, i, points) {
            v1.x = point.x;
            v1.y = point.y;
            if (i + 1 < points.length) {
                v2.x = points[i + 1].x;
                v2.y = points[i + 1].y;
            }
            else {
                v2.x = points[0].x;
                v2.y = points[0].y;
            }
            normals.push(v1.edge(v2).normal());
        });
        return normals;
    };
    Polygon.prototype.getProjection = function (normal) {
        var projections = [], max, min, v;
        this.points.forEach(function (p) {
            v = new vector_1.Vector(p.x, p.y);
            projections.push(v.dotProduct(normal));
        });
        min = Math.min.apply(Math, projections);
        max = Math.max.apply(Math, projections);
        return {
            max: max,
            min: min,
        };
    };
    return Polygon;
}());
exports.Polygon = Polygon;
