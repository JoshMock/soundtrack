'use strict';

var NoiseMaker = require('./noisemaker');

function successCallback (stream) {
    var videoElement = document.querySelector('video');
    videoElement.src = window.URL ? window.URL.createObjectURL(stream) : stream;

    var noisemaker = new NoiseMaker(videoElement);
}

function errorCallback (e) {
    console.log('navigator.getUserMedia error:', e);
}

navigator.getUserMedia = navigator.getUserMedia ||
                         navigator.webkitGetUserMedia ||
                         navigator.mozGetUserMedia ||
                         navigator.msGetUserMedia;
navigator.getUserMedia({audio: false, video: true}, successCallback, errorCallback);
