import type { NextFunction, Response, Request } from 'express';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import session from 'express-session';
import crypto from 'crypto';
import { UserRepository } from '../../data-source';
import { User } from '../users/entity';
import cookieParser from 'cookie-parser';
import express from 'express';

const router = express.Router();
// Hashing function
function hashPassword(password, salt) {
  return crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
}

// Salt generation function
function generateSalt() {
  return crypto.randomBytes(16).toString('hex');
}

// Password comparison function
function comparePassword(inputPassword, storedHash, storedSalt) {
  const inputHash = hashPassword(inputPassword, storedSalt);
  return inputHash === storedHash;
}

// Define User Authentication Logic
router.use(cookieParser());
router.use(
  session({
    secret: process.env.NX_PUBLIC_SESSION_SECRET || 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24, // 1 day
      secure: false,
    },
  })
);
// Serialize User
passport.serializeUser(function (user: User, done) {
  done(null, user.username);
});

// Deserialize User
passport.deserializeUser(async function (username: string, done) {
  const user = await UserRepository.findOne({
    where: { username: username },
  });
  if (!user) {
    return done(new Error('User not found'));
  }
  done(null, user);
});

router.use(passport.initialize());
router.use(passport.session());

passport.use(
  new LocalStrategy(async function (username, password, done) {
    const user = await UserRepository.findOne({
      where: { username: username },
    });
    if (!user) {
      return done(null, false, { message: 'Incorrect username.' });
    }

    const isMatch = comparePassword(password, user.hashedPassword, user.salt);
    if (isMatch) {
      return done(null, user); // Passwords match
    } else {
      return done(null, false, { message: 'Incorrect password.' }); // Passwords do not match
    }
  })
);

router.post(
  '/session',
  unauthRoute,
  passport.authenticate('local'),
  function (req, res) {
    res.send('ok');
  }
);
router.post('/users', unauthRoute, async (req, res) => {
  const { username, password } = req.body;
  const salt = generateSalt();
  const hashedPassword = hashPassword(password, salt);
  try {
    const newUser = UserRepository.create({
      username: username,
      hashedPassword: hashedPassword,
      salt: salt,
    });

    // Save the new User to the database
    await UserRepository.save(newUser);
    res.send('User created! Please proceed to login');
  } catch (error) {
    console.error('Error creating user:', error);
    if (error.code === 'SQLITE_CONSTRAINT_UNIQUE')
      return res.status(400).send('User Exists!');
    return res.status(500).send('Error creating user');
  }
});
router.delete('/session', passportProtection, function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.send('');
  });
});
export function passportProtection(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.isAuthenticated()) {
    return res.status(401).send("You're not authenticated!");
  }
  next();
}
export function unauthRoute(req: Request, res: Response, next: NextFunction) {
  if (req.isAuthenticated()) {
    return res.send('ok!');
  }
  next();
}

export default router;
