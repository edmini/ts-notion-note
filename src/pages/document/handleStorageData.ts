interface Note {
  id: string
  icon: string
  title: string
  parentId: string | number
  level: number
  cover: string
}
interface Storage {
  noteList: Note[] | null
  appendData: Note | null
  updateData: any
}

const storage: Storage = {
  noteList: [],
  appendData: null,
  updateData: null
}

const appendDataFetch = async (data: any): Promise<any> => {
  const res = await fetch("/api", {
    method: "POST",
    headers: { "ContentType": "application/json" },
    body: JSON.stringify(data)
  })
  const result = await res.json()
  console.log(result)
  return result
}

const handleProxyData: ProxyHandler<Storage> = {
  set: (target: Storage, property: string, value: any): boolean => {
    if (!value) return false
    switch (property) {
      case "noteList":
        target[property] = value
        break;
      case "appendData":
        // (async () => {
        //   const result = appendDataFetch(value)
        //   console.log(result)
        // })
        // const result = appendDataFetch(value)
        // console.log(result)
        if (target.noteList) {
          target.noteList.push(value)
          return true
        }
        break;
      case "updateData":
        if (target.noteList) {
          target.noteList = target.noteList.map((data) => {
            if (data.id === value.id) {
              for (const key in data) {
                if (value.hasOwnProperty(key)) {
                  (data as any)[key] = value[key]
                }
              }
            }
            return data
          })
          return true
        }
        break;
      default:
        console.log("Check property")
        return false
    }
    return true
  },
  get: (target: Storage, property: string): any => {
    if (property in target) {
      return (target as any)[property]
    }
    return undefined
  }
}

const dataProxy = new Proxy(storage, handleProxyData)


const dataList = [
  { id: "492d0955-bfa9-4772-9ef5-eb692274ba8c", icon: "🎁", title: "Hello1", parentId: 0, level: 0, cover: "15kEofEmOMH5nvfApIt-tivxWoba3Z2hw" },
  { id: "5aebdeb5-9539-45af-b9d2-1246a8ce2db6", icon: "", title: "Hello2", parentId: 0, level: 0, cover: "15kEofEmOMH5nvfApIt-tivxWoba3Z2hw" },
  { id: "9d7dd834-2dab-4bca-92c6-1f36ba13ae6a", icon: "☠️", title: "Hello3", parentId: "492d0955-bfa9-4772-9ef5-eb692274ba8c", level: 1, cover: "" },
  { id: "4780fe5e-23ff-4366-b724-6cba54eef1da", icon: "😍", title: "HELLO4", parentId: "5aebdeb5-9539-45af-b9d2-1246a8ce2db6", level: 1, cover: "" },
  { id: "2430dedc-0fa7-4d6e-9ee9-4ea922a79d2f", icon: "", title: "Hello5", parentId: "5aebdeb5-9539-45af-b9d2-1246a8ce2db6", level: 1, cover: "" },
  { id: "14ea1238-3333-4bb1-b42d-12b4baee8b6d", icon: "👻", title: "hello6world6helloworld hello world", parentId: "9d7dd834-2dab-4bca-92c6-1f36ba13ae6a", level: 2, cover: "" },
  { id: "4c13cd5e-351f-41b0-ba9e-1445054579f6", icon: "🤖", title: "World1", parentId: 0, level: 0, cover: "" },
  { id: "bdfb7e66-3353-4841-8f36-45a06a0fcca7", icon: "", title: "World2", parentId: "14ea1238-3333-4bb1-b42d-12b4baee8b6d", level: 3, cover: "" }
]

dataProxy.noteList = dataList as Note[]


export default dataProxy