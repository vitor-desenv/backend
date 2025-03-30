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
exports.DetailsUserDesignerController = void 0;
const DetailsUserDesignerService_1 = require("../../services/users/DetailsUserDesignerService");
class DetailsUserDesignerController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user_id = req.user_id;
            const detailsUserDesigner = new DetailsUserDesignerService_1.DetailsUserDesignerService();
            const userDesigner = yield detailsUserDesigner.execute(user_id);
            return res.json(userDesigner);
        });
    }
}
exports.DetailsUserDesignerController = DetailsUserDesignerController;
