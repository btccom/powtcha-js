var assert = require('assert');
var minerUtil = require('../lib/miner/util');

describe('miner.util', function() {
    it('Uint32ArrayFromBuffer', function() {
        assert.deepEqual(minerUtil.Uint32ArrayFromBuffer(Buffer.from('70617373776f7264', 'hex')), new Uint32Array([1885434739, 2003792484]));
    });
    it('BufferFromUint32Array', function() {
        assert.deepEqual(minerUtil.BufferFromUint32Array(new Uint32Array([1936941424])).toString('hex'), Buffer.from('73736170', 'hex').toString('hex'));
    });
    it('BufferFromUint32Array neg', function() {
        assert.deepEqual(minerUtil.BufferFromUint32Array(new Uint32Array([-1371437277])).toString('hex'), Buffer.from('ae418723', 'hex').toString('hex'));
    });
});
