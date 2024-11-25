
const express = require("express")
const router = express.Router()
const multer = require("multer")
const HandleGoogleData = require("./handleGoogleApi")

router.get("/", async (req: any, res: any) => {
  res.json({ "greeing": "Hello World" })
})
router.post("/", async (req: any, res: any) => {
  const data = req.body
  console.log(data)
  res.json({ "greeing": "Hello World" })
})



module.exports = router
