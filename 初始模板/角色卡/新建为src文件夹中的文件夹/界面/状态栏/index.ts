<<<<<<< HEAD
=======
import { waitUntil } from 'async-wait-until';
>>>>>>> c5efcd76bf56ff7466cc36a0a02eea9e070a25de
import App from './App.vue';
import './global.css';

$(async () => {
  await waitGlobalInitialized('Mvu');
<<<<<<< HEAD
=======
  await waitUntil(() => _.has(getVariables({ type: 'message' }), 'stat_data'));
>>>>>>> c5efcd76bf56ff7466cc36a0a02eea9e070a25de
  createApp(App).use(createPinia()).mount('#app');
});
