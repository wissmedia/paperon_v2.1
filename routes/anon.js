import { Router } from 'express'

const router = Router()

router.get('/', (req, res) => {
  res.json({ mess: 'anon' })
})

export default router