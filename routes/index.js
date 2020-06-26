const express = require('express');
const router = express.Router();
const { ensureAuth, ensureGuest } = require('../middleware/auth');

// @desc    Login/Landing Page
// @route   GET /
router.get('/', ensureGuest, (req, res) => {
    res.render('login', {
        // To use a different template layout
        layout: 'login'
    });
});

// @desc    Dashboard
// @route   GET /dashboard
router.get('/dashboard', ensureAuth, (req, res) => {
    res.render('dashboard');
});

module.exports = router;