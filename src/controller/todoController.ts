import express,{Request,Response} from 'express'
import Task from "../models/Todo"

const addTask=async(req:Request,res:Response)=>{
    try {
        const {task,description,createdAt}=req.body
        const addTaskQuery=new Task({
            task,
            description,
            createdAt
        })
        await addTaskQuery.save()
        res.status(200).send({message:"Success fully Added Task"})
    } catch (error) {
        console.log(error)
        res.status(500).send({error:"Internal Server Error"})
    }
}

const getAllTasks=async(req:Request,res:Response)=>{
try {
    const getTaskQuery=await Task.find()
    res.status(200).send({pendingTasks:getTaskQuery})
} catch (error) {
    console.log(error)
    res.status(500).send({error:"Internal Server"})
}
}

const updateTask=async(req:Request,res:Response)=>{
    try {
        const {task,description}=req.body
        const updateQuery=await Task.findByIdAndUpdate(req.params.id,{
            task,
            description
        })
        if(!updateQuery){
            res.status(401).send({error:"Id not found"})
        }
        res.status(200).send({message:"updated Successfully"})
    } catch (error) {
        console.log(error)
        res.status(500).send({error:"Internal Server Error"})
    }
}

const deleteTask=async(req:Request,res:Response)=>{
    try {
        const deletTaskQuery=await Task.findByIdAndDelete(req.params.id)
        if(!deletTaskQuery){
            res.status(401).send({error:"id is not found"})
        }
        res.status(200).send({message:"user deleted successfully"})
    } catch (error) {
        console.log(error)
        res.status(500).send({error:"Internal Server Error"})
    }
}

export default {addTask,getAllTasks,updateTask,deleteTask}