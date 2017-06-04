// Code taken from: https://github.com/substack/point-in-polygon/blob/master/index.js
// Addaption to this project for Working with FeatureCollection.
//

function pointInPolygon(point, vs) {

    // ray-casting algorithm based on
    // http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html


    // Note: As the coordinatevalues are in GeoJSON lng, lat we swat here the meaning of x, y.
    var x = point.lng, y = point.lat;

    var inside = false;
    for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
        var xi = vs[i][0], yi = vs[i][1];
        var xj = vs[j][0], yj = vs[j][1];

        var intersect = ((yi > y) != (yj > y))
            && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }

    return inside;
};
