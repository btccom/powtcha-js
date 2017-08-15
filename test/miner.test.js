var assert = require('assert');
var miner = require('../lib/miner/miner');
var minerUtil = require('../lib/miner/util');


describe('miner', function() {
    it('scanHash1', function() {
        var salt = Buffer.from('70617373776f7264', 'hex');

        var res = miner.scanHash(salt, 0x00ffffff);
        var nonce = res[0], hash = res[1];

        assert.equal(nonce, 426);
        assert.equal(minerUtil.BufferFromUint32Array(hash).toString('hex'), "00d678cf79b2813f906619f58395dfb680a450097bc9e1e214d9c4ad9f9f70ca");
    });
    it('scanHash2', function() {
        var salt = Buffer.from('fe23fe23fe23fe23fe23', 'hex');

        var res = miner.scanHash(salt, 0x000fffff);
        var nonce = res[0], hash = res[1];

        assert.equal(nonce, 3514);
        assert.equal(minerUtil.BufferFromUint32Array(hash).toString('hex'), "000b8e3a9223b4b41db6068d7b0974d52808c7a197d0ef4544ce96fd05934d2d");
    });
    it('scanHash3', function() {
        var salt = Buffer.from('fe23fe23fe23fe23fe23', 'hex');

        var res = miner.scanHash(salt, 0x00057fff);
        var nonce = res[0], hash = res[1];

        assert.equal(nonce, 11131);
        assert.equal(minerUtil.BufferFromUint32Array(hash).toString('hex'), "00050b9fc5c037f3ce3818ba21f718ee3cbf994e63d895d08a05a171799e9ab1");
    });
});
