const app = require("./app")
const { PORT } = require("./config")

app.listen(PORT, () => {
    console.log(`🥷Server running http://localhost:${PORT}`)
})
