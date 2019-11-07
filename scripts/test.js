(function () {
  let run = Pts.quickStart("#pt", "#e2e6ef");
  var colors = [
    "#ffffff",
    "#ff0000",
    "#0000ff"
  ]
  var pts = [];
  var center = space.size.$divide(1.8);
  var angle = -(window.innerWidth * 0.5);
  var count = window.innerWidth * 0.05;
  if (count > 150) {
    count = 150;
  }
  var line = marker(0, angle, space.size.y, true) * 1;
  var mouse = center.clone();
  var r = Math.min(space.size.x, space.size.y) * 1;
  for (var i = 0; i < count; i++) {
    var p = new Vec(Math.random() * r - Math.random(), Math.random() * r - Math.random() * r);
    p.moveBy(center).rotate2D(i * Math.PI / count, center);
    p.brightness = 0.1;
    pts.push(p);
  }

  run((time, ftime) => {
    for (var i = 0; i < pts.length; i++) {
      var pt = pts[i];

      pt.rotate2D(Const.one_degree / 20, center);
      form.stroke(false).fill(colors[i % 3]).point(pt, 1);

      var ln = new Line(pt).to(line.perpendicularFromPt(pt));

      var distFromMouse = Math.abs(ln.getDistanceFromPoint(mouse));

      if (distFromMouse < 50) {
        if (pts[i].brightness < 0.3) {
          pts[i].brightness += 0.015;
        }
      } else {
        if (pts[i].brightness > 0.1) {
          pts[i].brightness -= 0.1;
        }
      }
      
      var color = "rgba(255, 255, 255," + pts[i].brightness + ")";
      form.stroke(color).fill(true).line(ln);
    }
  });

  space.bindMouse().play();
})();
