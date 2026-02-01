<<<<<<< HEAD
=======
import { waitUntil } from 'async-wait-until';
>>>>>>> 16edc141e7d72f16a6a44f9c15b766d155937e2d
import App from './App.vue';
import './global.css';

$(async () => {
  await waitGlobalInitialized('Mvu');
<<<<<<< HEAD
=======
  await waitUntil(() => _.has(getVariables({ type: 'message' }), 'stat_data'));
>>>>>>> 16edc141e7d72f16a6a44f9c15b766d155937e2d
  createApp(App).use(createPinia()).mount('#app');
});
