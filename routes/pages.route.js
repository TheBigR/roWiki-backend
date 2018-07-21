const router = require('express').Router();
const data = require('../db').pages;

router.route('/pages')
    .get((req,res)=>{
      res.json(data);
  });

router.route('/pages/:id')
    .get((req,res)=>{
        const id = parseInt(req.params.id);
        const page = data.find(p => p.id === id);
        res.json(page);
    })
    .put((req,res)=>{
        const id = parseInt(req.params.id);
        const index = data.findIndex(post => post.id === id);
        const item = {
            id,
            title: req.body.title,
            body: req.body.body
        };
        (index === -1) ? data.push(item) : data[index] = item;
        res.json(item);
    })
    .delete((req, res)=> {
        const id = parseInt(req.params.id);
        const index = data.findIndex(post => post.id === id);
        if (index !== -1) {
            data.slice(index, 1);
        }
        res.send(200)
    });

module.exports = router;