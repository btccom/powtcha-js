/* jshint -W101 */
var assert = require('assert');

var PoWtcha = require('../').PoWtcha;

describe('PoWtcha', function() {
    it('hash', function() {
        assert.equal(PoWtcha.hash(Buffer.from('fe23fe23fe23fe23fe23', 'hex'), 0, 17257).toString('hex'), "00083a05d3e663172298d78ac73ee9eff7655604932e227c8dfd19710729a301");
        assert.equal(PoWtcha.hash(Buffer.from('fe23fe23fe23fe23fe23', 'hex'), 0, 18680).toString('hex'), "00037ea7ae8fc8c43593dc49e0b35f81773390f3112f7f34ad56eddc094e7b01");
        assert.equal(PoWtcha.hash(Buffer.from('fe23fe23fe23fe23fe23', 'hex'), 0, 282381).toString('hex'), "00001f4ff0639dc8ae6bd5929750d4a3ef5d1b0146c5d5d229b9db9fbe8eadcb");
        assert.equal(PoWtcha.hash(Buffer.from('fe23fe23fe23fe23fe23', 'hex'), 282381, 282381).toString('hex'), "4638a7d8e7d55e1d48fdcf3695c693b7c1b73df93c583ba63cfa8da091833b14");
        assert.equal(PoWtcha.hash(Buffer.from('fe23fe23', 'hex'), 0, 17257).toString('hex'), "3a5746cdf2fda8f7928f9e60a2704ee29ae81206eff8e2394e9efeedd736f175");
        assert.equal(PoWtcha.hash(Buffer.from('fe23fe23fe23fe23fe23fe23fe23fe23', 'hex'), 0, 17257).toString('hex'), "295aaf021ab3d76cc2955f5185aa4ce5dec2b436dc5be91bddf26b06d3f84547");
    });

    it('validateTarget', function() {
        var vectors = [
            [Buffer.from('00083a05d3e663172298d78ac73ee9eff7655604932e227c8dfd19710729a301', 'hex'), 0x000fffff, 0x00057fff],
            [Buffer.from('00037ea7ae8fc8c43593dc49e0b35f81773390f3112f7f34ad56eddc094e7b01', 'hex'), 0x00057fff, 0x0000ffff],
            [Buffer.from('00001f4ff0639dc8ae6bd5929750d4a3ef5d1b0146c5d5d229b9db9fbe8eadcb', 'hex'), 0x0000ffff, null],
            [Buffer.from('4638a7d8e7d55e1d48fdcf3695c693b7c1b73df93c583ba63cfa8da091833b14', 'hex'), null, 0x0fffffff]
        ];

        vectors.forEach(function(vector) {
            var hash = vector[0];
            var shouldMatchTarget = vector[1];
            var shouldNotMatchTarget = vector[2];

            if (shouldMatchTarget) {
                assert(PoWtcha.validateTarget(hash, shouldMatchTarget));
            }
            if (shouldNotMatchTarget) {
                assert(!PoWtcha.validateTarget(hash, shouldNotMatchTarget));
            }
        });
    });

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
