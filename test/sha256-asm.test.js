var assert = require('assert');
var sha256 = require('../lib/miner/sha256');


describe('miner.sha256', function() {
    it('Uint32ArrayFromBuffer', function() {
        assert.deepEqual(sha256.Uint32ArrayFromBuffer(Buffer.from('70617373776f7264', 'hex')), new Uint32Array([1936941424, 1685221239]));
    });
    it('BufferFromUint32Array', function() {
        assert.deepEqual(sha256.BufferFromUint32Array(new Uint32Array([1936941424, 1685221239])).toString('hex'), Buffer.from('70617373776f7264', 'hex').toString('hex'));
    });
});
