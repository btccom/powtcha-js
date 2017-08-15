var assert = require('assert');

var PoWtcha = require('../').PoWtcha;

describe('PoWtcha', function() {
    it('work1 EASY', function(cb) {
        var salt = Buffer.from('fe23fe23fe23fe23fe23', 'hex');

        PoWtcha.work(salt, PoWtcha.TARGET.EASY).then(function(res) {
            var nonce = res[0], extraNonce = res[1], hash = res[2];
            assert.equal(nonce, 17257);
            assert.equal(extraNonce, 0);
            assert.equal(hash.toString('hex'), '00083a05d3e663172298d78ac73ee9eff7655604932e227c8dfd19710729a301');

            cb();
        })
            .catch(function(err) {
                cb(err);
            });
    });
    it('work1 MEDIUM', function(cb) {
        var salt = Buffer.from('fe23fe23fe23fe23fe23', 'hex');

        PoWtcha.work(salt, PoWtcha.TARGET.MEDIUM).then(function(res) {
            var nonce = res[0], extraNonce = res[1], hash = res[2];
            assert.equal(nonce, 18680);
            assert.equal(extraNonce, 0);
            assert.equal(hash.toString('hex'), '00037ea7ae8fc8c43593dc49e0b35f81773390f3112f7f34ad56eddc094e7b01');

            cb();
        })
            .catch(function(err) {
                cb(err);
            });
    });
    it('work1 VERY_HARD', function(cb) {
        var salt = Buffer.from('fe23fe23fe23fe23fe23', 'hex');

        PoWtcha.work(salt, PoWtcha.TARGET.VERY_HARD).then(function(res) {
            var nonce = res[0], extraNonce = res[1], hash = res[2];
            assert.equal(nonce, 282381);
            assert.equal(extraNonce, 0);
            assert.equal(hash.toString('hex'), '00001f4ff0639dc8ae6bd5929750d4a3ef5d1b0146c5d5d229b9db9fbe8eadcb');

            cb();
        })
            .catch(function(err) {
                cb(err);
            });
    });
});
