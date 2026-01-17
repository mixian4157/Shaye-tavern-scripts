<<<<<<< HEAD
=======
import { waitUntil } from 'async-wait-until';
>>>>>>> 015fe6d61b620f2c5622b7906b2ee5079f1ab1e9
import App from './App.vue';
import './global.css';

$(async () => {
  await waitGlobalInitialized('Mvu');
<<<<<<< HEAD
=======
  await waitUntil(() => _.has(getVariables({ type: 'message' }), 'stat_data'));
>>>>>>> 015fe6d61b620f2c5622b7906b2ee5079f1ab1e9
  createApp(App).use(createPinia()).mount('#app');
});
