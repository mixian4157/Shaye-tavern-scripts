<<<<<<< HEAD
=======
import { waitUntil } from 'async-wait-until';
>>>>>>> e07e4847e8577cd53101e27231abf7ad096e7318
import App from './App.vue';
import './global.css';

$(async () => {
  await waitGlobalInitialized('Mvu');
<<<<<<< HEAD
=======
  await waitUntil(() => _.has(getVariables({ type: 'message' }), 'stat_data'));
>>>>>>> e07e4847e8577cd53101e27231abf7ad096e7318
  createApp(App).use(createPinia()).mount('#app');
});
