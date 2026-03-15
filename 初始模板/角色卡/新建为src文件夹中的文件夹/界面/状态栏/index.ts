<<<<<<< HEAD
=======
import { waitUntil } from 'async-wait-until';
>>>>>>> a29fe33091e38cf7a506efd6e481bac35ed6d521
import App from './App.vue';
import './global.css';

$(async () => {
  await waitGlobalInitialized('Mvu');
<<<<<<< HEAD
=======
  await waitUntil(() => _.has(getVariables({ type: 'message' }), 'stat_data'));
>>>>>>> a29fe33091e38cf7a506efd6e481bac35ed6d521
  createApp(App).use(createPinia()).mount('#app');
});
