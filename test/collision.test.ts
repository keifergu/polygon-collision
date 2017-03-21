import rewire = require('rewire');
import { should } from 'chai';
import { collision } from '../src/collision';
// 此处使用 rewire ，便于测试内部没有暴露出来的属性
let rewireCollision = rewire('../src/collision');

should();

let cget = rewireCollision.__get__;

interface Point {
    x: number;
    y: number;
}

interface InputData {
	shape: string;
	points: Point[];
	radius?: number;
}

const shapeWord = {
    line: "line",
    point: "point",
    circle: "circle",
    polygon: "polygon",
};

describe('Collision', () => {
    let polygonPoints = [
            [
                [250, 130],
                [250, 250],
                [350, 250],
                [400, 150]
            ],
            [
                [500, 100], // 与 dp1 不碰撞
                [500, 200],
                [600, 200],
                [600, 100]
            ],
            [
                [100, 100], // 与 dp1 碰撞
                [100, 200],
                [300, 200],
                [300, 100]
            ]
        ],
        dp1: InputData, dp2: InputData, dp3: InputData,
        dc1: InputData, dc2: InputData, dc3: InputData;
    
    dp1 = {
        shape: shapeWord.polygon,
        points: polygonPoints[0].map((v) => { return { x: v[0], y: v[1] }; }),
    };
    dp2 = {
        shape: shapeWord.polygon,
        points: polygonPoints[1].map((v) => { return { x: v[0], y: v[1] }; }),
    };
    dp3 = {
        shape: shapeWord.polygon,
        points: polygonPoints[2].map((v) => { return { x: v[0], y: v[1] }; }),
    };
    dc1 = {
        shape: shapeWord.circle,
        points: [{ x: 50, y: 40 }],
        radius: 40,
    };
    dc2 = {
        shape: shapeWord.circle,
        points: [{ x: 250, y: 240 }],
        radius: 20,
    };
    dc3 = {
        shape: shapeWord.circle,
        points: [{ x: 40, y: 40}],
        radius: 20
    };

    describe('#shape world', () => {
        it('should have the equal shape list', () => {
            cget('shapeWord').should.eql(shapeWord);
        });
        it('should throw error while shape not exist', () => {
            let errDp = {
                shape: 'circel',
                points: [{ x: 50, y: 40 }],
                radius: 40,
            };
            let errDp2 = errDp;
            (() => collision(errDp, errDp2)).should.throw(ReferenceError, "shape world not exist");
        })
    });

    describe('#polygon with circle', () => {

        it('collision test with (polygon, circle)', () => {
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

    describe('#polygon with polygon', () => {
        it('should collision', () => {
            let res = collision(dp1, dp3);
            res.should.eq(true);
        })
        it('should not collision', () => {
            let res = collision(dp1, dp2);
            res.should.eq(false);
        })
    });

    describe('#circle with circle', () => {
        it('should collision', () => {
            let res = collision(dc1, dc3);
            res.should.eq(true)
        })

        it('should not collision', () => {
            let res = collision(dc1, dc2);
            res.should.eq(false)
        })
    })
});