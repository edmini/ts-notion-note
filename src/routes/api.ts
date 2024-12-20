
const express = require("express");
const multer = require("multer");
const HandleGoogleData = require("./handleGoogleData")
const router = express.Router()

router.get("/", async (req: any, res: any) => {
  const googleData = new HandleGoogleData()
  await googleData.getSheetData()
  res.json(googleData.result)
});
router.post("/", async (req: any, res: any) => {
  const data = req.body
  console.log(data)
  const appendValue = [data.row === 0 ? "=row()" : data.row, data._id, data.title, data.content, data.isArchived, data.isPublished, data.isFavorited, data.parentId, data.level, data.coverImage, data.icon, data.userId, data.createdAt]
  const googleData = new HandleGoogleData()
  await googleData.appendData(appendValue)
  res.json({ status: googleData.status })
})
router.put("/", async (req: any, res: any) => {
  const data = req.body
  console.log(data)
  const googleData = new HandleGoogleData()
  await googleData.updateData([data.value], data.range)
  res.json({ status: googleData.status })
});

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

router.post("/imageUpload", upload.single("file"), async (req: any, res: any): Promise<void> => {
  const file = req.file
  console.log(file)
  const googleData = new HandleGoogleData()
  await googleData.uploadImage(file)
  res.json({ imageId: googleData.resultId, status: googleData.status })
})



module.exports = router
