import dva from 'dva';
import { useRouterHistory } from 'dva/router';
import { createHashHistory } from 'history';
import './index.less';

// 1. Initialize
const app = dva({
  history: useRouterHistory(createHashHistory)({ queryKey: true }),
});

// 2. Plugins
// app.use({});

// 3. Model
app.model(require('./models/mapView'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
