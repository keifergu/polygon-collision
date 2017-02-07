interface Point {
    x: number,
    y: number
}

export class Vector {

    x: number;
    y: number;

    /**
     * Vector 的构造函数
     * @param {Point}   只使用具有 x,y 属性的对象实例化
     * @param {number}  使用两个数字实例化，则第一个参数为数字
     */
    constructor(point: Point);
    constructor(x: number, y: number);
    constructor(point: any, other?: number) {
        if(typeof point === 'number') {
            this.x = point;
            this.y = other;
        } else if(typeof point === 'object'){
            this.x = point.x;
            this.y = point.y;
        }
    }

    /**
     * 向量相加
     * @param {Vector} vector 相加的向量
     */
    add(vector: Vector): Vector {
        this.x += vector.x;
        this.y += vector.y;
        return this;
    };

    /**
     * 向量相减
     * @param  {Vector} vector 被减的向量
     * @return {Vector}        返回一个新向量
     */
    substract(vector: Vector): Vector {
        this.x -= vector.x;
        this.y -= vector.y;
        return this;
    };

    /**
     * 获得该向量端点到参数点的向量
     * @param  {Point}  point   参数点
     * @return {Vector}         新向量，由参数点指向自身的端点
     */
    edge(point: Point): Vector {
        return this.substract(new Vector(point));
    };

    /**
     * 求该向量的垂直向量
     * @return {Vector}
     */
    prependicular(): Vector {
        return new Vector({x: this.y, y: -this.x});
    };

    /**
     * 获得该向量的模，即长度
     * @return {number} 模的值
     */
    getMagnitude(): number {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    };

    /**
     * 获得该向量的单位向量
     * @return {Vector} 返回单位向量
     */
    normalize(): Vector {
        let v = new Vector({x: 0, y: 0}),
            m = this.getMagnitude();
        if (m !== 0) {
            v.x = this.x / m;
            v.y = this.y / m;
        }
        return v;
    };

    /**
     * 获得两个向量的点积
     * @param  {Vector} vector 另一个向量
     * @return {number}        返回点积值
     */
    dotProduct(vector: Vector): number {
        return this.x * vector.x + this.y * vector.y;
    };

    /**
     * 获取法向量(单位向量的垂直向量)
     * @return {Vector}
     */
    normal(): Vector {
        return this.prependicular().normalize();
    };
}
