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
exports.UserDeleteUseCase = void 0;
class UserDeleteUseCase {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    run(id) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(id);
            try {
                console.log(this.userRepository.deleteUser);
                const deleted = yield this.userRepository.deleteUser(id);
                console.log(deleted);
                if (deleted) {
                    return true;
                }
                else {
                    throw new Error(`No se pudo eliminar el usuario con el ID ${id}.`);
                }
            }
            catch (error) {
                console.error(`Error al eliminar el usuario con el ID ${id}:`, error);
                throw error;
            }
        });
    }
}
exports.UserDeleteUseCase = UserDeleteUseCase;
