<<<<<<< HEAD
=======
import { waitUntil } from 'async-wait-until';
>>>>>>> c9caee866fce817dfc1a431872cc0dffa951a5e9
import App from './App.vue';
import './global.css';

$(async () => {
  await waitGlobalInitialized('Mvu');
<<<<<<< HEAD
=======
  await waitUntil(() => _.has(getVariables({ type: 'message' }), 'stat_data'));
>>>>>>> c9caee866fce817dfc1a431872cc0dffa951a5e9
  createApp(App).use(createPinia()).mount('#app');
});
