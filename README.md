polygon-collision
------
The collision detection module.

![travis-ci](https://travis-ci.org/keifergu/polygon-collision.svg?branch=master)
[![codecov](https://codecov.io/gh/keifergu/polygon-collision/branch/master/graph/badge.svg)](https://codecov.io/gh/keifergu/polygon-collision)


## Install

```
npm install polygon-collision
```

## Usage

```javascript
var collision = require('polygon-collision');

var p1 = [
    [250, 130],
    [250, 250],
    [350, 250],
    [400, 150]
];
var polygon = {
        shape: "polygon",
        points: p1.map(v => { return { x: v[0], y: v[1] } })
    },
    circle_1 = {
        shape: "circle",
        points: [ { x: 50, y: 40 } ],
        radius: 40,
    },
    circle_2 = {
        shape: "circle",
        points: [ { x: 250, y: 240 } ],
        radius: 20,
    };
var res1 = collision(polygon, circle_1);    // true
var res2 = collision(polygon, circle_2);    // false
```