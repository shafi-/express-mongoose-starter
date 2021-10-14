/**
 * Algorithm Name: AES (Advanced Encryption Standard )
    secret key: pTp-sEcReT-eNcRyPt-pAsSwOrD@2020

    Expected URL  Format: https://web.peeptheplace.com/home?token={encrypted phone number)

    Example: https://web.peeptheplace.com/home?token=U2FsdGVkX19tbVpitvZR+e2BoiZsE49oqLMg/K2y4v8=

For the Encryption:

·         Taking the number and converting to a byte Array of characters in Standard UTF-8 Charset.

·         Then applying basic AES encryption to get an array

·         Encoding that array to Base64 String for the final encrypted Message

For the Decryption:

·         First decoding the encrypted Base64 String to byte array

·         Then applying basic AES decryption to get decrypted array

·         Then converting the decrypted array to a String of UTF-8 for the final decrypted message

 

As a result I got the below result:

·         number: 01833182500

·         encrypted message: zvNFLnwcGhNaNjES+E+dlg==
 */
const Crypto = require('crypto-js');

let payload = '01837236472';
let iv = 'adlfjkfda';

let encrypted = Crypto.AES.encrypt(payload, 'shafi').toString();
console.log(encrypted);

encrypted = "zvNFLnwcGhNaNjES+E+dlg==";

encrypted = Crypto.enc.Base64.parse(encrypted);
console.log('base64-parsed ' + encrypted.toString());

let decrypted = Crypto.AES.decrypt(encrypted, 'pTp-sEcReT-eNcRyPt-pAsSwOrD@2020');
console.log('decrypted ' + decrypted);

module.exports = {
    Crypto,
    encrypted,
    secret: 'pTp-sEcReT-eNcRyPt-pAsSwOrD@2020',
}
