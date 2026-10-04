<<<<<<< HEAD
=======
import { waitUntil } from 'async-wait-until';
>>>>>>> 403adddf5e173dfd3140642b178725adec712122
import App from './App.vue';
import './global.css';

$(async () => {
  await waitGlobalInitialized('Mvu');
<<<<<<< HEAD
=======
  await waitUntil(() => _.has(getVariables({ type: 'message' }), 'stat_data'));
>>>>>>> 403adddf5e173dfd3140642b178725adec712122
  createApp(App).use(createPinia()).mount('#app');
});
