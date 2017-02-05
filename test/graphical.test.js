let should = require('chai').should;
let Vector = require('../src/vector');
let {Point, Line, Circle, Polygon} = require('../src/graphical');

should();

describe('Graphical', () => {
	describe('#Point', () => {
		it('should construct one point', () => {
			let point = new Point(10, 20);
			[point.x, point.y].should.eql([10, 20]);
		});
	});

	describe('#Line', () => {
		it('should construct one line', () => {
			let point = new Line(new Point(10, 20),new Point(20, 30));
			point.points.should.eql([{x:10, y:20}, {x:20, y:30}]);
		});
	});

	describe('#Circle ', () => {
		// 构造函数测试
		it('should use the default value(0,0,0)', () => {
			let c = new Circle();
			[c.x, c.y, c.r].should.eql([0,0,0]);
		});
		it('should use a part of default value', () => {
			let c = new Circle({x:1});
			[c.x, c.y, c.r].should.eql([1,0,0]);
		});
		it('should construct one circle with x,y,z', () => {
			let c = new Circle({x:1, y:2, r:3});
			[c.x, c.y, c.r].should.eql([1,2,3]);
		});

		// 函数方法测试
		it('should get projection', () => {
			let normal = new Vector(10, 0);
			let c = new Circle({x:1, y:1, r:1});
			c.getProjection(normal).should.eql({max:11, min:9});
		});
	});

	describe('#Polygon ', () => {
		let points = [new Point(1,2), new Point(2,2),
									new Point(2,1), new Point(1,1)];
		it('should creat a polygon', () => {
			let p = new Polygon(points);
			p.points.should.eql(points);
		});
		it('should get the normals', () => {
			let p = new Polygon(points);
			// bug: 0 和 -0 不相等
			p.getNormals().should.eql([{x:0,y:1}, {x:1,y:-0}, {x:0,y:-1}, {x:-1,y:-0}]);
		});
		it('should get projections', () => {
			let normal = new Vector(10, 0);
			let p = new Polygon(points);
			p.getProjection(normal).should.eql({max:20,min:10});
		});
	});
});