import { Router, type Request, type Response } from "express";
import Post from '../models/post';
import User from '../models/user';

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
        console.log(`Username: ${username}, Password: ${password}`);

        res.redirect('admin');
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
