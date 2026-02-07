<<<<<<< HEAD
=======
import { waitUntil } from 'async-wait-until';
>>>>>>> e06587256c8130ffb7b2a29aaf44cff48c8f664e
import App from './App.vue';
import './global.css';

$(async () => {
  await waitGlobalInitialized('Mvu');
<<<<<<< HEAD
=======
  await waitUntil(() => _.has(getVariables({ type: 'message' }), 'stat_data'));
>>>>>>> e06587256c8130ffb7b2a29aaf44cff48c8f664e
  createApp(App).use(createPinia()).mount('#app');
});
