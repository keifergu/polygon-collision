"use strict";
var Vector = (function () {
    function Vector(point, other) {
        if (typeof point === 'number') {
            this.x = point;
            this.y = other;
        }
        else if (typeof point === 'object') {
            this.x = point.x;
            this.y = point.y;
        }
    }
    Vector.prototype.add = function (vector) {
        this.x += vector.x;
        this.y += vector.y;
        return this;
    };
    ;
    Vector.prototype.substract = function (vector) {
        this.x -= vector.x;
        this.y -= vector.y;
        return this;
    };
    ;
    Vector.prototype.edge = function (point) {
        return this.substract(new Vector(point));
    };
    ;
    Vector.prototype.prependicular = function () {
        return new Vector({ x: this.y, y: -this.x });
    };
    ;
    Vector.prototype.getMagnitude = function () {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    };
    ;
    Vector.prototype.normalize = function () {
        var v = new Vector({ x: 0, y: 0 }), m = this.getMagnitude();
        if (m !== 0) {
            v.x = this.x / m;
            v.y = this.y / m;
        }
        return v;
    };
    ;
    Vector.prototype.dotProduct = function (vector) {
        return this.x * vector.x + this.y * vector.y;
    };
    ;
    Vector.prototype.normal = function () {
        return this.prependicular().normalize();
    };
    ;
    return Vector;
}());
exports.Vector = Vector;
