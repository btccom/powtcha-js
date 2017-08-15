var assert = require('assert');
var sha256 = require('../lib/miner/sha256');
var miner = require('../lib/miner/miner');


describe('miner', function() {
    it('scanHash', function() {
        var salt = sha256.Uint32ArrayFromBuffer(Buffer.from('70617373776f7264', 'hex'));
        var data = new Uint32Array(salt.length + 1);
        data.set(salt, 0);

        var t = new Date;

        console.log(data);

        var res = miner.scanHash(data, data.length - 1, 0x00afffff);
        var nonce = res[0], hash = res[1];

        console.log(nonce, new Date - t);
        console.log(sha256.BufferFromUint32Array(hash).toString('hex'));
    });

    it('scanhash1', function() {
        var salt = sha256.Uint32ArrayFromBuffer(Buffer.from('70617373776f7263', 'hex'));
        var data = new Uint32Array(salt.length + 1);
        data.set(salt, 0);

        var t = new Date;

        console.log(data);

        var res = miner.scanHash(data, data.length - 1, 0x00afffff);
        var nonce = res[0], hash = res[1];

        console.log(nonce, new Date - t);
        console.log(sha256.BufferFromUint32Array(hash).toString('hex'));
    });

    it('scanhash2', function() {
        var salt = sha256.Uint32ArrayFromBuffer(Buffer.from('70617373776f7264', 'hex'));
        var data = new Uint32Array(salt.length + 1);
        data.set(salt, 0);

        var t = new Date;

        console.log(data);

        var res = miner.scanHash(data, data.length - 1, 0x0000ffff);
        var nonce = res[0], hash = res[1];

        console.log(nonce, new Date - t);
        console.log(sha256.BufferFromUint32Array(hash).toString('hex'));
    });

    it('scanhash2b', function() {
        var salt = sha256.Uint32ArrayFromBuffer(Buffer.from('70617373776f7263', 'hex'));
        var data = new Uint32Array(salt.length + 1);
        data.set(salt, 0);

        var t = new Date;

        console.log(data);

        var res = miner.scanHash(data, data.length - 1, 0x0000ffff);
        var nonce = res[0], hash = res[1];

        console.log(nonce, new Date - t);
        console.log(sha256.BufferFromUint32Array(hash).toString('hex'));
    });

    it('scanhash3', function() {
        var salt = sha256.Uint32ArrayFromBuffer(Buffer.from('70617373776f7264', 'hex'));
        var data = new Uint32Array(salt.length + 1);
        data.set(salt, 0);

        var t = new Date;

        console.log(data);

        var res = miner.scanHash(data, data.length - 1, 0x00008fff);
        var nonce = res[0], hash = res[1];

        console.log(nonce, new Date - t);
        console.log(sha256.BufferFromUint32Array(hash).toString('hex'));
    });

    it('scanhash3b', function() {
        var salt = sha256.Uint32ArrayFromBuffer(Buffer.from('70617373776f7263', 'hex'));
        var data = new Uint32Array(salt.length + 1);
        data.set(salt, 0);

        var t = new Date;

        console.log(data);

        var res = miner.scanHash(data, data.length - 1, 0x00008fff);
        var nonce = res[0], hash = res[1];

        console.log(nonce, new Date - t);
        console.log(sha256.BufferFromUint32Array(hash).toString('hex'));
    });

    it('scanhash4', function() {
        var salt = sha256.Uint32ArrayFromBuffer(Buffer.from('70617373776f7264', 'hex'));
        var data = new Uint32Array(salt.length + 1);
        data.set(salt, 0);

        var t = new Date;

        console.log(data);

        var res = miner.scanHash(data, data.length - 1, 0x000008ff);
        var nonce = res[0], hash = res[1];

        console.log(nonce, new Date - t);
        console.log(sha256.BufferFromUint32Array(hash).toString('hex'));
    });

    it('scanhash4b', function() {
        var salt = sha256.Uint32ArrayFromBuffer(Buffer.from('70617373776f7262', 'hex'));
        var data = new Uint32Array(salt.length + 1);
        data.set(salt, 0);

        var t = new Date;

        console.log(data);

        var res = miner.scanHash(data, data.length - 1, 0x000008ff);
        var nonce = res[0], hash = res[1];

        console.log(nonce, new Date - t);
        console.log(sha256.BufferFromUint32Array(hash).toString('hex'));
    });
});
