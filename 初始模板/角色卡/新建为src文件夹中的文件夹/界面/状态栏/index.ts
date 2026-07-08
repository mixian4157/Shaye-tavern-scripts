<<<<<<< HEAD
=======
import { waitUntil } from 'async-wait-until';
>>>>>>> 554b225f1325def871e7754811cd8f71ba9a8169
import App from './App.vue';
import './global.css';

$(async () => {
  await waitGlobalInitialized('Mvu');
<<<<<<< HEAD
=======
  await waitUntil(() => _.has(getVariables({ type: 'message' }), 'stat_data'));
>>>>>>> 554b225f1325def871e7754811cd8f71ba9a8169
  createApp(App).use(createPinia()).mount('#app');
});
