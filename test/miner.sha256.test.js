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
    it('sha256 2', function() {
        var inputBufRaw = Buffer.from('70617373776f7264000001aa', 'hex');

        var data = sha256.sha256_prepare(new Uint8Array(inputBufRaw));
        var hash = sha256.sha256_chunk(sha256.SHA_256_INITIAL_STATE, data);

        assert.equal(
            minerUtil.BufferFromUint32Array(hash).toString('hex'),
            Buffer.from('00d678cf79b2813f906619f58395dfb680a450097bc9e1e214d9c4ad9f9f70ca', 'hex').toString('hex')
        );
    });
});
