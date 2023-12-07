"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("./database/db"));
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const userRouter_1 = require("./accessManagement/user/infraestructure/routes/userRouter");
dotenv_1.default.config();
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.databaseSync();
        this.plugins();
        this.routes();
    }
    plugins() {
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
    }
    databaseSync() {
        var _a;
        const db = new db_1.default();
        (_a = db.sequelize) === null || _a === void 0 ? void 0 : _a.sync();
    }
    routes() {
        this.app.use('/u', userRouter_1.userRouter);
    }
}
const SERVER_PORT = process.env.SERVER_PORT || 3000;
new App().app.listen(SERVER_PORT, () => {
    console.log(`✅ Server run in port ${SERVER_PORT}`);
});
/* import Database from './database/db';
import express, { Application, Request, Response } from "express";
import dotenv from 'dotenv';
import {artistRouter}  from './accessManagement/artists/infraestructure/routes/artistRouter';
import {emailRouter } from './accessManagement/artists/infraestructure/services/emailRouter';

dotenv.config();

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.databaseSync();
    this.plugins();
    this.routes();
  }

  protected plugins(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  protected databaseSync(): void {
    const db = new Database();
    db.sequelize?.sync();
  }

  protected routes(): void {
    this.app.route("/").get((req: Request, res: Response) => {
      res.send("welcome home");
    });
    this.app.use('/api/v1/artist', artistRouter);
    this.app.use('/api/v1/artist/email', emailRouter);
  }
}

const SERVER_PORT = process.env.SERVER_PORT || 3000;

new App().app.listen(SERVER_PORT, () => {
  console.log(`✅ Server run in port ${SERVER_PORT}`);
}); */
