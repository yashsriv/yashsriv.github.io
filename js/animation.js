/*jshint esversion: 6 */
class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}
class Ball {
  constructor(pos, vel, limits) {
    this.pos = pos;
    this.vel = vel;
    this.limits = limits;
  }
  move() {
    this.pos.x = this.pos.x + this.vel.x;
    this.pos.y = this.pos.y + this.vel.y;
    if (this.pos.x > this.limits.x) {
      this.pos.x = this.pos.x - this.limits.x;
    }
    if (this.pos.y > this.limits.y) {
      this.pos.y = this.pos.y - this.limits.y;
    }
    if (this.pos.x < 0) {
      this.pos.x = this.pos.x + this.limits.x;
    }
    if (this.pos.y < 0) {
      this.pos.y = this.pos.y + this.limits.y;
    }
  }
}
class Board {
  constructor(count, limits) {
    this.limits = limits;
    this.balls = [];
    for (var i = 0; i < count; i++) {
      var pos = new Vector(Math.random() * limits.x, Math.random() * limits.y);
      var vel = new Vector(Math.random() * limits.x * 0.003 * (Math.random() > 0.5 ? 1 : -1), Math.random() * limits.y * 0.003 * (Math.random() > 0.5 ? 1 : -1));
      var ball = new Ball(pos, vel, limits);
      this.balls.push(ball);
    }
  }
  distance(a, b) {
    return Math.sqrt((b.y - a.y) * (b.y - a.y) + (b.x - a.x) * (b.x - a.x));
  }
  draw(ctx) {
    ctx.fillStyle = "rgba(255, 255, 255, 1)";
    for (var k = 0; k < this.balls.length; k++) {
      ctx.beginPath();
      ctx.arc(this.balls[k].pos.x, this.balls[k].pos.y, 2, 0, Math.PI * 2, false);
      ctx.fill();
    }
    for (var i = 0; i < this.balls.length; i++) {
      for (var j = i + 1; j < this.balls.length; j++) {
        var distance = this.distance(this.balls[i].pos, this.balls[j].pos);
        var w = window.innerWidth;
        var h = window.innerHeight;
        var min = h < w ? h : w;
        if (distance < min / 7) {
          ctx.fillStyle = `rgba(255, 255, 255, ${ 1 - distance * 7 / min })`;
          ctx.strokeStyle = `rgba(255, 255, 255, ${ 1 - distance * 7 / min })`;
          ctx.beginPath();
          ctx.moveTo(this.balls[i].pos.x, this.balls[i].pos.y);
          ctx.lineTo(this.balls[j].pos.x, this.balls[j].pos.y);
          ctx.closePath();
          ctx.stroke();
        }
      }
    }
  }
  clear(ctx) {
    ctx.clearRect(0, 0, this.limits.x, this.limits.y);
    // for(var i = 0; i < this.balls.length; i++) {
    //   ctx.clearRect(this.balls[i].pos.x - 3, this.balls[i].pos.y -3, 6, 6);
    // }
  }
  loop(ctx) {
    for (var i = 0; i < this.balls.length; i++) {
      this.clear(ctx);
      this.balls[i].move();
    }
    this.draw(ctx);
  }
}
