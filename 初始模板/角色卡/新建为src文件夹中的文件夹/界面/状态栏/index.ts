<<<<<<< HEAD
=======
import { waitUntil } from 'async-wait-until';
>>>>>>> bca3799e3ab288f5d52b3e2777478f654fc5e816
import App from './App.vue';
import './global.css';

$(async () => {
  await waitGlobalInitialized('Mvu');
<<<<<<< HEAD
=======
  await waitUntil(() => _.has(getVariables({ type: 'message' }), 'stat_data'));
>>>>>>> bca3799e3ab288f5d52b3e2777478f654fc5e816
  createApp(App).use(createPinia()).mount('#app');
});
