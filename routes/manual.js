import { Router } from 'express'

const router = Router()

router.get('/', (req,res) => {
  let navMenu = [
    { link: '/', icon: 'fas fa-chevron-circle-left', label: 'Back' },
  ]
  res.render('manual/index',{
    navTitle: 'Manual',
    navMenu
  })
})

export default router