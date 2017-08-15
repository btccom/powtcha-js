var Promise = require('es6-promise').Promise;
var miner = require('./miner/miner');
var minerUtil = require('./miner/util');
var webworkifier = require('./webworkifier');

var PoWtcha = {
    useWebWorker: true,
    TARGET: {
        EASY:       0x000fffff, // 20ms
        MEDIUM:     0x00057fff, // 200ms
        HARD:       0x0000ffff, // 1000ms
        VERY_HARD:  0x00001fff // ???
    }
};

PoWtcha.work = function(salt, target) {
    if (!(salt instanceof Buffer)) {
        throw new Error('Salt must be provided as a Buffer');
    }
    if (salt.length <= 0) {
        throw new Error('Salt must not be empty');
    }
    if (salt.length > 48) {
        throw new Error('Salt length must be <= 48');
    }
    if (target <= 0) {
        throw new Error('target must be > 0');
    }

    if (PoWtcha.useWebWorker && webworkifier.isSupported()) {
        return new Promise(function(resolve, reject) {
            /* jshint -W003 */
            var extraNonce = 0;

            var doWork = function(salt) {
                return webworkifier({
                    method: 'miner.scanHash',
                    salt: new Uint8Array(salt),
                    target: target
                }).then(function(result) {
                    if (!result[0]) {
                        extraNonce++;
                        return work();
                    }

                    var nonce = result[0], hash = minerUtil.BufferFromUint32Array(result[1]);

                    return [nonce, extraNonce, hash];
                });
            };

            var work = function() {
                return doWork(new Uint8Array(Buffer.concat([salt, Buffer.from(('00000000' + extraNonce.toString(16)).substr(-8), 'hex')])));
            };

            return work()
                .then(resolve, reject);
        });
    } else {
        var res;
        var extraNonce = -1;
        do {
            extraNonce++;
            res = miner.scanHash(new Uint8Array(Buffer.concat([salt, Buffer.from(('00000000' + extraNonce.toString(16)).substr(-8), 'hex')])), target);
        } while (!res[0]);

        var nonce = res[0], hash = minerUtil.BufferFromUint32Array(res[1]);

        return Promise.resolve([nonce, extraNonce, hash]);
    }
};

module.exports = PoWtcha;
