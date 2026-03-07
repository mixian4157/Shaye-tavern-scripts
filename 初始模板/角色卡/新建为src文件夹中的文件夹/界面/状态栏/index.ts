<<<<<<< HEAD
=======
import { waitUntil } from 'async-wait-until';
>>>>>>> 5df9c1cb4c82b29727ec6b2114f822fb829e2164
import App from './App.vue';
import './global.css';

$(async () => {
  await waitGlobalInitialized('Mvu');
<<<<<<< HEAD
=======
  await waitUntil(() => _.has(getVariables({ type: 'message' }), 'stat_data'));
>>>>>>> 5df9c1cb4c82b29727ec6b2114f822fb829e2164
  createApp(App).use(createPinia()).mount('#app');
});
