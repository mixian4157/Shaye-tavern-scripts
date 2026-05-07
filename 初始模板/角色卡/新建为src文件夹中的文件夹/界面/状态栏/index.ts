<<<<<<< HEAD
=======
import { waitUntil } from 'async-wait-until';
>>>>>>> c3c8df31b7e860053e3689eef0f82a0a89f3a481
import App from './App.vue';
import './global.css';

$(async () => {
  await waitGlobalInitialized('Mvu');
<<<<<<< HEAD
=======
  await waitUntil(() => _.has(getVariables({ type: 'message' }), 'stat_data'));
>>>>>>> c3c8df31b7e860053e3689eef0f82a0a89f3a481
  createApp(App).use(createPinia()).mount('#app');
});
