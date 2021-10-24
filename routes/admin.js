const router = require('express').Router()

// @desc    Admin Index Page
// @route   GET /admin
router.get('/', (req, res) => {
  let navMenus = [
    { link: '#', icon: 'fas fa-warehouse', label: 'Pertanyaan' },
    { link: '#', icon: 'fas fa-newspaper', label: 'Kuesioner' },
    { link: '#', icon: 'fas fa-poll', label: 'Hasil' },
    { link: '#', icon: 'fas fa-cogs', label: 'Pengaturan' },
    { link: '/', icon: 'fas fa-chevron-circle-left', label: 'Kembali' },
  ]
  let menus = [
    { link: '#', icon: 'fas fa-comments', label: 'Publik' },
    { link: '#', icon: 'fas fa-eye', label: 'Viewer' },
    { link: '#', icon: 'fas fa-bullseye', label: 'Noschema' },
    { link: '#', icon: 'fas fa-bullseye', label: 'Noschema' },
    { link: '#', icon: 'fas fa-bullseye', label: 'Noschema' },
    { link: '#', icon: 'fas fa-bullseye', label: 'Noschema' },
  ]
  res.render('admin/index', { 
    navTitle: 'Admin Panel',
    navMenus,
    menus
  })
})

module.exports = router