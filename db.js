const mongoose = require('mongoose');

//mongoose.connect('mongodb+srv://wikAdmin:' + process.env.MONGO_ATLAS_PW + '@royscluster-7svan.mongodb.net/test?retryWrites=true', {useNewUrlParser:true});
mongoose.connect('mongodb+srv://wikAdmin:wiki@royscluster-7svan.mongodb.net/test?retryWrites=true', {useNewUrlParser:true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('we are connected!');
});

const PageSchema = mongoose.Schema({
   id: mongoose.Schema.Types.ObjectId,
   title: {type: String, required: true},
   body: {type: String, required: true}
});

const Page = mongoose.model('Page', PageSchema);

module.exports = {
Page
};