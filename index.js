const express = require('express')
const bodyParser = require('body-parser');
const app = express();
const winston = require("winston");
const bcrypt = require('bcrypt')
const { users } = require('./models')
const path = require('path');


app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }))
//Adds pathing for linkin ejs files to assets in public folder.
app.use(express.static(path.join(__dirname, '/public')))
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

app.get('/register', (req, res) => {
    res.render('register')
})
app.get('/login', (req, res) => {
  res.render('login')
})

app.post('/register', async (req, res) => {
    const { username, email, password, passwordCheck } = req.body;
    // const existingUser = await users.findOne({ where: { userName } });
    // const existingEmail = await users.findOne({ where: { email } });

    // if (!username || !email || password || passwordCheck){
    //     return res.json({error: 'Username, Email & Password are required.'})
    // }

    // if (existingUser) {
    //     return res.json({error: 'Username is already in use.'
    //     });
    // }

    // if (existingEmail) {
    //     return res.json({error: 'Email is already in use.'
    //     });
    // }
    
    if (password !== passwordCheck) {
        return res.send('Passwords must match.');
    }

    users.create({
        username,
        email,
        password
    })
        .then(() => {
            res.render('register');
        })
})



app.listen(3000, () => {
    console.log('Server is running on port 3000');
})