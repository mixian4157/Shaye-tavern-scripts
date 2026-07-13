<<<<<<< HEAD
=======
import { waitUntil } from 'async-wait-until';
>>>>>>> 563a54227d547b8c7ade58fb3242b38f89cefd18
import App from './App.vue';
import './global.css';

$(async () => {
  await waitGlobalInitialized('Mvu');
<<<<<<< HEAD
=======
  await waitUntil(() => _.has(getVariables({ type: 'message' }), 'stat_data'));
>>>>>>> 563a54227d547b8c7ade58fb3242b38f89cefd18
  createApp(App).use(createPinia()).mount('#app');
});
