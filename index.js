const express = require('express')
const bodyParser = require('body-parser');
const app = express();
const winston = require("winston");
const bcrypt = require('bcrypt')
const { users } = require('./models')

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


app.get('/register', (req, res) => {
    res.render('register')
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