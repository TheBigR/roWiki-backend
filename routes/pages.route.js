const router = require('express').Router();
const collection = require('../db').Page;

router.route('/pages')
    .get((req,res)=>{
        collection.find({}, {_id:0}, (err, data)=> {
            res.json(data);
        });
  });

router.route('/pages/:id')
    .get((req,res)=>{
        console.log(collection);
        const id = req.params.id;
        const page = collection.find({id});
        console.log(page);
        res.json(page);
        })
    .put((req,res)=>{
        const id = parseInt(req.params.id);
        const index = collection.findIndex(post => post.id === id);
        const item = {
            id,
            title: req.body.title,
            body: req.body.body
        };
        (index === -1) ? collection.push(item) : collection[index] = item;
        res.json(item);
    })
    .delete((req, res)=> {
        const id = parseInt(req.params.id);
        const index = collection.findIndex(post => post.id === id);
        if (index !== -1) {
            collection.slice(index, 1);
        }
        res.send(200)
    });

module.exports = router;