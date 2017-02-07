import { should } from 'chai';
import { Vector } from '../src/vector';
import { Point, Line, Circle, Polygon } from '../src/graphical';

should();

describe('Graphical', () => {
	describe('#Point', () => {
		let p1 = new Point(10, 20),
			p2 = new Point(p1);
		it('should construct with 2 numbers', () => {
			[p1.x, p1.y].should.eql([10, 20]);
		});
		it('should construct with 2 numbers', () => {
			[p2.x, p2.y].should.eql([10, 20]);
		});
	});

	describe('#Line', () => {
		it('should construct with 2 points', () => {
			let p = new Line(new Point(10, 20),new Point(20, 30));
			p.points.should.eql([{x:10, y:20}, {x:20, y:30}]);
		});
	});

	describe('#Circle ', () => {
		// 构造函数测试
		it('should construct with x,y,r', () => {
			let c = new Circle(0,0,0);
			[c.x, c.y, c.r].should.eql([0,0,0]);
		});

		// 函数方法测试
		it('should get projection', () => {
			let normal = new Vector(10, 0);
			let c = new Circle(1, 1, 1);
			c.getProjection(normal).should.eql({max:11, min:9});
		});
	});

	describe('#Polygon ', () => {
		let points = [new Point(1,2), new Point(2,2),
					new Point(2,1), new Point(1,1)];
		it('should creat a polygon with 4 points', () => {
			let p = new Polygon(points);
			p.points.should.eql(points);
		});

		it('should get the normals', () => {
			let p = new Polygon(points);
			// bug: 0 和 -0 不相等
			p.getNormals().should.eql([
				new Vector({x:0,y:1}), new Vector({x:1,y:-0}),
				new Vector({x:0,y:-1}), new Vector({x:-1,y:-0})]);
		});

		it('should get projections', () => {
			let normal = new Vector(10, 0);
			let p = new Polygon(points);
			p.getProjection(normal).should.eql({max:20,min:10});
		});
	});
});