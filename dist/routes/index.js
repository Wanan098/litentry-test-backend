"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const api_1 = require("../api");
const router = (0, express_1.Router)();
router.post('/api/v1/access_check', api_1.tokenCheck);
router.get('/api/v1/secret', api_1.apiSecret);
router.post('/api/v1/signin', api_1.apiSignIn);
exports.default = router;
//# sourceMappingURL=index.js.map