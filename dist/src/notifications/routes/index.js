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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
/* Actions */
const actions_1 = require("../actions");
const router = (0, express_1.Router)();
/* This is a route that is called when the user navigates to the /notifications route. */
router.get('/notifications', (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, actions_1.reportNotification)(res);
    yield (0, actions_1.revisitsNotification)(res);
    yield (0, actions_1.coursesNotification)(res);
    return res.status(200).json({
        msg: 'Notifications sent successfully',
        status: 200
    });
}));
exports.default = router;
//# sourceMappingURL=index.js.map