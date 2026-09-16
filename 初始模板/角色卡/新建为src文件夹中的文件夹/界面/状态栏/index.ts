<<<<<<< HEAD
=======
import { waitUntil } from 'async-wait-until';
>>>>>>> d77edb7121650f80c9a1a62357d549925d1336ad
import App from './App.vue';
import './global.css';

$(async () => {
  await waitGlobalInitialized('Mvu');
<<<<<<< HEAD
=======
  await waitUntil(() => _.has(getVariables({ type: 'message' }), 'stat_data'));
>>>>>>> d77edb7121650f80c9a1a62357d549925d1336ad
  createApp(App).use(createPinia()).mount('#app');
});
