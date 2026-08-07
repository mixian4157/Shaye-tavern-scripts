<<<<<<< HEAD
=======
import { waitUntil } from 'async-wait-until';
>>>>>>> 9072edeaaddd1166c92d20e75542e4d14d4fdbc2
import App from './App.vue';
import './global.css';

$(async () => {
  await waitGlobalInitialized('Mvu');
<<<<<<< HEAD
=======
  await waitUntil(() => _.has(getVariables({ type: 'message' }), 'stat_data'));
>>>>>>> 9072edeaaddd1166c92d20e75542e4d14d4fdbc2
  createApp(App).use(createPinia()).mount('#app');
});
