var assert = require('assert');
var sha256 = require('../lib/miner/sha256');
var sha256c = require('../lib/miner/sha256c');
var crypto = require('crypto');

describe('miner.sha256c', function() {

    it('sha256', function() {
        var inputBufRaw = Buffer.from('fefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefe', 'hex');
        var inputBuf = Buffer.alloc(54, 0x00);
        inputBuf.set(inputBufRaw);

        var input = sha256.Uint32ArrayFromBuffer(inputBuf);
        var data = new Uint32Array(16);
        data.set(input);

        console.log(inputBuf);
        console.log(input);
        console.log(data);


        var hash = sha256c.hash(inputBufRaw.toString('hex'), {msgFormat: 'hex-bytes'});
        console.log(hash);

        // var hash = sha256c.hash(inputBuf.toString('hex'), {msgFormat: 'hex-bytes'});
        // console.log(hash);
    })
});
