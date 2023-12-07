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
exports.UserCreateController = void 0;
class UserCreateController {
    constructor(UserCreateUseCase) {
        this.UserCreateUseCase = UserCreateUseCase;
    }
    run(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('controller');
            console.log(req.body);
            const { email, password, } = req.body;
            const status_delet = 'Activo';
            try {
                const createUser = yield this.UserCreateUseCase.run(email, password, status_delet);
                if (createUser instanceof Error) {
                    return res.status(409).send({
                        status: "error",
                        message: createUser.message,
                    });
                }
                if (createUser) {
                    return res.status(201).send({
                        status: "success",
                        data: {
                            createUser
                        },
                    });
                }
                else {
                    return res.status(500).send({
                        status: "error",
                        message: "Se registró un error inesperado mientras se registraban los datos del usuario.",
                    });
                }
            }
            catch (error) {
                return res.status(500).send({
                    status: "error",
                    message: "Ocurrió un error inesperado. Por favor, inténtalo de nuevo más tarde.",
                });
            }
        });
    }
}
exports.UserCreateController = UserCreateController;
