var createError = require('http-errors');
var express = require('express');
var cors = require('cors');
const db = require('./db');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');








// Initialize the SQLite database and create the users table
db.serialize(() => {
  console.log('Database serialized');
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL,
      email TEXT NOT NULL,
      password TEXT NOT NULL,
      role TEXT NOT NULL
    );
  `, (err) => {
    if (err) {
      console.error('Error creating table:', err.message);
    } else {
      console.log('Table created successfully');
    }
  });
});




var indexRouter = require('./routes/index');
const userRouter = require('./routes/user');
var app = express();



app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());
app.use('/', indexRouter);
app.use('/user', userRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
  console.log('Requested URL:', req.url);

});



// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });

module.exports = app;
