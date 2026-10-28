<<<<<<< HEAD
=======
import { waitUntil } from 'async-wait-until';
>>>>>>> 86263ac33d811f0fc3d2e7860c0b19039a9f4515
import App from './App.vue';
import './global.css';

$(async () => {
  await waitGlobalInitialized('Mvu');
<<<<<<< HEAD
=======
  await waitUntil(() => _.has(getVariables({ type: 'message' }), 'stat_data'));
>>>>>>> 86263ac33d811f0fc3d2e7860c0b19039a9f4515
  createApp(App).use(createPinia()).mount('#app');
});
