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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Todo_1 = __importDefault(require("../models/Todo"));
const addTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { task, description, createdAt } = req.body;
        const addTaskQuery = new Todo_1.default({
            task,
            description,
            createdAt
        });
        yield addTaskQuery.save();
        res.status(200).send({ message: "Success fully Added Task" });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ error: "Internal Server Error" });
    }
});
const getAllTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getTaskQuery = yield Todo_1.default.find();
        res.status(200).send({ pendingTasks: getTaskQuery });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ error: "Internal Server" });
    }
});
const updateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { task, description } = req.body;
        const updateQuery = yield Todo_1.default.findByIdAndUpdate(req.params.id, {
            task,
            description
        });
        if (!updateQuery) {
            res.status(401).send({ error: "Id not found" });
        }
        res.status(200).send({ message: "updated Successfully" });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ error: "Internal Server Error" });
    }
});
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletTaskQuery = yield Todo_1.default.findByIdAndDelete(req.params.id);
        if (!deletTaskQuery) {
            res.status(401).send({ error: "id is not found" });
        }
        res.status(200).send({ message: "user deleted successfully" });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ error: "Internal Server Error" });
    }
});
exports.default = { addTask, getAllTasks, updateTask, deleteTask };
