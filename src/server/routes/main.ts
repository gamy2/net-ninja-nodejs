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
 * GET /
 * Post Page.
 */
router.get('/post/:id', async (req: Request, res: Response) => {

  try {
    const locals = {
      title: 'Express',
      description: 'Simple App using Express and EJS'
    };
    let slug = req.params.id;
    const data = await Post.findById({ _id: slug });

    res.render('pages/post', { locals, data });
  }
  catch (err) {
    console.error(err);
  }
});


/** 
 * Post /
 * Search Logic.
 */
router.post('/search', async (req: Request, res: Response) => {
  try {
    let searchTerm = req.body.searchTerm; // name of input search in index.ejs
    const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, ""); // remove special characters from search term

    const data = await Post.find({
      $or: [
        { title: { $regex: new RegExp(searchNoSpecialChar, "i") } },
        { body: { $regex: new RegExp(searchNoSpecialChar, "i") } }
      ]
    });
    console.log(data);
    // this was for testing if the search term is being parsed correctly, it works fine
    // res.send (searchNoSpecialChar); 
    res.render("pages/search", { data });
  }
  catch (err) { }
})

router.get('/about', (req: Request, res: Response) => {
  res.render('pages/about', { title: 'About' });
});


export default router;