import {Router} from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import user from '../models/user.js';
const r = Router();

r.post('/register', async(req,res)=>{
  const {name,email,password,role} = req.body;
  const exists = await user.findOne({email});
  if(exists) return res.status(400).json({message:'User already exists'});
  const hash = await bcrypt.hash(password,10);
  const u = await user.create({name,email,password:hash,role});
  res.json(u);
});

r.post('/login', async(req,res)=>{
  const {email,password} = req.body;
  const u = await user.findOne({email});
  if(!u) return res.status(400).json({message:'User not found'});
  const ok = await bcrypt.compare(password,u.password);
  if(!ok) return res.status(400).json({message:'Wrong password'});
  const token = jwt.sign({id:u._id,role:u.role},process.env.JWT_SECRET,{expiresIn:'7d'});
  res.json({token,user:u});
});

export default r;