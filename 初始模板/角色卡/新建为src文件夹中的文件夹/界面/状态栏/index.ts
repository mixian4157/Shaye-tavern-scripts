<<<<<<< HEAD
=======
import { waitUntil } from 'async-wait-until';
>>>>>>> 6bdf7c9c487192089e80293da029e2345f543a90
import App from './App.vue';
import './global.css';

$(async () => {
  await waitGlobalInitialized('Mvu');
<<<<<<< HEAD
=======
  await waitUntil(() => _.has(getVariables({ type: 'message' }), 'stat_data'));
>>>>>>> 6bdf7c9c487192089e80293da029e2345f543a90
  createApp(App).use(createPinia()).mount('#app');
});
