const router = require('express').Router();
const collection = require('../db').Page;

router.route('/pages')
    .get((req,res)=>{
        collection.find({}, {_id:0}, (err, data)=> {
            res.json(data);
        });
  });

router.route('/pages/:id')
    .get((req,res, next)=>{
        const id = Object.assign({}, req.params);
        collection.findOne(id, (err, page) => {
            if (err) {
                console.log(err);
                next(err);
            }
            // No Page Found
            if (0 === page.length) next(new Error('No Page Found!'));
            console.log('Get part: ', page);
            res.json(page);
        });
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
    .delete((req, res, next )=> {
        console.log('Del: ', req.body);
        console.log('Del: params: ', req.params);
        const id = Object.assign({}, req.params);

        collection.findOneAndDelete(id, (err, page) => {
            if (err) {
                console.log(err);
                next(err);
            }
            console.log('Deleted page: ', page);
            res.sendStatus(201);
        });
    });

module.exports = router;