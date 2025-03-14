const express = require('express');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const bodyParser = require('body-parser');
const path = require('path');
const methodOverride = require('method-override');
const formRoutes = require('./routes/forms');

const app = express();

mongoose.connect('mongodb://localhost:27017/dynamicForms', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('MongoDB connection open');
})
.catch(err => {
    console.log('MongoDB connection error:', err);
});

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.use('/', formRoutes);

app.get('/', (req, res) => {
    res.render('index');
});

const PORT = process.env.PORT || 3001; 
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});