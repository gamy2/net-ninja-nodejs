import { Router, type Request, type Response } from "express";
import Post from '../models/post';

const router = Router();



/** 
 * GET /
 * Home page.
 */
router.get('', async (req: Request, res: Response) => {
  const locals = {
    title: 'Express',
    description: 'Simple App using Express and EJS'
  };
  try {
    const data = await Post.find();
    res.render('index', { locals, data });
  }
  catch (err) {
    console.error(err);
  }
});

// function InsertPost(){
//   Post.insertMany([
//     {title: 'Post One', body: 'This is post one'},
//     {title: 'Post Two', body: 'This is post two'},
//     {title: 'Post Three', body: 'This is post three'},
//   ])  
// }
// InsertPost();

/**
 * we will make a slug route next commit  
 * router.get('/post/:id', async (req: Request, res: Response) => {});
*/

router.get('/about', (req: Request, res: Response) => {
  res.render('pages/about', { title: 'About' });
});


export default router;