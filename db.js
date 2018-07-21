const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/wiki', {useNewUrlParser:true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('we are connected!');
});

const PageSchema = mongoose.Schema({
   id: Number,
   title: String,
   body: String
});

const Page = mongoose.model('Page', PageSchema);

module.exports = {
    Page
};