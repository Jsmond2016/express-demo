import combineRoutes from 'koa-combine-routers'
import demoRoutes from './DemoRoutes'


export default combineRoutes(
  demoRoutes
)