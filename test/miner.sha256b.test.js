var assert = require('assert');
var sha256 = require('../lib/miner/sha256');
var sha256b = require('../lib/miner/sha256b');
var crypto = require('crypto');

describe('miner.sha256b', function() {

    it('sha256', function() {
        var inputBufRaw = Buffer.from('fefefefe', 'hex');
        var inputBuf = Buffer.alloc(64, 0x00);
        inputBuf.set(inputBufRaw);

        var input = sha256.Uint32ArrayFromBuffer(inputBuf);
        var data = new Uint32Array(16);
        data.set(input);

        console.log(crypto.createHash('sha256').update(inputBuf).digest().toString('hex'));
        // -> 63d5eb9db9adbd2079e75f90c58dc0c649fa46f3e60c7c0e664bfd001e5cc508

        console.log(inputBuf);
        console.log(input);
        console.log(data);


        var hasher = new sha256b();
        hasher.reset();
        var hash = hasher.update(sha256.SHA_256_INITIAL_STATE, data).state;

        console.log(hash);
        console.log(sha256.BufferFromUint32Array(hash).toString('hex'));
    })
});
