Pts.quickStart("#pt", "#123");

(function () {
  // Same thing as var pts = [];
  var pts = new Group();
  //Various shades of blue and green
  var colors = [
    "#00efe3",
    "#3454d1",
    "#34d1bf",
    "#00ff8c",
    "#00ffff",
    "#75efd3",
    "#349cd1",
    "#348dd1",
    "#00c46b"
  ];

  space.add({

    // create %00 random points
    start: (bound) => {
      pts = Create.distributeRandom(space.innerBound, 500);
    },

    animate: (time, ftime) => {
      let perpend = new Group(space.center.$subtract(0.1), space.pointer).op(Line.perpendicularFromPt);
      
      // Rotate the pts slowly at the center
      pts.rotate2D(Const.one_degree / 20, space.center);
      pts.forEach((p, i) => {
        let lp = perpend(p);
        //let lp = p;
        
        // These are the lines that are based on how far away from each other
        var ratio = Math.min(1, 1 - lp.$subtract(p).magnitude() / (space.size.x / 5));

        // These are the dots we see on the page
        form.stroke(`rgba(128, 128, 128, ${ratio})`, ratio * 2).line([p, lp]);
        form.fillOnly(colors[i % 9]).point(p, 1);
      });
    },

  });

  space.bindTouch().play();
})();
