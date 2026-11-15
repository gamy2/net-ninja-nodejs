import { Router, type NextFunction, type Request, type Response } from "express";
import Post from '../models/post';
import User from '../models/user';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = Router();

declare global {
    namespace Express {
        interface Request {
            userId?: string;
        }
    }
}

/** 
 
 * admin - login middleware.
 */

const adminLoginMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.token;
    if (!token) {
        return res.render('admin/index', { locals: { title: 'Express Admin Panel', description: "Simple admin panel using Express and EJS" }, layout: 'layouts/admin', error: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');

        if (typeof decoded === 'string' || typeof decoded.userId !== 'string') {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        req.userId = decoded.userId;
        next();
    }
    catch (err) {
        return res.render('admin/index', { locals: { title: 'Express Admin Panel', description: "Simple admin panel using Express and EJS" }, layout: 'layouts/admin', error: 'Unauthorized' });
    }
}






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
            if (!user) {
                return res.status(401).json({ message: 'Invalid username or password' });
            }
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Invalid username or password' });
            }

            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });

            res.cookie('token', token, { httpOnly: true });

            // New version: synchronize the cookie lifetime with the JWT's one-hour expiry.
            // res.cookie('token', token, {
            //     httpOnly: true,
            //     maxAge: 60 * 60 * 1000,
            //     sameSite: 'lax',
            //     secure: process.env.NODE_ENV === 'production',
            // });
            res.redirect('/admin/dashboard');


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

router.get('/dashboard', adminLoginMiddleware, async (req: Request, res: Response) => {

    try {
        const locals = {
            title: 'Admin Dashboard',
            description: 'Admin dashboard'
        };

        res.render('admin/dashboard', { locals, layout: 'layouts/admin' });
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

// New logout route: remove the JWT cookie before it expires.
// router.post('/logout', (_req: Request, res: Response) => {
//     res.clearCookie('token');
//     return res.redirect('/admin');
// });

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

// --------------- basic test login ---------------

/**
 * POST /
 * admin - Check login page.
 */
// router.post('/', async (req: Request, res: Response) => {
//     const locals = {
//         title: 'Express Admin Panel',
//         description: "Simple admin panel using Express and EJS"
//     };
//     try {
//         const { username, password } = req.body;
//         const hashedPassword = await bcrypt.hash(password, 10);

//         try {
//             const user = await User.findOne({ username });
//         }
//         catch (err) { }
//     }
//     catch (err) {
//         console.error(err);
//     }
// });
