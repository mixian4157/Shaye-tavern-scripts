<<<<<<< HEAD
=======
import { waitUntil } from 'async-wait-until';
>>>>>>> 4a9344276d925a83e32726c58b9b05debdf4a8ad
import App from './App.vue';
import './global.css';

$(async () => {
  await waitGlobalInitialized('Mvu');
<<<<<<< HEAD
=======
  await waitUntil(() => _.has(getVariables({ type: 'message' }), 'stat_data'));
>>>>>>> 4a9344276d925a83e32726c58b9b05debdf4a8ad
  createApp(App).use(createPinia()).mount('#app');
});
