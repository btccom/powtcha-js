var assert = require('assert');
var sha256 = require('../lib/miner/sha256');
var crypto = require('crypto');

describe('miner.sha256', function() {
    // it('Uint32ArrayFromBuffer', function() {
    //     assert.deepEqual(sha256.Uint32ArrayFromBuffer(Buffer.from('70617373776f7264', 'hex')), new Uint32Array([1936941424, 1685221239]));
    // });
    // // it('BufferFromUint32Array', function() {
    // //     assert.deepEqual(sha256.BufferFromUint32Array(new Uint32Array([1936941424, 1685221239])).toString('hex'), Buffer.from('70617373776f7264', 'hex').toString('hex'));
    // // });
    // it('BufferFromUint32Array', function() {
    //     assert.deepEqual(sha256.BufferFromUint32Array(new Uint32Array([1936941424])).toString('hex'), Buffer.from('73736170', 'hex').toString('hex'));
    // });
    // it('BufferFromUint32Array neg', function() {
    //     assert.deepEqual(sha256.BufferFromUint32Array(new Uint32Array([-1371437277])).toString('hex'), Buffer.from('ae418723', 'hex').toString('hex'));
    // });

    it('sha256', function() {
        var inputBufRaw = Buffer.from('fefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefe', 'hex');
        var inputBuf = Buffer.alloc(56, 0x00);
        inputBuf.set(inputBufRaw);

        var input = sha256.Uint32ArrayFromBuffer(inputBuf);

        console.log(inputBuf.toString('hex'));
        console.log(input);

        // console.log(crypto.createHash('sha256').update(inputBufRaw).digest().toString('hex'));
        // console.log(crypto.createHash('sha256').update(inputBuf).digest().toString('hex'));
        // -> 63d5eb9db9adbd2079e75f90c58dc0c649fa46f3e60c7c0e664bfd001e5cc508

        var data = sha256.sha256_prepare(new Uint8Array(inputBufRaw));
        var hash = sha256.sha256_chunk(sha256.SHA_256_INITIAL_STATE, data);

        console.log(hash);

        assert.equal(
            sha256.BufferFromUint32Array(hash).toString('hex'),
            Buffer.from('39dee4431dcf45adc3a4bce9644856163c522ca1d34abd4198cb7fd2c69d9eca', 'hex').toString('hex')
        );
    })
});
