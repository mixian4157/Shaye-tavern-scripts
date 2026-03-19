<<<<<<< HEAD
=======
import { waitUntil } from 'async-wait-until';
>>>>>>> 68ec069ef06d920c2018e14dffb39c8904448003
import App from './App.vue';
import './global.css';

$(async () => {
  await waitGlobalInitialized('Mvu');
<<<<<<< HEAD
=======
  await waitUntil(() => _.has(getVariables({ type: 'message' }), 'stat_data'));
>>>>>>> 68ec069ef06d920c2018e14dffb39c8904448003
  createApp(App).use(createPinia()).mount('#app');
});
