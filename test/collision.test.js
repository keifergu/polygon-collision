let rewire = require('rewire');
let should = require('chai').should;
let collision = require('../lib/collision');
// 此处使用 rewire ，便于测试内部没有暴露出来的属性
let rewireCollision = rewire('../lib/collision.js');

should();

let cget = rewireCollision.__get__;

describe('Collision', () => {
	let polygonPoints = [
	        [[250, 130], [250, 250],
	         [350, 250], [400, 150]],
	        [[400, 130], [400, 200],
	         [490, 100], [450, 10]]
	    ];
  const shapeWord = {
  	line: "line",
  	point: "point",
  	circle: "circle",
  	polygon: "polygon",
  };

  describe('#shape word', () => {
  	it('should have the equal shape list', () => {
  		cget('shapeWord').should.eql(shapeWord);  	
  	});
  });
  
	describe('#polygon with circle', () => {

		let dp1 = {
				type: shapeWord.polygon,
				points: polygonPoints[0].map((v) => {return {x:v[0],y:v[1]};}),
			},
			dc1 = {
				type: shapeWord.circle,
				points: [{x:50,y:40}],
				r: 40,
			},
			dc2 = {
				type: shapeWord.circle,
				points: [{x:250, y:240}],
				r: 20,
			};

		it('collision tes with (polygon, circle)', () => {
			let res11 = collision(dp1, dc1);
			let res21 = collision(dp1, dc2);
			res11.should.eq(false);
			res21.should.eq(true);
		});

		it('collision test with (circle, polygon', () => {
			let res12 = collision(dc1, dp1);
			let res22 = collision(dc2, dp1);
			res12.should.eq(false);
			res22.should.eq(true);
		});

	});
});