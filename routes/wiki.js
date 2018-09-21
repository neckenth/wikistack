const express = require ('express');
const router  = express.Router();
const addPage = require ('../views/addPage');
const { Page } = require("../models");

router.get('/', (req, res, next) => {
    res.send('got to Get /wiki/')
})

router.post('/', (req, res, next) => {
    res.json(req.body)
})

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

  // make sure we only redirect *after* our save is complete!
  // note: `.save` returns a promise.
  try {
    await page.save();
    res.redirect('/');
  } catch (error) { next(error) }
});

module.exports = router;