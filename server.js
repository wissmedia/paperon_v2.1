// IMPORT DEPENDENCIES AND REQUIRED FILE
import express from 'express'
import path from 'path'
import dotenv from 'dotenv'
import morgan from 'morgan'
import passport from 'passport'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import methodOverride from 'method-override'
import { fileURLToPath } from 'url'

// IMPORT ROUTES
import AuthRoutes from './routes/auth.js'
import AdminRoutes from './routes/admin.js'
import AuthorRoutes from './routes/author.js'
import RespoRoutes from './routes/respondent.js'
import APIv1Routes from './routes/api_v1.js'
import AnonRoutes from './routes/anon.js'
import ManualRoutes from './routes/manual.js'

//we need to change up how __dirname is used for ES6 purposes
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// IMPORT AUTH AND ROLE MIDDLEWARE
import { ensureAuth, isAuth, ensureAPIAuth } from './middleware/auth.js'
import { isAdmin, isAuthor, ensureAPIRole } from './middleware/role.js'

// LOAD DB CONFIG
import connectDB from './config/db.js'

// LOAD ENV CONFIG
dotenv.config({ path: './config/config.env' })

// LOAD PASSPORT CONFIG
import passportConfig from './config/passport.js'
passportConfig(passport)

// CREATE EXPRESS APP
const app = express()
const PORT = process.env.PORT || 80
const HOST = process.env.HOST || '0.0.0.0'

// GLOBAL VARIABLES
app.locals.appNames = {
  title: 'Paperon',
  subtitle: 'Survei dan Kuesioner',
  version: '1.2.1'
}

// USE BODY PARSER
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// METHOD OVERRIDE (to use PUT and DELETE on front-side js)
app.use(
  methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      // look in urlencoded POST bodies and delete it
      let method = req.body._method
      delete req.body._method
      return method
    }
  })
)

// LOGGER (if on development mode)
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// SET EJS VIEW ENGINE
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')

// SESSIONS
const maxAge = 60 * 60 * 1000 * 24 // 1 day
app.use(session({
  secret: process.env.PASSPORT_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    path: '/',
    httpOnly: true,
    secure: false,
    maxAge: maxAge,
  },
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
}))

// PASSPORT MIDDLEWARE
app.use(passport.initialize())
app.use(passport.session())

// SET USER AS GLOBAL VARIABLE
app.use(function (req, res, next) {
  res.locals.user = req.user || null
  next()
})

// SET STATIC FOLDER
app.use(express.static(path.join(__dirname, 'public')))

// ROUTES LISTS
// @desc    App Root Route
// @route   GET /
// @note    Check if user is authenticate (true -> '/author', false -> '/')
app.get('/', isAuth, (req, res) => {
  res.render('root/index', { navTitle: 'Hello Paperons' })
})

// @desc    App Auth Route
// @route   GET /auth
// @note    Route to authenticated user
app.use('/auth', AuthRoutes)

// @desc    App Admin Route
// @route   GET /admin
// @note    Check if user is authenticate and have role as admin
app.use('/admin', [ensureAuth, isAdmin], AdminRoutes)

// @desc    App Author Route
// @route   GET /author
// @note    Check if user is authenticate and have role as author
app.use('/author', [ensureAuth, isAuthor], AuthorRoutes)

// @desc    App Respondent Route
// @route   GET /respondent
// @note    Authenticated user have role as respondent
app.use('/respondent', ensureAuth, RespoRoutes)

// @desc    API Endpoint Route
// @route   GET /api/v1
// @note    Authenticated user have role as respondent
app.use('/api/v1', [ensureAPIAuth, ensureAPIRole], APIv1Routes)

app.use('/anon', AnonRoutes)
app.use('/manual', ManualRoutes)

// TRY CONNECT TO DB THEN START SERVER
try {
  connectDB().then(() => {
    app.listen(PORT, HOST, () => {
      console.log(`Server Running on: http://${HOST}/${PORT}`)
    })
  })
} catch (error) {
  console.error(error)
  process.exit(1)
}

/**
 *  @desc    Route Not Found (404)
 *  @route   GET /*
 *  @note    If route not found, render this error page
 */
app.use((req, res) => {
  res.status(404).render('alarm')
})