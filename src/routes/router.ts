import todoController from "../controller/todoController"
import express from "express"
const router=express.Router()

router.post('/add',todoController.addTask)
router.get('/get',todoController.getAllTasks)
router.patch('/update/:id',todoController.updateTask)
router.delete('/delete/:id',todoController.deleteTask)


export default router
