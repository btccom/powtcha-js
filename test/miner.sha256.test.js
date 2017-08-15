var assert = require('assert');
var sha256 = require('../lib/miner/sha256');
var minerUtil = require('../lib/miner/util');

describe('miner.sha256', function() {
    it('sha256', function() {
        var inputBufRaw = Buffer.from('fefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefe', 'hex');

        var data = sha256.sha256_prepare(new Uint8Array(inputBufRaw));
        var hash = sha256.sha256_chunk(sha256.SHA_256_INITIAL_STATE, data);

        assert.equal(
            minerUtil.BufferFromUint32Array(hash).toString('hex'),
            Buffer.from('39dee4431dcf45adc3a4bce9644856163c522ca1d34abd4198cb7fd2c69d9eca', 'hex').toString('hex')
        );
    });
});
