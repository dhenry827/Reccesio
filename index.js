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
  app.get('/password-recovery', (req, res) => {
    const recoveryMessage = null; 
    res.render('password_recovery', { recoveryMessage });
  });



  app.get('/login'  , (req,res) => {
    res.render('login')
  })
  
  app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Retrieve the user from the database using the username
        const user = await users.findOne({ where: { username } });

        if (!user) {
            return res.send('Invalid username or password.');
        }

        // Compare the provided password with the hashed password stored in the database
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) {
            // Passwords match, user is authenticated
            //  set a session or token for authentication here
            return res.send('Login Success'); 
        } else {
            return res.send('Invalid username or password.');
        }
    } catch (error) {
        // Handle any errors that occur during login
        console.error(error);
        res.status(500).send('Login failed. Please try again later.');
    }
});
  

    
 app.post('/password-recovery', async (req, res) => {
    const { email } = req.body;
  
    // ... (password recovery logic)  
  
    // Determine the value of recoveryMessage based on the outcome of the recovery process
    let recoveryMessage = null;
  
    if (!user) {
      recoveryMessage = 'No user with this email exists.';
    } else {
      recoveryMessage = 'Password recovery instructions sent to your email.';
    }
  
    res.render('password_recovery', { recoveryMessage });
  });

app.get('/register', (req, res) => {
    res.render('register')
})


app.post('/register', async (req, res) => {
  const { username, email, password, passwordCheck } = req.body;

  // Check if passwords match
  if (password !== passwordCheck) {
      return res.send('Passwords do not match.');
  }
//  if (existingUser) {
//        return res.json({error: 'Username is already in use.'
//        });
//     }

//    if (existingEmail) {
//        return res.json({error: 'Email is already in use.'
//        });
//     }
  try {
      // Generate a salt and hash the password
      const saltRounds = 10; // You can adjust the number of salt rounds for more security
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // Create a new user with the hashed password
      const newUser = await users.create({
          username,
          email,
          password: hashedPassword, // Store the hashed password in the database
      });
      return res.send('Register Success');
      
  } catch (error) {
      // Handle any errors that occur during registration
      console.error(error);
      res.status(500).send('Registration failed. Please try again later.');
  }
});

app.listen(3000, () => {
  //Function below drops the existing users table whenever and creates a new one whenever it is called. Uncomment it and then run the server if you want to eset the users table. Be sure to comment it back out whenever you are finished using it.
  // users.sync({ force: true })
    console.log('Server is running on port 3000');
})