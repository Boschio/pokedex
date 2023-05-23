const bcrypt = require("bcrypt")
const { BCRYPT_WORK_FACTOR } = require("../config")
const db = require("../db")
const { BadRequestError, UnauthorizedError, NotFoundError } = require("../utils/errors")

class User {
  static makePublicUser(user) {
    return {
      id: user.id,
      username: user.username,
      firstName: user.first_name,
      lastName: user.last_name,
      createdAt: user.created_at
    }
  }

  static async login(credentials) {
    const requiredFields = ["username", "password"]
    requiredFields.forEach((property) => {
      if (!credentials.hasOwnProperty(property)) {
        throw new BadRequestError(`Missing ${property} in request body.`)
      }
    })

    const user = await User.fetchUserByUsername(credentials.username)
    if (user) {
      const isValid = await bcrypt.compare(credentials.password, user.password)
      if (isValid) {
        return User.makePublicUser(user)
      }
    }

    throw new UnauthorizedError("Invalid username/password")
  }

  static async register(credentials) {
    const requiredFields = ["username", "password", "firstName", "lastName"]
    requiredFields.forEach((property) => {
      if (!credentials.hasOwnProperty(property)) {
        throw new BadRequestError(`Missing ${property} in request body.`)
      }
    })

    const existingUsername = await User.fetchUserByUsername(credentials.username)
    if (existingUsername) {
      throw new BadRequestError(`A user already exists with username: ${credentials.username}`)
    }

    const hashedPassword = await bcrypt.hash(credentials.password, BCRYPT_WORK_FACTOR)

    const userResult = await db.query(
      `INSERT INTO users (username, password, first_name, last_name)
       VALUES ($1, $2, $3, $4)
       RETURNING id, username, first_name, last_name, created_at;
      `,
      [credentials.username, hashedPassword, credentials.firstName, credentials.lastName]
    )
    const user = userResult.rows[0]
    return User.makePublicUser(user)
  }

  static async fetchUserByUsername(username) {
    if (!username) {
      throw new BadRequestError("No username provided")
    }

    const query = `SELECT * FROM users WHERE username = $1`

    const result = await db.query(query, [username.toLowerCase()])

    const user = result.rows[0]

    return user
  }

  static async fetchUserById({userId}) {
    // fetches a user by their id
    const result = await db.query(
      `
        SELECT
                id AS "userId",
                username,
                first_name AS "firstName",
                last_name AS "lastName",
                created_at AS "createdAt"
        FROM users
        WHERE id = $1
      `,
        [userId]
    )
    
    const user = result.rows[0]

    // if(!user) {
    //   throw new NotFoundError("No user was found.")
    // }
    return user
  }

}

module.exports = User