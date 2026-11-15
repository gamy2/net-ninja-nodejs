import { Router, type Request, type Response } from "express";
import Post from '../models/post';
import User from '../models/user';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = Router();


/** 
 * GET /
 * admin - login page.
 */
router.get('/', async (req: Request, res: Response) => {
    const locals = {
        title: 'Express Admin Panel',
        description: "Simple admin panel using Express and EJS"
    };
    try {
        res.render('admin/index', { locals, layout: 'layouts/admin' });
    }
    catch (err) {
        console.error(err);
    }
});

/** 
 * POST /
 * admin - Check login page.
 */
router.post('/', async (req: Request, res: Response) => {
    const locals = {
        title: 'Express Admin Panel',
        description: "Simple admin panel using Express and EJS"
    };
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        try {
            const user = await User.findOne({ username });
        }
        catch (err) { }
    }
    catch (err) {
        console.error(err);
    }
});



/** 
 * POST /
 * admin - register.
 */
router.post('/register', async (req: Request, res: Response) => {
    const locals = {
        title: 'Express Admin Panel',
        description: "Simple admin panel using Express and EJS"
    };
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        try {
            const user = await User.create({ username, password: hashedPassword });
            res.status(201).json({ message: 'User registered successfully', user });
        }
        catch (err: any) {
            console.error(err);
            if (err.code === 11000) {
                return res.status(409).json({ message: 'Username already exists' });
            }
            res.status(500).json({ message: 'Internal server error' });
        }
    }
    catch (err) {
        console.error(err);
    }
});

export default router;


// --------------- basic router ---------------
// router.get('/admin', async (req: Request, res: Response) => {
//   const locals = {
//     title: 'Express Admin Panel',
//     description: "Simple admin panel using Express and EJS"
//   };
//   try {
//     res.render('index', { locals });
//   }
//   catch (err) {
//     console.error(err);
//   }
// });
