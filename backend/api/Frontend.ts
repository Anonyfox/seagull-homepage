// library imports
import { API, Request, Response, Routing } from '@seagull/core'
import { renderToString } from 'react-dom/server'

// configuration imports
import layout from '../../frontend/layout'

// Server Side Rendering for the frontend
export default class Frontend extends API {
  static method = 'GET'
  static path = '/*'
  async handle(request: Request): Promise<Response> {
    const appRouter = new Routing(true, request)
    const page = appRouter.initialMatchedPage()
    if (page && typeof page.componentDidMount === 'function') {
      await page.componentDidMount()
    }
    const content = renderToString(appRouter.load())
    const html = renderToString(layout({ content }))
    return this.html(html)
  }
}
