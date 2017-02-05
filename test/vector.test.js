var should = require('chai').should;
var Vector = require('../src/vector.js');

should();

describe('Vector', function(){

	describe('#constructor', function(){
		var numVector = new Vector(10, 20);
		var vecVector = new Vector(numVector);
		it('construct by number x & y', function(){
			numVector.x.should.eq(10);
			numVector.y.should.eq(20);
		});

		it('construct by Vector', function(){
			vecVector.x.should.eq(10);
			vecVector.y.should.eq(20);
		});
	});
	describe('#math test', function(){
		var v1 = new Vector(120,200),
				v2 = new Vector(-20,50);
		it('add', function(){
			var result = v1.add(v2);
			var res = [result.x, result.y];
			res.should.to.eql([100, 250]);
		});
		it('sub', function(){
			var result = v1.substract(v2);
			result.x.should.eq(140);
			result.y.should.eq(150);
		});
		it('normalize', function(){
			var result = v1.substract(v2);
			result.x.should.eq(140);
			result.y.should.eq(150);
		});
		it('dotProduct', function(){
			var result = v1.dotProduct(v2);
			result.should.eq(7600);
		});
		it('edge', function(){
			var result = v1.edge(v2);
			var res = [result.x, result.y];
			res.should.to.eql([140, 150]);
		});
	});
});