<<<<<<< HEAD
=======
import { waitUntil } from 'async-wait-until';
>>>>>>> 97a7b3d33c9c4352561a5d0902fe896ec003d90a
import App from './App.vue';
import './global.css';

$(async () => {
  await waitGlobalInitialized('Mvu');
<<<<<<< HEAD
=======
  await waitUntil(() => _.has(getVariables({ type: 'message' }), 'stat_data'));
>>>>>>> 97a7b3d33c9c4352561a5d0902fe896ec003d90a
  createApp(App).use(createPinia()).mount('#app');
});
