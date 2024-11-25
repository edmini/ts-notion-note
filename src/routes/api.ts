
const express = require("express");
const multer = require("multer");
const HandleGoogleData = require("./handleGoogleData")
const router = express.Router()

router.get("/", async (req: any, res: any) => {
  res.json({ "greeing": "Hello World" })
});
router.put("/", async (req: any, res: any) => {
  const data = req.body
  console.log(data)
  const googlData = new HandleGoogleData()
  console.log(googlData.CLIENT_EMAIL)
  res.json({ "greeing": "Hello World" })
});



module.exports = router
