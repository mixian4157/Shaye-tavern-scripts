<<<<<<< HEAD
=======
import { waitUntil } from 'async-wait-until';
>>>>>>> a3cb78b63bdf702a635b6e770e4a9bba040fb8b5
import App from './App.vue';
import './global.css';

$(async () => {
  await waitGlobalInitialized('Mvu');
<<<<<<< HEAD
=======
  await waitUntil(() => _.has(getVariables({ type: 'message' }), 'stat_data'));
>>>>>>> a3cb78b63bdf702a635b6e770e4a9bba040fb8b5
  createApp(App).use(createPinia()).mount('#app');
});
