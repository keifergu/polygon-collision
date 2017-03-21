import { Vector } from './vector';
import { Point, Line, Circle, Polygon } from './graphical';

/**
 * 定义外部传入参数的type字符常量
 * @type {Object}
 */
interface ShapeString{
	[index: string]: string;
}
let shapeWord: ShapeString = {
	line: "line",
	point: "point",
	circle: "circle",
	polygon: "polygon",
};

/**
 * 用户调用碰撞检测方法时需要传入的数据类型
 */
interface InputData {
	shape: string;
	points: Point[];
	radius?: number;
}

/**
 * 投影的数据类型
 */
interface Projection {
	max: number;
	min: number;
}

interface CollisionMethods {
	[index: string]: (s1: InputData, s2: InputData) => boolean;
}

/**
 * 保存所有碰撞检测主函数的对象
 * 函数命名按照 "图形名_图形名" 的格式
 * @type {Object}
 */
let collisionObject: CollisionMethods;

collisionObject = {
	/**
	 * 多边形与圆形的碰撞检测
	 * @param 	{Circle}	circle	圆形
	 * @param	{Polygon}	polygon	多边形
	 * @return	{boolean}			true表示碰撞，false表示未碰撞
	 */
	polygon_circle: function(polygon: InputData, circle: InputData): boolean{
		let c: Circle, p: Polygon,
			// 多边形的所有法向量
			normals: Vector[],
			// 对于某一个向量，多边形和圆形在此处投影重合的值
			overlap: number,
			pj1: Projection, pj2: Projection;
		
		c = new Circle(circle.points[0].x, circle.points[0].x, circle.radius);
		p = new Polygon(polygon.points);
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

	circle_polygon: function(circle: InputData, polygon: InputData): boolean{
		return this.polygon_circle(polygon, circle);
	},

	polygon_polygon: function(p1: InputData, p2: InputData): boolean {
		let dp1: Polygon, dp2: Polygon,
			// 多边形的所有法向量
			normals: Vector[],
			// 对于某一个向量，多边形和圆形在此处投影重合的值
			overlap: number,
			pj1: Projection, pj2: Projection;
		
		dp1 = new Polygon(p1.points);
		dp2 = new Polygon(p2.points);
		normals = dp2.getNormals();
		for(let n of normals) {
			pj2 = dp1.getProjection(n);
			pj1 = dp2.getProjection(n);
			overlap = Math.min(pj1.max, pj2.max) - Math.max(pj1.min, pj2.min);
			if (overlap < 0 ) {
				return false;
			}
		}
		return true;
	},

	circle_circle: function(ca: InputData, cb: InputData) {
		let dca: Circle, dcb: Circle,
			distance: number;
		
		// 获得两个圆心的向量差，再获得该差的长度。即获得圆心的距离
		distance = new Vector(ca.points[0]).substract(new Vector(cb.points[0])).getMagnitude();

		// 如果圆心距离大于半径和，则没有碰撞;
		// 圆心距离小于半径和，则发生碰撞
		return distance > ca.radius + cb.radius ?
			false :
			true
	}

	//TODO： 编写其他类型的碰撞检测函数
};

//TODO: 抽象 TransferData 类

export function collision(s1: InputData, s2: InputData): boolean {
	let name_1, name_2;
	name_1 = shapeWord[s1.shape];
	name_2 = shapeWord[s2.shape];
	if(typeof name_1 !== 'string' || typeof name_2 !== 'string'){
		throw new ReferenceError("shape world not exist");
	}
	/**
	 *  使用‘s1.shape’和 's2.shape'去动态的调用方法
	 * 	避免了大量的switch,case语句
	 */
	let methodName = name_1 + "_" + name_2;
	return collisionObject[methodName](s1, s2);
};