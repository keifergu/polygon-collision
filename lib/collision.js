var Vector = require('./vector');
var {Point, Line, Circle, Polygon} = require('./graphical');

/**
 * 定义外部传入参数的type字符常量
 * @type {Object}
 */
const shapeWord = {
	line: "line",
	point: "point",
	circle: "circle",
	polygon: "polygon",
};


/**
 * 保存所有碰撞检测主函数的对象
 * 函数命名：按照 "图形名小写_图形名小写" 的格式
 * 注意：所有函数定义使用箭头函数，这样绑定this，防止可能出现的问题
 * @type {Object}
 */
let collisionObject = {
	/**
	 * 多边形与圆形的碰撞检测
	 * @param  {Circle} circle   圆形
	 * @return {Boolean}         true表示碰撞，false表示未碰撞
	 */
	polygon_circle: function(polygon, circle){
		let pj1, pj2, overlap,
			c = new Circle(circle.data),
		  p = new Polygon(polygon.data),
			normals = p.getNormals();
		for(let n of normals) {
			pj2 = c.getProjection(n);
			pj1 = p.getProjection(n);
			overlap = Math.min(pj1.max, pj2.max) - Math.max(pj1.min, pj2.min);
			if (overlap < 0 ) {
				return false;
			}
		}
		return true;
	},

	circle_polygon: function(circle, polygon){
		return this.polygon_circle(polygon, circle);
	},

	//TODO： 编写其他类型的碰撞检测函数
};

//TODO: 抽象 TransferData 类

/**
 * 说明：接口模式，将外部传入的数据进行转换以适应内部函数使用的格式
 * 目的：考虑到现在的接口设计可能不合理，方便以后进行修改和扩展
 * @param  {Object} shape 从外部传入的图形数据
 * @return {Object}       内部使用的数据格式
 */
function dataTransfer(shape) {
	let resultData, type = shape.type;
	switch(type) {
		case shapeWord.polygon:
			resultData = {
				type,
				data: shape.points,
			};
			break;
		case shapeWord.circle:
			resultData = {
				type,
				data: {
					x: shape.points[0].x,
					y: shape.points[0].y,
					r: shape.r,
				},
			};
			break;
		case shapeWord.line:
			resultData = {
				type,
				data: shape.points,
			};
			break;
		case shapeWord.point:
			resultData = {
				type,
				data: shape.points,
			};
			break;
		default:
			throw shape.type + " of the `shape.type` must belong to " + shapeWord.values ;
	}
	return resultData;
}

module.exports = function collision(s1 = {}, s2 = {}) {
	s1 = dataTransfer(s1);
	s2 = dataTransfer(s2);
	// 使用‘s1.type’和 's2.type'去动态的调用方法，避免了大量的switch,case语句
	return collisionObject[s1.type + "_" + s2.type](s1, s2);
};