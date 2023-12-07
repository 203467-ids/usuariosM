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
exports.UpdatePasswordController = void 0;
class UpdatePasswordController {
    constructor(updatePasswordUseCase) {
        this.updatePasswordUseCase = updatePasswordUseCase;
    }
    run(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { password } = req.body;
                const updatedUser = yield this.updatePasswordUseCase.run(parseInt(id), password);
                if (updatedUser) {
                    return res.status(201).send({
                        status: "success",
                        message: "Contraseña actualizada con éxito",
                    });
                }
                else {
                    return res.status(500).send({
                        status: "error",
                        message: "No se encontró o no se puede actualizar la contraseña",
                    });
                }
            }
            catch (error) {
                console.error("Error update status:", error);
                return res.status(500).send({
                    status: "error",
                    message: "Error al actualizar la contraseña: ", error,
                });
            }
        });
    }
}
exports.UpdatePasswordController = UpdatePasswordController;
