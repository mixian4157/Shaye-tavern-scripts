<<<<<<< HEAD
=======
import { waitUntil } from 'async-wait-until';
>>>>>>> fbd0c2c5f019bec7ca3a145029527629c529b4b3
import App from './App.vue';
import './global.css';

$(async () => {
  await waitGlobalInitialized('Mvu');
<<<<<<< HEAD
=======
  await waitUntil(() => _.has(getVariables({ type: 'message' }), 'stat_data'));
>>>>>>> fbd0c2c5f019bec7ca3a145029527629c529b4b3
  createApp(App).use(createPinia()).mount('#app');
});
