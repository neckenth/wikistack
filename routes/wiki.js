const express = require ('express');
const router  = express.Router();
const addPage = require ('../views/addPage');
const { Page } = require("../models");

router.get('/', (req, res, next) => {
    res.send('got to Get /wiki/')
})

router.post('/', async (req, res, next) => {
    const page = new Page(req.body)
    try {
        await page.save();
        res.redirect('/');
    } catch(error) {
        next(error)
    }
});

router.get('/add', (req, res, next) => {
    res.send(addPage())
})


router.post('/', async (req, res, next) => {
    let title = req.body.title;
    let content = req.body.content;

  const page = new Page({
    title: title,
    content: content
  });
});

router.get('/wiki/:slug', (req, res, next) => {
    res.send(req.params.slug)
})

module.exports = router;