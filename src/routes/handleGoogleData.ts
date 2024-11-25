
const { google } = require("googleapis")
const { Readable } = require("stream")
const { dotenv } = require("dotenv")
const { JWT } = require("google-auth-library")

require('dotenv').config()

interface ResultObj {
  String: (item: string) => string
  Number: (item: string) => number
  Date: (item: string) => Date
  Boolean: (item: string) => boolean
}

interface GoogleDataType {
  auth: typeof JWT | undefined
  CLIENT_EMAIL: string | undefined
  PRIVATE_KEY: string | undefined
  scopes: string[]
  menuRange: string
  typeRange: string
  dataRange: string
  sheetId: string
  result: Record<string, any>[]
  accessToken: string | null
  resultObj: { [key: string]: (item: string) => any }
  Authorize: () => void
  handleData(menus: string[], types: string[], datas: string[]): void
  getSheetData(): Promise<void>
  appendData(data: any): Promise<void>
  updateData(data: any, range: string): Promise<void>
  appendRow(startIndex: number, endIndex: number): Promise<void>
  moveRow(startIndex: number, endIndex: number, moveIndex: number): Promise<void>
  deleteRow(startIndex: number, endIndex: number): Promise<void>
  uploadImage(imageFile: { buffer: Buffer, originalname: string, mimetype: string }): Promise<void>
  deleteImage(imgId: string): Promise<void>
}

class HandleGoogleData implements GoogleDataType {
  CLIENT_EMAIL = process.env.CLIENT_EMAIL
  PRIVATE_KEY = process.env.PRIVATE_KEY
  scopes = [
    'https://www.googleapis.com/auth/spreadsheets',
    'https://www.googleapis.com/auth/drive.file'
  ]
  menuRange = "documents!A1:L1"
  typeRange = "documents!A2:L2"
  dataRange = "documents!A3:L"
  sheetId = "1WSAVnGbdV2QlF_kuagqQSr5r69BCPWTckXNESU03ufM"

  result = []
  accessToken = null

  resultObj: { [key: string]: (item: string) => any } = {
    String: (item: string): string => false || item,
    Number: (item: string): number => false || parseInt(item),
    Date: (item: string): Date => false || new Date(item),
    Boolean: (item: string): boolean => false || JSON.parse(item.toLowerCase())
  }
  auth: any; sheets: any; drive: any; folderId: string | undefined; menu: any; type: any; datas: any; status: number | undefined; resultId: string | undefined
  constructor() {
    this.Authorize()
  }
  Authorize() {
    this.auth = new google.auth.JWT(
      this.CLIENT_EMAIL,
      undefined,
      this.PRIVATE_KEY!.replace(/\\n/g, '\n'),
      this.scopes,
    )
    this.auth.authorize((err: any, tokens: any): void => {
      if (err) {
        console.log("GoogleApis error : ", err)
      }
      this.accessToken = tokens.access_token
      console.log("Connect googlesheet apis")
    })
    this.sheets = google.sheets({ version: "v4", auth: this.auth })
    this.drive = google.drive({ version: "v3", auth: this.auth })
  }

  handleData(menus: string[], types: string[], datas: string[]): void {
    let temp: Record<string, any> = {}
    datas.forEach((data: string, index: number): void => {
      const dataType = types[index]
      if (this.resultObj[dataType]) {
        temp[menus[index]] = this.resultObj[dataType](data)
      } else {
        console.log(`Invalid data type: ${dataType}`)
      }
    })
    this.result.push(temp)
  }

  async getSheetData() {
    try {
      const res = await this.sheets.spreadsheets.values.batchGet({
        spreadsheetId: this.sheetId,
        ranges: [this.menuRange, this.typeRange, this.dataRange]
      })
      this.menu = res.data.valueRanges[0].values
      this.type = res.data.valueRanges[1].values
      this.datas = res.data.valueRanges[2].values
      this.datas.map((data: any): void => {
        this.handleData(this.menu[0], this.type[0], data)
      })
    } catch (error) {
      this.status = 401
      console.log("Google Sheet Get Error : ", error)
    }
  }
  async appendData(data: any): Promise<void> {
    try {
      const res = await this.sheets.spreadsheets.values.append({
        spreadsheetId: this.sheetId,
        range: this.dataRange,
        valueInputOption: "USER_ENTERED",
        resource: { values: [data] }
      })
      this.result = res.data
      this.status = res.status
    } catch (error) {
      this.status = 401
      console.log("Google Sheet Append Error : ", error)
    }
  }
  async updateData(data: any, range: string): Promise<void> {
    try {
      const res = await this.sheets.spreadsheets.values.update({
        spreadsheetId: this.sheetId,
        range: range,
        valueInputOption: "USER_ENTERED",
        resource: { values: [data] },
      })
      console.log(res.data)
      this.result = res.data.updatedRange
      this.status = res.status
    } catch (error) {
      this.status = 401
      console.log("Google Sheet Update Error : ", error)
    }
  }
  async appendRow(startIndex: number, endIndex: number): Promise<void> {
    try {
      const res = await this.sheets.spreadsheets.batchUpdate({
        spreadsheetId: this.sheetId,
        resource: {
          requests: [{
            insertDimension: {
              range: {
                sheetId: 1586890228,
                dimension: "ROWS",
                startIndex, //rowId,
                endIndex
              },
              inheritFromBefore: false
            }
          }]
        }
      })
      console.log(res.data)
      this.status = res.status
    } catch (error) {
      this.status = 401
      console.log("Google Sheet Update Error : ", error)
    }
  }
  async moveRow(startIndex: number, endIndex: number, moveIndex: number): Promise<void> {
    try {
      const res = await this.sheets.spreadsheets.batchUpdate({
        spreadsheetId: this.sheetId,
        resource: {
          requests: [{
            moveDimension: {
              source: {
                sheetId: 1586890228,
                dimension: "ROWS",
                startIndex, //rowId,
                endIndex
              },
              destinationIndex: moveIndex
            }
          }]
        }
      })
      console.log(res.data)
      this.status = res.status
    } catch (error) {
      this.status = 401
      console.log("Google Sheet Update Error : ", error)
    }
  }
  async deleteRow(startIndex: number, endIndex: number): Promise<void> {
    try {
      const res = await this.sheets.spreadsheets.batchUpdate({
        spreadsheetId: this.sheetId,
        resource: {
          requests: [{
            deleteDimension: {
              range: {
                sheetId: 1586890228,
                dimension: "ROWS",
                startIndex, //rowId,
                endIndex
              }
            }
          }]
        }
      })
      console.log(res.data)
      this.status = res.status
    } catch (error) {
      this.status = 401
      console.log("Google Sheet Update Error : ", error)
    }
  }



  async uploadImage(imageFile: any): Promise<void> {
    this.folderId = "1sVlNngWLL1TgMcTEW0PHnNsPmpxB9__D"
    try {
      if (!imageFile.buffer || !imageFile.originalname || !imageFile.mimetype) {
        throw new Error("Invalid file data")
      }
      const bufferStream = new Readable()
      bufferStream.push(imageFile.buffer)
      bufferStream.push(null)
      const fileMetadata = {
        name: imageFile.originalname,
        mimeType: imageFile.mimetype,
        parents: this.folderId
      }
      const media = {
        mimeType: imageFile.mimetype,
        body: bufferStream,//imageFile.buffer//Buffer.from(imageFile.buffer)
      }
      const file = await this.drive.files.create({
        requestBody: fileMetadata,
        media: media,
        auth: this.auth
      })
      this.drive.permissions.create({
        fileId: file.data.id,
        requestBody: {
          role: 'reader',
          type: 'anyone'
        },
        auth: this.auth
      })
      console.log("file data : ", file.data)
      this.resultId = file.data.id
      this.status = file.status
    } catch (error) {
      this.status = 401
      console.log("Google Drive Save Error : ", error)
    }
  }
  async deleteImage(imgId: any): Promise<void> {
    console.log({ imgId })
    try {
      const res = await this.drive.files.delete({
        fileId: imgId,
      })
      console.log("Delete Image : ", res.data, "Delete Status : ", res.status)
      this.status = res.status
    } catch (error) {
      this.status = 401
      console.log("Google Drive Delete Error : ", error)
    }
  }

}

module.exports = HandleGoogleData

