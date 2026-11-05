import { Router, type Request, type Response } from "express";

const router = Router();
//routes
router.get('', (req: Request, res: Response) => {
  const locals = { title: 'Express',
     description: 'Simple App using Express and EJS' };

  res.render('index', {locals});
});

router.get('/about', (req: Request, res: Response) => {
  res.render('pages/about', { title: 'About' });
});


export default router;