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
exports.UserCreateUseCase = void 0;
const hash_1 = require("../../helpers/hash");
class UserCreateUseCase {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    run(email, password, status_delet) {
        return __awaiter(this, void 0, void 0, function* () {
            const hashPassword = yield (0, hash_1.encrypt)(password);
            try {
                if (!email || !hashPassword || !status_delet) {
                    return null;
                }
                const registerUser = yield this.userRepository.createUser(email, hashPassword, status_delet);
                if (registerUser === null) {
                    return null;
                }
                return registerUser;
            }
            catch (error) {
                return null;
            }
        });
    }
}
exports.UserCreateUseCase = UserCreateUseCase;
