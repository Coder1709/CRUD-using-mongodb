

import  express  from "express";
import StudentController from "../controllers/StudentController.js";

const router = express.Router();




router.get('/' ,StudentController.index);

router.post('/show' ,StudentController.show);

router.post('/store',StudentController.store);

router.post('/update',StudentController.update);

router.post('/delete' ,StudentController.destroy);


export default router;