<<<<<<< HEAD
=======
import { waitUntil } from 'async-wait-until';
>>>>>>> 4fdc70983fb9429b6d8988deb8df3a9f5fda2434
import App from './App.vue';
import './global.css';

$(async () => {
  await waitGlobalInitialized('Mvu');
<<<<<<< HEAD
=======
  await waitUntil(() => _.has(getVariables({ type: 'message' }), 'stat_data'));
>>>>>>> 4fdc70983fb9429b6d8988deb8df3a9f5fda2434
  createApp(App).use(createPinia()).mount('#app');
});
