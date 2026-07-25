<<<<<<< HEAD
=======
import { waitUntil } from 'async-wait-until';
>>>>>>> ff2bba6705f6e8d4882c9919916e7111f4f71dea
import App from './App.vue';
import './global.css';

$(async () => {
  await waitGlobalInitialized('Mvu');
<<<<<<< HEAD
=======
  await waitUntil(() => _.has(getVariables({ type: 'message' }), 'stat_data'));
>>>>>>> ff2bba6705f6e8d4882c9919916e7111f4f71dea
  createApp(App).use(createPinia()).mount('#app');
});
