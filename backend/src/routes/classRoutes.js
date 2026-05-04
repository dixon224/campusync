import {Router} from 'express';
import _class from '../models/class.js';
import user from '../models/user.js';
import {auth, teacherOrAdmin} from './auth.js';
const r = Router();

// Create class (Admin/Teacher only)
r.post('/', auth, teacherOrAdmin, async(req,res)=>{
  const {name, teacherId} = req.body;
  const exists = await _class.findOne({name});
  if(exists) return res.status(400).json({message:'Class already exists'});
  const teacher = await user.findById(teacherId);
  if(!teacher || teacher.role!=='teacher') return res.status(400).json({message:'Invalid teacher'});
  const c = await _class.create({name, teacher: teacherId});
  res.json(c);
});

// Student joins class
r.post('/join/:id', auth, async(req,res)=>{
  const c = await _class.findById(req.params.id);
  if(!c) return res.status(404).json({message:'Class not found'});
  if(c.students.includes(req.user.id)) return res.status(400).json({message:'Already joined'});
  c.students.push(req.user.id);
  await c.save();
  res.json(c);
});

export default r;