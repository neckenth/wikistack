const express = require ('express');
const morgan = require ('morgan');
const bodyParser = require ('body-parser');
const layout = require ('./views/layout');
const { db, Page, User } = require('./models/index');
const wikiRouter = require('./routes/wiki');
const userRouter = require('./routes/user');

db.authenticate().
then(() => {
    console.log('connected to the database');
})

const app = express();

app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: false }));

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());

app.use('/wiki', wikiRouter);
app.use('/user', userRouter);

app.get('/', (req, res, next) => {
    res.send(layout(''))
})

app.get('/', (req, res, next) => {
    res.redirect('/wiki');
  });

const init = async function () {
    try {
        //why do we sync this way??
        //the hint says models.db, not db.models

        //should we sync the whole db or just each model individually
        //it seems there are a lot of ways to do this - we could use some clarity
        // await Page.sync( {force:true} );
        // await User.sync( {force:true} );
        db.sync( {force:true} );
        // await db.models.page.sync( {force: true} );
        // await db.models.user.sync( {force: true} ); 
    
        app.listen(1337, () => {
            console.log('working');
        })

    } catch(error) {
        console.error(error)
    }

}

init();

