<<<<<<< HEAD
=======
import { waitUntil } from 'async-wait-until';
>>>>>>> 75341c6e42a9de4002601a50d28fd5c0a0bfa070
import App from './App.vue';
import './global.css';

$(async () => {
  await waitGlobalInitialized('Mvu');
<<<<<<< HEAD
=======
  await waitUntil(() => _.has(getVariables({ type: 'message' }), 'stat_data'));
>>>>>>> 75341c6e42a9de4002601a50d28fd5c0a0bfa070
  createApp(App).use(createPinia()).mount('#app');
});
