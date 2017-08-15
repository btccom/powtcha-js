var assert = require('assert');
var sha256 = require('../lib/miner/sha256');
var miner = require('../lib/miner/miner');
var randomBytes = require('randombytes');

describe('miner', function() {
    it('difftarget', function() {
        var N = 2000;

        var j = 0;
        var start = 0x00afffff;
        // 57fff

        for (var j = 0; j < 16; j++) {
            var diff = start >> j;
            console.log('j=' + j);
            console.log('diff=' + diff.toString(16));

            var results = [];

            var salt = sha256.Uint32ArrayFromBuffer(randomBytes(32));
            var data = new Uint32Array(salt.length + 1);
            data.set(salt, 0);

            for (var i = 0; i < N; i++) {
                data[data.length - 2]++;

                var t = new Date;

                var res = miner.scanHash(data, data.length - 1, diff);
                var nonce = res[0];

                var tt = new Date - t;

                results.push({nonce: nonce, tt: tt});
            }

            var nonces = results.map(function(result) { return result.nonce; });
            var tts = results.map(function(result) { return result.tt; });

            console.log('max: n=' + nonces.reduce(function(a, b) { return a > b ? a : b; }, 0) + ' t=' + tts.reduce(function(a, b) { return a > b ? a : b; }, 0));
            console.log('avg: n=' + (nonces.reduce(function(a, b) { return a + b }, 0) / nonces.length) + ' t=' + (tts.reduce(function(a, b) { return a + b }, 0) / tts.length));
        }
    });
});
