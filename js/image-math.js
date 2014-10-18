'use strict';

var _ = require('lodash');

module.exports = {
    /**
     * Given an array of raw canvas bitmap data, calculate the average color of
     * the canvas
     */
    averageColor: function (canvasPixelArray) {
        var length = canvasPixelArray.length / 4;
        var totals = [0, 0, 0];

        _.each(_.range(length), function (idx) {
            totals[0] = totals[0] + canvasPixelArray[idx * 4];
            totals[1] = totals[1] + canvasPixelArray[(idx * 4) + 1];
            totals[2] = totals[2] + canvasPixelArray[(idx * 4) + 2];
        });

        return [
            Math.floor(totals[0] / length),
            Math.floor(totals[1] / length),
            Math.floor(totals[2] / length)
        ];
    },

    /**
     * Given an array of raw canvas bitmap data, calculate relative brightness
     * using some random algorithm you stole from Stack Overflow
     */
    brightness: function (canvasPixelArray) {
        var rgb = this.averageColor(canvasPixelArray);
        return (0.299 * rgb[0]) + (0.587 * rgb[1]) + (0.114 * rgb[2]);
    }
};
