<<<<<<< HEAD
=======
import { waitUntil } from 'async-wait-until';
>>>>>>> 4741a7f3f26e7dd204604e0eeda9bc0fdb69e981
import App from './App.vue';
import './global.css';

$(async () => {
  await waitGlobalInitialized('Mvu');
<<<<<<< HEAD
=======
  await waitUntil(() => _.has(getVariables({ type: 'message' }), 'stat_data'));
>>>>>>> 4741a7f3f26e7dd204604e0eeda9bc0fdb69e981
  createApp(App).use(createPinia()).mount('#app');
});
