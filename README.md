polygon-collision
------
The collision detection module.

![travis-ci](https://travis-ci.org/keifergu/polygon-collision.svg?branch=master)
![codecov](https://codecov.io/gh/keifergu/polygon-collision/branch/master/graph/badge.svg)

## Install

```
npm install polygon-collision
```

## Usage

```javascript
var collision = require('polygon-collision');

var shapeWord = {
    line: "line",
    point: "point",
    circle: "circle",
    polygon: "polygon",
};

var polygon = {
        type: shapeWord.polygon,
        points: [{x:250, y:130}, {x:250, y:250},
                 {x:350, y:250}, {x:400, y:150}],
    },
    circle_1 = {
        type: shapeWord.circle,
        points: [{x:50,y:40}],
        r: 40,
    },
    circle_2 = {
        type: shapeWord.circle,
        points: [{x:250, y:240}],
        r: 20,
    };
var res1 = collision(polygon, circle_1);    // true
var res2 = collision(polygon, circle_2);    // false
```