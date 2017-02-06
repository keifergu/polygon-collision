var should = require('chai').should;
var Vector = require('../src/vector');

should();

describe('Vector', function(){

	describe('#constructor', function(){
		let numVector = new Vector({x:10, y:20});
		let vecVector = new Vector(numVector);
		it('construct by object {x, y}', function(){
			numVector.x.should.eq(10);
			numVector.y.should.eq(20);
		});

		it('construct by Vector', function(){
			vecVector.x.should.eq(10);
			vecVector.y.should.eq(20);
		});
	});
	describe('#math test', function(){
		let v1, v2;
		
		beforeEach(function() {
			v1 = new Vector({x:120,y:200}),
			v2 = new Vector({x:-20,y:50});
		})
		
		it('option plus', function(){
			let result = v1.add(v2);
			let res = [result.x, result.y];
			res.should.to.eql([100, 250]);
		});

		it('option substract', function(){
			let result = v1.substract(v2);
			result.x.should.eq(140);
			result.y.should.eq(150);
		});

		it('normalize', function(){
			let result = v1.substract(v2);
			result.x.should.eq(140);
			result.y.should.eq(150);
		});

		it('dotProduct', function(){
			let result = v1.dotProduct(v2);
			result.should.eq(7600);
		});
		
		it('edge', function(){
			let result = v1.edge(v2);
			let res = [result.x, result.y];
			res.should.to.eql([140, 150]);
		});
	});
});