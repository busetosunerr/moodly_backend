import { Router } from 'express';
import {blogService} from "../service/blogService";
import { blogController } from "../controller/blogController";
import {authenticate} from "../middleware/auth";
 
const router = Router();

router.route('/blog')
  .get(blogController.getAll)
  .post(authenticate, blogController.create);

router.route('/blog/:id')
  .get(blogController.getById)
  .put(authenticate,blogController.update)
  .delete( authenticate,blogController.delete);



export default router;


