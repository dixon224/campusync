import {Router} from 'express'; 
import message from '../models/message.js'; 
import user from '../models/user.js'; 
import {auth,adminOnly} from './auth.js';
const r=Router();

r.get('/', auth, async(req, res) => res.json(await message.find({$or:[{recipient:req.user.id}, {sender:req.user.id}, {type:'notification'}]}).sort({createdAt:-1})));
r.post('/', auth, async(req, res) => res.json(await message.create({sender:req.user.id, recipient:req.body.recipient, content:req.body.content, type:'direct'})));
r.post('/notify', auth, adminOnly, async(req, res) => {res.json(await message.create({sender:req.user.id, content:req.body.content,type:'notification'}));});
export default r;