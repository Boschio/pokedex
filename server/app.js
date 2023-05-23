const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const security = require("./security")
const authRoutes = require("./routes/auth")
const userRoutes = require("./routes/user")

const { BadRequestError, NotFoundError } = require("./utils/errors")

const app = express()

const corsOptions = {
  origin:'http://localhost:3000', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200,
}

app.use(cors(corsOptions)) //enable cross origin sharing

  app.get('/', function(req, res, next) {
    // Handle the get for this route
  });
  
  app.post('/', function(req, res, next) {
   // Handle the post for this route
  });

// Parse incoming request bodies with JSON payloads
app.use(express.json())

// Log request info
app.use(morgan("tiny"))

// For every req, check if a token exists
// in the auth header
// if it does, attach the decoded user to res.locals
app.use(security.extractUserFromJwt)

app.use("/", authRoutes)
app.use("/", userRoutes)

app.use((req, res, next) => {
    return next(new NotFoundError())
})

app.use((error, req, res, next) => {
    const status = error.status || 500
    const message =error.message

    return res.status(status).json({
        error: { message, status },
    })
})

module.exports = app