var assert = require('assert');

var PoWtcha = require('../').PoWtcha;

describe('PoWtcha', function() {
    it('work1 EASY', function(cb) {
        var powtcha = new PoWtcha({
            salt: Buffer.from('fe23fe23fe23fe23fe23', 'hex'),
            target: PoWtcha.TARGET.EASY
        });

        powtcha.findNonce().then(function(res) {
            assert.equal(res.nonce, 17257);
            assert.equal(res.extraNonce, 0);
            assert.equal(res.hash, '00083a05d3e663172298d78ac73ee9eff7655604932e227c8dfd19710729a301');
            assert.equal(res.salt, 'fe23fe23fe23fe23fe23');

            cb();
        })
            .catch(function(err) {
                cb(err);
            });
    });
    it('work1 MEDIUM', function(cb) {
        var powtcha = new PoWtcha({
            salt: Buffer.from('fe23fe23fe23fe23fe23', 'hex'),
            target: PoWtcha.TARGET.MEDIUM
        });

        powtcha.findNonce().then(function(res) {
            assert.equal(res.nonce, 18680);
            assert.equal(res.extraNonce, 0);
            assert.equal(res.hash, '00037ea7ae8fc8c43593dc49e0b35f81773390f3112f7f34ad56eddc094e7b01');
            assert.equal(res.salt, 'fe23fe23fe23fe23fe23');

            cb();
        })
            .catch(function(err) {
                cb(err);
            });
    });
    it('work1 VERY_HARD', function(cb) {
        var powtcha = new PoWtcha({
            salt: Buffer.from('fe23fe23fe23fe23fe23', 'hex'),
            target: PoWtcha.TARGET.VERY_HARD
        });

        powtcha.findNonce().then(function(res) {
            assert.equal(res.nonce, 282381);
            assert.equal(res.extraNonce, 0);
            assert.equal(res.hash, '00001f4ff0639dc8ae6bd5929750d4a3ef5d1b0146c5d5d229b9db9fbe8eadcb');
            assert.equal(res.salt, 'fe23fe23fe23fe23fe23');

            cb();
        })
            .catch(function(err) {
                cb(err);
            });
    });
    it('non blocking', function(cb) {
        var powtcha = new PoWtcha({
            salt: Buffer.from('fe23fe23fe23fe23fe23', 'hex'),
            target: PoWtcha.TARGET.VERY_HARD
        });

        var canWorkBG = powtcha.canWorkBG();

        // set interval every 10ms that keeps a counter
        var i = 0;
        var interval = setInterval(function() {
            i++;
        }, 10);

        powtcha.findNonce().then(function(res) {
            clearInterval(interval);

            // if we were working in BG the counter should have incremented a fair amount
            //  because it shouldn't have been blocking the main thread
            // if we weren't working in BG the counter should be near 0
            //  because we would be blocking the main thread
            if (canWorkBG) {
                assert(i > 10);
            } else {
                assert(i < 10);
            }

            assert.equal(res.nonce, 282381);
            assert.equal(res.extraNonce, 0);
            assert.equal(res.hash, '00001f4ff0639dc8ae6bd5929750d4a3ef5d1b0146c5d5d229b9db9fbe8eadcb');
            assert.equal(res.salt, 'fe23fe23fe23fe23fe23');

            cb();
        })
            .catch(function(err) {
                cb(err);
            });
    });

    it('bg work', function(cb) {
        var powtcha = new PoWtcha({
            salt: Buffer.from('fe23fe23fe23fe23fe23', 'hex'),
            target: PoWtcha.TARGET.VERY_HARD
        });

        // work blocking to test the time it will take
        var t1 = new Date();
        powtcha._work(false);
        var tt1 = new Date() - t1;

        var canWorkBG = powtcha.canWorkBG();

        powtcha.startingWorkingBG();

        setTimeout(function() {
            var t2 = new Date();
            powtcha.findNonce().then(function(res) {
                var tt2 = new Date() - t2;

                // if we were working in BG the time should be much smaller than the first time
                // if we weren't working in BG the time should be similar to the first time
                if (canWorkBG) {
                    assert(tt2 < 0.7 * tt1, "tt1=" + tt1 + " tt2=" + tt2);
                } else {
                    assert(tt2 > 0.7 * tt1, "tt1=" + tt1 + " tt2=" + tt2);
                }

                assert.equal(res.nonce, 282381);
                assert.equal(res.extraNonce, 0);
                assert.equal(res.hash, '00001f4ff0639dc8ae6bd5929750d4a3ef5d1b0146c5d5d229b9db9fbe8eadcb');
                assert.equal(res.salt, 'fe23fe23fe23fe23fe23');

                cb();
            })
                .catch(function(err) {
                    cb(err);
                });
        }, tt1);
    });
});
