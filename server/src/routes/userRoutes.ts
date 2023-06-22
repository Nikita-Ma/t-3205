import express, {Router} from 'express'
import {getUser} from "../controllers/userControllers";

const router: Router = express.Router()

router.route('/').get(getUser)

export default router