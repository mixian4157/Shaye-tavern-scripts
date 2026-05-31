<<<<<<< HEAD
=======
import { waitUntil } from 'async-wait-until';
>>>>>>> 1b593ab69d89d2d5d22e9730e0163f19dd209fac
import App from './App.vue';
import './global.css';

$(async () => {
  await waitGlobalInitialized('Mvu');
<<<<<<< HEAD
=======
  await waitUntil(() => _.has(getVariables({ type: 'message' }), 'stat_data'));
>>>>>>> 1b593ab69d89d2d5d22e9730e0163f19dd209fac
  createApp(App).use(createPinia()).mount('#app');
});
