import {Router} from 'express'
import { registro, confirmarMail } from '../controllers/administrador_controller.js'
const router = Router()


router.post('/registro',registro)
router.get('/confirmar/:token',confirmarMail)


export default router