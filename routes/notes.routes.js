const express = require("express")
const { auth } = require("../middleware/auth.middleware")
const {NotesModel} = require("../models/notes.model")
const notesRouter = express.Router()

notesRouter.get("/",auth, async(req,res)=>{
    try {
       const notes = await NotesModel.find({userID:req.body.userID}) 
       res.status(200).json(notes)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
})

notesRouter.post("/create",auth, async(req,res)=>{
    console.log(req.body);
    try {
        const note = new NotesModel(req.body)
        await note.save()
        res.status(200).json({msg:"New note has been added",note})
    } catch (error) {
        res.status(400).json({error:error.message})
    }
})

notesRouter.patch("/update/:id",auth, async(req,res)=>{
    const {id} = req.params;
    const payload = req.body;
    const userIDinUserDoc = req.body.userID;
    try {
        const note = await NotesModel.findOne({_id:id})
        const noteIDinNoteDoc = note.userID;
        if(userIDinUserDoc === noteIDinNoteDoc){
            await NotesModel.findByIdAndUpdate({_id:id},req.body)
            res.status(200).json({msg:"Note has been updated"})
        }else{
            res.status(200).json({msg:"Not authorized"})

        }
        
    } catch (error) {
        res.status(400).json({error:error.message})
    }
})

notesRouter.delete("/delete/:id",auth, async(req,res)=>{
    const {id} = req.params;
    const userIDinUserDoc = req.body.userID;
    try {
        const note = await NotesModel.findOne({_id:id})
        const noteIDinNoteDoc = note.userID;
        if(noteIDinNoteDoc === userIDinUserDoc){
            await NotesModel.findByIdAndDelete({_id:id})
            res.status(200).json({msg:"Note has been deleted"})
        }else{
            res.status(200).json({msg:"Not authorized"})
        }
    } catch (error) {
        res.status(400).json({error:error.message})
    }
})

module.exports = {
    notesRouter
}