<<<<<<< HEAD
=======
import { waitUntil } from 'async-wait-until';
>>>>>>> bc44abea1c2f7980dd9a2d9b909b4ad64bc8bdee
import App from './App.vue';
import './global.css';

$(async () => {
  await waitGlobalInitialized('Mvu');
<<<<<<< HEAD
=======
  await waitUntil(() => _.has(getVariables({ type: 'message' }), 'stat_data'));
>>>>>>> bc44abea1c2f7980dd9a2d9b909b4ad64bc8bdee
  createApp(App).use(createPinia()).mount('#app');
});
