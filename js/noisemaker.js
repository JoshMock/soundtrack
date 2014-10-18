'use strict';

var canvasUtils = require('./canvas-utils');
var imageMath = require('./image-math');
var _ = require('lodash');

var testConfig = [
    {
        nodeType: 'Oscillator',
        type: 'SAWTOOTH',
        frequency: 440,
        onVideoChange: function (options) {
            // change tone based on video brightness
            this.frequency.value = options.brightness * options.brightness / 70;
        }
    },
    {
        nodeType: 'WaveShaper',
        onVideoChange: function (options) {
            // shape/distort wave based on amount of green
            var k = options.averageColor[1],
                n_samples = 44100,
                curve = new Float32Array(n_samples),
                deg = Math.PI / 180,
                i = 0,
                x;

            for (; i < n_samples; ++i) {
                x = i * 2 / n_samples - 1;
                curve[i] = ( 3 + k ) * x * 20 * deg / ( Math.PI + k * Math.abs(x) );
            }

            this.curve = curve;
        }
    },
    {
        nodeType: 'Gain',
        gain: 1,
        onVideoChange: function (options) {
            // change gain based on redness
            this.gain.value = options.averageColor[0] * 5;
        }
    }
];

/**
 * @class NoiseMaker
 * @classdesc Makes... noise. Using video.
 */
var NoiseMaker = function (video) {
    this.video = video;
    this._init(testConfig);

    this._chain = [];
};

/**
 * Initialize audio context, start playing synthesized audio, start watching
 * video data every 100ms and adjust audio params as necessary.
 * @private
 */
NoiseMaker.prototype._init = function (config) {
    var AudioContext = window.AudioContext || window.webkitAudioContext;
    var context = new AudioContext();

    // loop through each step in the config and create that node
    var nodeChain = [];
    var functionChain = [];
    _.each(config, function (step) {
        var node = context['create' + step.nodeType]();

        // configure params on node
        _.each(step, function (value, key) {
            if (key !== 'nodeType') {
                if (step.nodeType === 'Oscillator' && key === 'type') {
                    node[key] = node[value];
                } else if (key === 'onVideoChange') {
                    functionChain.push(value.bind(node));
                } else {
                    node[key].value = value;
                }
            }
        });

        nodeChain.push(node);

        if (nodeChain.length > 1) {
            nodeChain[nodeChain.length - 2].connect(node);
        }

        if (node.start) node.start(0);
    });

    // connect last step in chain to AudioContext destination
    _.last(nodeChain).connect(context.destination);

    // run functions that update values based on video properties
    this.intervalId = setInterval(function () {
        var data = canvasUtils.getFrameData(this.video, this.video.width, this.video.height);
        var options = {
            brightness: imageMath.brightness(data),
            averageColor: imageMath.averageColor(data)
        };

        _.each(functionChain, function (fn) {
            fn(options);
        });
    }.bind(this), 100);
};

module.exports = NoiseMaker;
