<<<<<<< HEAD
=======
import { waitUntil } from 'async-wait-until';
>>>>>>> 874db47f3fb8ed8544a74e33a59f780f2c95aa38
import App from './App.vue';
import './global.css';

$(async () => {
  await waitGlobalInitialized('Mvu');
<<<<<<< HEAD
=======
  await waitUntil(() => _.has(getVariables({ type: 'message' }), 'stat_data'));
>>>>>>> 874db47f3fb8ed8544a74e33a59f780f2c95aa38
  createApp(App).use(createPinia()).mount('#app');
});
