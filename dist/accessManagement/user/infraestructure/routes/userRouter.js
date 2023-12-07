"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const verifyToken_1 = require("../../../helpers/verifyToken");
const dependencies_1 = require("../dependencies");
exports.userRouter = express_1.default.Router();
exports.userRouter.post('/', dependencies_1.userCreateController.run.bind(dependencies_1.userCreateController));
exports.userRouter.post('/login', dependencies_1.loginUserController.run.bind(dependencies_1.loginUserController));
exports.userRouter.get('/', verifyToken_1.validateToken, dependencies_1.listAllUsersController.run.bind(dependencies_1.listAllUsersController));
exports.userRouter.delete('/:id', verifyToken_1.validateToken, dependencies_1.userDeleteController.deleteUser.bind(dependencies_1.userDeleteController));
exports.userRouter.put('/password/:id', verifyToken_1.validateToken, dependencies_1.updatePasswordController.run.bind(dependencies_1.updatePasswordController));
exports.userRouter.put('/validate_delet/:id', dependencies_1.validateDeletUserController.run.bind(dependencies_1.validateDeletUserController));
