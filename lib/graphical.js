var Vector = require('./vector');

class Point {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }
}

class Line {
  constructor(point_1 = {}, point_2 = {}) {
    this.points = [point_1, point_2];
  }
}

class Circle {
  constructor({x = 0, y = 0, r = 0} = {}) {
    this.x = x;
    this.y = y;
    this.r = r;
  }

  /**
   * 获得圆在某个向量上的投影
   * @param  {Vector} normal 用以计算的向量
   * @return {Object}        max值投影的最大值，min指最小值
   */
  getProjection(normal) {
    let projection;
    let v = new Vector(this.x, this.y);
    // 此处是使用的点积来代替投影，但只要相比较的图形均使用-
    // 同一个normal向量，则比较结果不变，相应的计算结果也不变
    projection = v.dotProduct(normal);
    return {
      max : projection + this.r,
      min : projection - this.r
    };
  }
}

class Polygon {
  constructor(points = []) {
    // 传入的参数是一个二维数组，表示多边形的每个点
    if (points.length <= 2) {
      console.log("pleas input at least 3 points");
    }
    this.points = points;
  }
  /**
   * 获得该多边形的所有边的法向量
   * @param  {Polygon} polygon 多边形
   * @return {Array}           包含所有Vector类型法向量的Array
   */
  getNormals() {
    let v1 = new Vector(),
        v2 = new Vector(),
        normals = [];

    this.points.forEach((point, i, points) => {
      v1.x = point.x;
      v1.y = point.y;

      if (i + 1 < points.length) {
          v2.x = points[i + 1].x;
          v2.y = points[i + 1].y;
      } else {
          v2.x = points[0].x;
          v2.y = points[0].y;
      }
      // 使用Vector的方法计算
      normals.push(v1.edge(v2).normal());
    });

    return normals;
  }

  /**
   * 求多边形在某一条法向量上的投影长度
   * @param  {Vector} normal 法向量
   * @return {Object}        返回投影的最大值和最小值
   */
  getProjection(normal) {
    let projections = [] ,
        max, min,
        v = new Vector();
    this.points.forEach((point) => {
      v.x = point.x;
      v.y = point.y;
      projections.push(v.dotProduct(normal));
    });
    min = Math.min(...projections);
    max = Math.max(...projections);
    return {
      max,
      min,
    };
  }
}

module.exports = {
  Line,
  Point,
  Circle,
  Polygon,
};