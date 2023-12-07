"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const sequelize_typescript_1 = require("sequelize-typescript");
const dotenv = __importStar(require("dotenv"));
const userModel_1 = require("../accessManagement/user/infraestructure/models/userModel");
dotenv.config();
class Database {
    constructor() {
        this.POSTGRES_DB = process.env.DB_NAME || "";
        this.POSTGRES_HOST = process.env.DB_HOST || "";
        this.POSTGRES_PORT = 5432;
        this.POSTGRES_USER = process.env.DB_USER || "";
        this.POSTGRES_PASSWORD = process.env.DB_PASSWORD || "";
        this.connectToPostgreSQL();
    }
    waitForConnection(options) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            let retries = 0;
            while (retries < options.retries) {
                try {
                    yield ((_a = this.sequelize) === null || _a === void 0 ? void 0 : _a.authenticate());
                    console.log("✅ PostgreSQL Connection has been established successfully.");
                    return;
                }
                catch (error) {
                    console.error("❌ Connection attempt failed:", error);
                }
                // Espera antes de realizar el próximo intento
                yield new Promise((resolve) => setTimeout(resolve, options.delay));
                retries++;
            }
            console.error(`Failed to connect to the PostgreSQL database after ${options.retries} retries.`);
            process.exit(1);
        });
    }
    connectToPostgreSQL() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(this.POSTGRES_DB);
            this.sequelize = new sequelize_typescript_1.Sequelize({
                database: this.POSTGRES_DB,
                username: this.POSTGRES_USER,
                password: this.POSTGRES_PASSWORD,
                host: this.POSTGRES_HOST,
                port: this.POSTGRES_PORT,
                dialect: "postgres",
                models: [userModel_1.UserModel],
            });
            try {
                yield this.waitForConnection({ retries: 30, delay: 5000 });
                // Realiza otras operaciones necesarias después de la conexión exitosa
            }
            catch (error) {
                console.error("❌ Database connection failed:", error);
            }
        });
    }
}
exports.default = Database;
