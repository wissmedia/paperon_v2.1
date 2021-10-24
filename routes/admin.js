const router = require('express').Router()
const link = '/admin'

// @desc    Admin Index Page
// @route   GET /admin
router.get('/', (req, res) => {
  let navMenus = [
    { link: '/respondent', icon: 'fas fa-chevron-circle-left', label: 'Respondent' },
    { link: '/author', icon: 'fas fa-chevron-circle-right', label: 'Author' },
  ]
  let UserMenu = [
    { link: `${link}/user-promote`, icon: 'fas fa-user-plus', label: 'Promote to Author' },
    { link: `${link}/user-demote`, icon: 'fas fa-user-minus', label: 'Demote to Responden' },
    { link: `${link}/user-block`, icon: 'fas fa-user-slash', label: 'Block User' },
    { link: `${link}/user-delete`, icon: 'fas fa-user-times', label: 'Delete User' },
    { link: `${link}/user-edit`, icon: 'fas fa-user-edit', label: 'Edit User' },
    { link: `${link}/user-setting`, icon: 'fas fa-user-cog', label: 'Add Setting' },
    { link: '#', icon: 'fas fa-bug', label: 'Need Update Later' },
  ]
  let QformMenu = [
    { link: '#', icon: 'fas fa-bug', label: 'Need Update Later' },
  ]
  res.render('admin/index', { 
    navTitle: 'Admin Panel',
    navMenus,
    UserMenu,
    QformMenu
  })
})

// @desc    Promote to Author Page
// @route   GET /admin/user-promote
router.get('/user-promote', (req,res) => {
  res.render('admin/user-promote', {
    navTitle: 'Promote to Author'
  })
})

module.exports = router