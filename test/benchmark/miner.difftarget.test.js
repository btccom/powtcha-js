var miner = require('../../lib/miner/miner');
var randomBytes = require('randombytes');

describe('miner', function() {
    it('difftarget', function() {
        var N = 2000;

        var start = 0x00afffff;

        for (var j = 0; j < 16; j++) {
            var diff = start >> j;
            console.log('j=' + j);
            console.log('diff=' + diff.toString(16));

            var results = [];

            for (var i = 0; i < N; i++) {
                var salt = randomBytes(32);

                var t = new Date();

                var res = miner.scanHash(salt, diff);
                var nonce = res[0];

                var tt = new Date() - t;

                results.push({nonce: nonce, tt: tt});
            }

            var nonces = results.map(function(result) { return result.nonce; });
            var tts = results.map(function(result) { return result.tt; });
            nonces.sort();
            tts.sort();

            var medianIdx = Math.ceil(nonces.length / 2);

            console.log('max: n=' + nonces.reduce(function(a, b) { return a > b ? a : b; }, 0) + ' t=' +
                tts.reduce(function(a, b) { return a > b ? a : b; }, 0));
            console.log('avg: n=' + (nonces.reduce(function(a, b) { return a + b; }, 0) / nonces.length) + ' t=' +
                (tts.reduce(function(a, b) { return a + b; }, 0) / tts.length));
            console.log('median: n=' + nonces[medianIdx] + ' t=' + tts[medianIdx]);
        }
    });
});
