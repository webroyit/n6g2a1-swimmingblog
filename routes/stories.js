const express = require('express');
const router = express.Router();

const { ensureAuth } = require('../middleware/auth');
const Story = require('../models/Story');

// @desc    Story Form
// @route   GET /stories/add
router.get('/add', ensureAuth, (req, res) => {
    res.render('stories/add');
});

// @desc    Process Story Form
// @route   POST /stories
router.post('/', ensureAuth, async (req, res) => {
    try{
        req.body.user = req.user.id;

        await Story.create(req.body);

        res.redirect('/dashboard');
    }catch(err){
        console.error(344);
        res.render('error/500');
    }
});

// @desc    Story all stories
// @route   GET /stories
router.get('/', ensureAuth, async (req, res) => {
    try{
        const stories = await Story.find({ status: 'public'})
            .populate('user')
            .sort({ createAt: 'desc'})
            .lean();

        res.render('stories/index', {
            stories
        })
    }catch(err){
        console.error(err);
        res.render('error/500');
    }
});

// @desc    Show edit page
// @route   GET /stories/edit/:id
router.get('/edit/:id', ensureAuth, async (req, res) => {
    const story = await Story.findOne({
        _id: req.params.id
    }).lean();

    if(!story){
        return res.res.render('error/404');
    }

    if(story.user != req.user.id){
        res.redirect('stories');
    }
    else{
        res.render('stories/edit', {
            story
        });
    }

    res.render('stories/add');
});

module.exports = router;