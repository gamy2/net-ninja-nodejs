import { Router, type Request, type Response } from "express";

const router = Router();
//routes
router.get('', (req: Request, res: Response) => {
  res.render('layouts/main.ejs', { title: 'Express' });
});

router.get('/home', (req: Request, res: Response) => {
  res.send('Hello World! from about page');
});


export default router;