const router = require('express').Router();
const collection = require('../db').Page;
const mongoose = require('mongoose');

router.route('/pages')
    .get((req,res)=>{
        collection.find({},  (err, data)=> {
            res.json(data);
        });
  })
    .post((req,res,next) => {
        const page = new collection({
            _id: new mongoose.Types.ObjectId(),
            title: req.body.title,
            body: req.body.body
        });
        page.save().then( result => {
            console.log(result);
        })
            .catch(err => console.log(err));
        res.status(201).json({
            message: 'Handling POST requests to /pages',
            CreatedPage: page
        });
    });

router.route('/pages/:id')
    .get((req,res, next)=>{
        const id = req.params.id;
        collection.findById(id)
            .exec()
            .then( doc => {
            console.log(doc);
            res.status(200).json(doc);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({error: err});
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