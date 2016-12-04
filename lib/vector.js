'use strict';

var Vector = function(point) {
	if (arguments.length === 1) {
		this.x = point.x;
		this.y = point.y;
	} else {
		this.x = arguments[0];
		this.y = arguments[1];
	}
}
Object.assign(Vector.prototype, {
	/**
	 * 向量相加
	 * @param {[type]} vector 相加的向量
	 */
	add: function(vector) {
	  return new Vector(this.x + vector.x, this.y + vector.y);
	},
	/**
	 * 向量相减	
	 * @param  {[type]} vector 被减的向量
	 * @return {[type]}        返回一个新向量
	 */
	substract: function(vector) {
		return new Vector(this.x - vector.x, this.y - vector.y);
	},
	/**
	 * 通过两点获得一个向量
	 * @param  {[type]} vector 另一个点
	 * @return {[type]}        新向量，由传入的点指向本身的点
	 */
	edge: function(vector) {
		return this.substract(vector);
	},
	/**
	 * 求该向量的垂直向量
	 * @return {[type]} 
	 */
	prependicular: function() {
		return new Vector(this.y, -this.x);
	},
	/**
	 * 获得该向量的模，即长度
	 * @return {Float} 模的值
	 */
	getMagnitude: function() {
		return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
	},
	/**
	 * 获得该向量的单位向量
	 * @return {Vector} 返回一个新向量
	 */
	normalize: function() {
		var v = new Vector(0, 0),
			m = this.getMagnitude();
		if (m !== 0) {
			v.x = this.x / m;
			v.y = this.y / m;
		}
		return v;
	},
	/**
	 * 获得两个向量的点积
	 * @param  {Vector} vector 另一个向量
	 * @return {Vector}        返回一个新向量
	 */
	dotProduct: function(vector) {
		return this.x * vector.x + this.y * vector.y;
	},
	/**
	 * 获取法向量
	 * @return {Vector}
	 */
	normal: function() {
	  return this.prependicular().normalize();
	}
})

module.exports = Vector; 