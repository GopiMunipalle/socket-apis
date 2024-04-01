"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const todoController_1 = __importDefault(require("../controller/todoController"));
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.post('/add', todoController_1.default.addTask);
router.get('/get', todoController_1.default.getAllTasks);
router.patch('/update/:id', todoController_1.default.updateTask);
router.delete('/delete/:id', todoController_1.default.deleteTask);
exports.default = router;
