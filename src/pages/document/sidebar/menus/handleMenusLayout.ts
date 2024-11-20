
import elementCreator from "../../../../static/creator.js"

interface Menu {
  id: number
  href?: string
  title: string
  viewBox: string
  classes?: string[]
  path: Path[]
}
interface Path {
  d: string
  "fill-rule"?: string | undefined
  "clip-rule"?: string | undefined
}

const handleMenusLayout = async (menus: Menu[]): Promise<HTMLElement | SVGElement> => {
  const menusBody = document.createElement("div")

  const { default: menusLayoutEl } = await import("./menusLayout.js")

  menus.map((menu: Menu): void => {
    const { menusLayout } = elementCreator(menusLayoutEl(menu))
    menusBody.appendChild(menusLayout.element)
  })

  return menusBody
}

export default handleMenusLayout

