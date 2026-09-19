<<<<<<< HEAD
=======
import { waitUntil } from 'async-wait-until';
>>>>>>> ef49cc74019348a1696eda4d988d4f4ddc0d1b9b
import App from './App.vue';
import './global.css';

$(async () => {
  await waitGlobalInitialized('Mvu');
<<<<<<< HEAD
=======
  await waitUntil(() => _.has(getVariables({ type: 'message' }), 'stat_data'));
>>>>>>> ef49cc74019348a1696eda4d988d4f4ddc0d1b9b
  createApp(App).use(createPinia()).mount('#app');
});
