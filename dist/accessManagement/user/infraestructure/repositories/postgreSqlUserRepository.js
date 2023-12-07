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
exports.UserRepositoryImpl = void 0;
const hash_1 = require("../../../helpers/hash");
const token_1 = require("../../../helpers/token");
const userModel_1 = require("../../infraestructure/models/userModel");
class UserRepositoryImpl {
    listAllUsers() {
        return userModel_1.UserModel.findAll();
    }
    createUser(email, password, status_delet) {
        return userModel_1.UserModel.create({
            email,
            password,
            status_delet
        });
    }
    loginUser(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield userModel_1.UserModel.findOne({
                    where: {
                        email: email
                    }
                });
                if (!user) {
                    return null;
                }
                const passwordMatches = yield (0, hash_1.compare)(password, user.password);
                if (!passwordMatches) {
                    return 'Unauthorized';
                }
                const token = (0, token_1.tokenSigIn)(user.id, user.email);
                return token;
            }
            catch (error) {
                console.error('Error durante el inicio de sesión:', error);
                throw error;
            }
        });
    }
    deleteUser(userId) {
        return userModel_1.UserModel.destroy({
            where: {
                id: userId
            }
        }).then((deletedRows) => {
            return deletedRows > 0;
        });
    }
    updateUserPassword(id, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const hashPassword = yield (0, hash_1.encrypt)(password);
                const [affectedRows] = yield userModel_1.UserModel.update({ password: hashPassword }, {
                    where: {
                        id: id
                    }
                });
                if (affectedRows === 0) {
                    return null;
                }
                const updatedUser = yield userModel_1.UserModel.findOne({
                    where: {
                        id: id
                    }
                });
                return updatedUser || null;
            }
            catch (error) {
                console.error('Error updating password:', error);
                throw error;
            }
        });
    }
    validateDeletUser(id, status_delet) {
        return __awaiter(this, void 0, void 0, function* () {
            return userModel_1.UserModel.update({ status_delet }, { where: { id } })
                .then(([updatedRows]) => {
                if (updatedRows > 0) {
                    return userModel_1.UserModel.findOne({ where: { id } });
                }
                else {
                    return null;
                }
            })
                .catch((error) => {
                console.error('Error actualizando al artista:', error);
                return error;
            });
        });
    }
}
exports.UserRepositoryImpl = UserRepositoryImpl;
