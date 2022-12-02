"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenCheck = exports.apiSignIn = exports.apiSecret = void 0;
const util_crypto_1 = require("@polkadot/util-crypto");
const util_1 = require("@polkadot/util");
const config_1 = require("../config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const apiSecret = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
        res.status(201).json({ success: false, message: "Error! Token was not provided." });
    }
    jsonwebtoken_1.default.verify(token, config_1.jwtSecret, (err, decodedToken) => {
        if (err) {
            res.status(201).json({ success: false });
        }
        else {
            res.status(200).json({ success: true, randomMessage: messageGenerator(48) });
        }
    });
});
exports.apiSecret = apiSecret;
const apiSignIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { address, message, signature } = req.body;
    yield (0, util_crypto_1.cryptoWaitReady)();
    const isValid = isValidSignature(message, signature, address);
    try {
        const { address, message, signature } = req.body;
        yield (0, util_crypto_1.cryptoWaitReady)();
        const isValid = isValidSignature(message, signature, address);
        if (isValid) {
            res.status(201).json({ access_token: createAccessToken() });
        }
    }
    catch (error) {
        res.status(400).json({ errorMessage: "Login Failed", status: false });
    }
});
exports.apiSignIn = apiSignIn;
const isValidSignature = (signedMessage, signature, address) => {
    const publicKey = (0, util_crypto_1.decodeAddress)(address);
    const hexPublicKey = (0, util_1.u8aToHex)(publicKey);
    return (0, util_crypto_1.signatureVerify)(signedMessage, signature, hexPublicKey).isValid;
};
const tokenCheck = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
        res.status(201).json({ success: false, message: "Error! Token was not provided." });
    }
    jsonwebtoken_1.default.verify(token, config_1.jwtSecret, (err, decodedToken) => {
        if (err) {
            res.status(201).json({ success: false });
        }
        else {
            res.status(200).json({ success: true });
        }
    });
});
exports.tokenCheck = tokenCheck;
const createAccessToken = () => {
    return jsonwebtoken_1.default.sign({
        iss: config_1.jwtIssuer,
        aud: config_1.jwtAudience,
        exp: Math.floor(Date.now() / 1000) + (60 * 60),
        scope: 'full_access',
        sub: "lalaland|gonto",
        jti: genJti(),
        alg: 'HS256'
    }, config_1.jwtSecret);
};
const genJti = () => {
    let jti = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 16; i++) {
        jti += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return jti;
};
const messageGenerator = (length) => {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};
//# sourceMappingURL=index.js.map