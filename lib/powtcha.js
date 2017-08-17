var Promise = require('es6-promise').Promise;
var miner = require('./miner/miner');
var minerUtil = require('./miner/util');
var webworkifier = require('./webworkifier');

var PoWtcha = function(options) {
    if (typeof options.salt !== "undefined") {
        if (!(options.salt instanceof Buffer)) {
            throw new Error('Salt must be provided as a Buffer');
        }
        if (options.salt.length <= 0) {
            throw new Error('Salt must not be empty');
        }
        if (options.salt.length > 48) {
            throw new Error('Salt length must be <= 48');
        }

        this.salt = options.salt;
    } else {
        throw new Error("Salt missing");
    }

    if (typeof options.target !== "undefined") {
        if (options.target <= 0) {
            throw new Error('Target must be > 0');
        }

        this.target = options.target;
    } else {
        this.target = PoWtcha.TARGET.MEDIUM;
    }

    this.useWebWorker = typeof options.useWebWorker !== "undefined" ? !!options.useWebWorker : true;

    this.working = null;
};

PoWtcha.TARGET = {
    EASY:       0x000fffff, // 20ms
    MEDIUM:     0x00057fff, // 200ms
    HARD:       0x0000ffff, // 1000ms
    VERY_HARD:  0x00001fff // ???
};

/**
 * start working in the background if possible to work async (webworker)
 */
PoWtcha.prototype.startingWorkingBG = function() {
    var self = this;

    if (self.canWorkBG()) {
        self.findNonce();
    }
};

PoWtcha.prototype.canWorkBG = function() {
    var self = this;

    return self.useWebWorker && webworkifier.isSupported();
};

PoWtcha.prototype.findNonce = function() {
    var self = this;

    if (!self.working) {
        self.working = self._work();
    }

    return self.working;
};

PoWtcha.prototype._work = function(useWebWorker) {
    var self = this;

    useWebWorker = typeof useWebWorker !== "undefined" ? useWebWorker : true;

    if (useWebWorker && self.useWebWorker && webworkifier.isSupported()) {
        return new Promise(function(resolve, reject) {
            /* jshint -W003 */
            var extraNonce = 0;

            var doWork = function(salt) {
                return webworkifier({
                    method: 'miner.scanHash',
                    salt: new Uint8Array(salt),
                    target: self.target
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
                return doWork(new Uint8Array(Buffer.concat([self.salt, Buffer.from(('00000000' + extraNonce.toString(16)).substr(-8), 'hex')])));
            };

            return work()
                .then(resolve, reject);
        });
    } else {
        var res;
        var extraNonce = -1;
        do {
            extraNonce++;
            res = miner.scanHash(new Uint8Array(Buffer.concat([self.salt, Buffer.from(('00000000' + extraNonce.toString(16)).substr(-8), 'hex')])), self.target);
        } while (!res[0]);

        var nonce = res[0], hash = minerUtil.BufferFromUint32Array(res[1]);

        return Promise.resolve([nonce, extraNonce, hash]);
    }
};

module.exports = PoWtcha;
