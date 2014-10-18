'use strict';

module.exports = {
    /**
     * Given a video element return the raw data being rendered in that
     * element.
     * @param {object} videoElement Video element
     * @returns {object} Raw canvas bitmap data
     */
    getFrameData: function (videoElement) {
        var canvas = document.createElement('canvas');
        var context = canvas.getContext('2d');

        canvas.width = videoElement.width;
        canvas.height = videoElement.height;

        context.drawImage(videoElement, 0, 0, videoElement.width, videoElement.height);
        return context.getImageData(0, 0, videoElement.width, videoElement.height).data;
    }
};
