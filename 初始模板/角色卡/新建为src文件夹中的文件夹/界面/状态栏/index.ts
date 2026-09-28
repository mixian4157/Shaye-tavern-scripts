<<<<<<< HEAD
=======
import { waitUntil } from 'async-wait-until';
>>>>>>> 7f92d0b6cabecacd6ca52f5c77d6f18fa6a3b4b9
import App from './App.vue';
import './global.css';

$(async () => {
  await waitGlobalInitialized('Mvu');
<<<<<<< HEAD
=======
  await waitUntil(() => _.has(getVariables({ type: 'message' }), 'stat_data'));
>>>>>>> 7f92d0b6cabecacd6ca52f5c77d6f18fa6a3b4b9
  createApp(App).use(createPinia()).mount('#app');
});
