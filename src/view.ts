
const views = {
  Home: async (): Promise<HTMLElement | SVGElement> => {
    const { default: handleHomeLayout } = await import("./pages/home/handleHomeLayout.js")
    const homeLayout = handleHomeLayout()
    return homeLayout
  },
  NotFound: async (): Promise<HTMLElement | SVGElement> => {
    const { default: handleNotFoundLayout } = await import("./pages/notFound/handleNotFoundLayout.js")
    const notFoundLayout = handleNotFoundLayout()
    return notFoundLayout
  },
  Document: async (params?: string | number): Promise<HTMLElement | SVGElement> => {
    console.log(params)
    const { default: handleDocumentLayout } = await import("./pages/document/handleDocumentLayout.js")
    const documentLayout = handleDocumentLayout()
    return documentLayout
  }
}

export default views


