<<<<<<< HEAD
=======
import { waitUntil } from 'async-wait-until';
>>>>>>> 2dc3a4c6557394b004089da10a6c56467e18b325
import App from './App.vue';
import './global.css';

$(async () => {
  await waitGlobalInitialized('Mvu');
<<<<<<< HEAD
=======
  await waitUntil(() => _.has(getVariables({ type: 'message' }), 'stat_data'));
>>>>>>> 2dc3a4c6557394b004089da10a6c56467e18b325
  createApp(App).use(createPinia()).mount('#app');
});
