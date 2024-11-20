
const express = require("express")
const path = require("path")

const DEFAULT_PORT = process.env.PORT || 3000
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "../public")))
app.use("/dist", express.static(path.join(__dirname, "../dist")))

app.get("/", (req: any, res: any) => {
  res.sendFile(path.join(__dirname, "index.html"))
})

app.get("/*", (req: any, res: any) => {
  res.sendFile(path.join(__dirname, "../public/index.html"))
})


app.listen(DEFAULT_PORT, () => {
  console.log(`Server running on PORT: ${DEFAULT_PORT}`)
})
