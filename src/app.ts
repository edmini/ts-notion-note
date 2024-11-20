import views from "./view.js"


const app = document.querySelector("body") as HTMLElement

const pathToRegex = (path: string) => {
  return new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$")
}

interface Match {
  route: Route,
  result: RegExpMatchArray | null
}
interface Route {
  path: string,
  view: (params?: any) => Promise<HTMLElement | SVGElement>
}

const getParams = (match: Match): Record<string, any> => {
  const values = match.result!.slice(1)
  const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map((result) => result[1])
  return Object.fromEntries(keys.map((key, i) => {
    return [key, values[i]]
  }))
}

const render = async (): Promise<void> => {
  const routes: Route[] = [
    { path: "/", view: views.Home },
    { path: "/404", view: views.NotFound },
    { path: "/document", view: views.Document },
    { path: "/document/:id", view: views.Document },
  ]
  const potentialMatchs = routes.map((route) => {
    return {
      route: route,
      result: location.pathname.match(pathToRegex(route.path))
    }
  })
  let match = potentialMatchs.find((potentialMatch) => potentialMatch.result !== null)

  if (!match) {
    match = {
      route: routes[1],
      result: [location.pathname]
    }
  }
  const view = await match.route.view(getParams(match!))
  app?.replaceChildren(view)
}

const navigateTo = (url: string) => {
  history.pushState(null, '', url)
  render()
}

window.addEventListener("popstate", () => {
  console.log("popstate")
  render()
})

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOMContentLoaded")
  render()
  document.body.addEventListener("click", (e) => {
    const target = e.target as HTMLElement
    if (!target.closest("a")) {
      return
    }
    if (target.tagName === 'A' && (target as HTMLAnchorElement).dataset.link === "spa-link") {//&& e.target.href.startsWith(window.location.origin)) {
      e.preventDefault()
      navigateTo((target as HTMLAnchorElement).href.replace(window.location.origin, ""))
    }
  })
})




