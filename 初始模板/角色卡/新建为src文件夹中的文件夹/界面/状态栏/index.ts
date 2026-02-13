<<<<<<< HEAD
=======
import { waitUntil } from 'async-wait-until';
>>>>>>> f8a9af192956c000490c09a467149c30b8d67ecc
import App from './App.vue';
import './global.css';

$(async () => {
  await waitGlobalInitialized('Mvu');
<<<<<<< HEAD
=======
  await waitUntil(() => _.has(getVariables({ type: 'message' }), 'stat_data'));
>>>>>>> f8a9af192956c000490c09a467149c30b8d67ecc
  createApp(App).use(createPinia()).mount('#app');
});
