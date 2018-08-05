const router = require('express').Router();
const collection = require('../db').Page;
const mongoose = require('mongoose');

router.route('/pages')
    .get((req,res)=>{
        collection.find()
            .exec()
            .then(docs => {
                console.log(docs);
                res.status(200).json(docs);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({error: err});
            });
  })
    .put((req,res)=>{

        collection.findByIdAndUpdate(req.body._id, req.body)
            .exec()
            .then(result => {
                console.log(result);
                res.status(200).json(result);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({error: err});
            });
    })
    .post((req,res) => {
        const page = new collection({
            _id: new mongoose.Types.ObjectId(),
            title: req.body.title,
            body: req.body.body
        });
        page.save().then( result => {
            console.log(result);
            res.status(201).json({
                message: 'Handling POST requests to /pages',
                CreatedPage: page
            });
        })
            .catch(err => {
                console.log(err);
                res.status(500).json({error: err});
            });

    });

router.route('/pages/:id')
    .get((req,res)=>{
        const id = req.params.id;
        collection.findById(id)
            .exec()
            .then( doc => {
            console.log("from database", doc);
            if (doc) {
                res.status(200).json(doc);
            } else {
                res.status(404).json({message: "No valid page found for provided ID"});
            }
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({error: err});
            });
    })

    .delete((req, res)=> {
        const id = req.params.id;
        collection.remove({_id: id})
            .exec()
            .then(result => {
                res.status(200).json(result);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({error: err});
            });
    });

module.exports = router;