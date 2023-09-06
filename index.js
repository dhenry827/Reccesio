const express = require('express')
const bodyParser = require('body-parser');
const app = express();
const winston = require("winston");
const bcrypt = require('bcrypt')
const {FEP} = require('./models')

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }))


app.use(express.json())

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [

      new winston.transports.File({ filename: 'error.log', level: 'error' }),
      new winston.transports.File({ filename: 'combined.log' }),
    ],
  });
//get endpoint for rendering password recovery page
  app.get('/password-recovery', (req, res) => {
    res.render('password_recovery'); // Render the EJS template here
  });

  app.post('/password-recovery', (req, res) => {
    //where bcrypt pass recov logic goes
  
    //  recoveryMessage to display
    const recoveryMessage = 'Password recovery instructions sent to your email.';
    res.render('password_recovery', { recoveryMessage });
  });







app.listen(3000, () => {
    console.log('Server is running on port 3000');
})