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
exports.ValidateDeletUserController = void 0;
const sequelize_1 = require("sequelize");
class ValidateDeletUserController {
    constructor(validateDeletUserUseCase) {
        this.validateDeletUserUseCase = validateDeletUserUseCase;
    }
    run(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { id } = req.params;
                let { status_delet } = req.body;
                let updatedArtist;
                try {
                    updatedArtist = yield this.validateDeletUserUseCase.run(parseInt(id), status_delet);
                }
                catch (error) {
                    if (error instanceof sequelize_1.ValidationError) {
                        const errors = error.errors.map((validationError) => ({
                            message: validationError.message,
                            type: validationError.type,
                            path: validationError.path,
                            value: validationError.value,
                        }));
                        return res.status(400).json({
                            status: "error",
                            message: "Error de validación",
                            errors,
                        });
                    }
                    throw error;
                }
                return res.status(201).json({
                    status: "success",
                    message: "Estado modificado con éxito",
                    updatedArtist,
                });
            }
            catch (error) {
                console.error("Error update status:", error);
                return res.status(500).json({
                    status: "error",
                    message: "Error al modificar el estado",
                });
            }
        });
    }
}
exports.ValidateDeletUserController = ValidateDeletUserController;
