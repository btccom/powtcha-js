var sha256 = require('./sha256');

var MAX_NONCE = 0xFFFFFFFF;

/**
 * attempt to find hash that matches the target
 *
 * @param input Uint32Array of max 512 bits (16 32ints), should have 1 unused int that we can use for nonce
 * @param nonceOffset offset in input where to increment the nonce
 * @param target
 * @returns {*}
 */
function scanHash(input, nonceOffset, target) {
    // incremented until we find a hash that matches target (or reach MAX_NONCE)
    var nonce = 0;

    var data = new Uint32Array(13);
    data.set(input);

    data = sha256.sha256_prepare(data);

    while (true) {
        // console.log('nonce', nonce);

        // set the nonce at the defined offset
        data[nonceOffset] = nonce;

        // console.log('data', data);

        // generate the sha256 hash
        var hash = sha256.sha256_chunk(sha256.SHA_256_INITIAL_STATE, data);

        // console.log('hash', hash);
        // console.log(sha256.BufferFromUint32Array(hash).toString('hex'));

        // check if this hash meets the required target
        if (isGoldenHash(hash, target)) {
            return [nonce, hash];
        }

        // @TODO: DEBUG
        if (nonce % 100000 === 0) {
            // console.log('nonce', nonce);
        }

        // stop when we reach max nonce
        if (nonce === MAX_NONCE) {
            console.log('EON: End of Nonce'); // @TODO: DEBUG
            break;
        }

        // increment nonce
        nonce = sha256.safe_add(nonce, 1);
    }

    return [false, null];
}

function isGoldenHash(hash, target) {
    return hash[0] <= target;
}

module.exports = exports = {
    scanHash: scanHash
};
