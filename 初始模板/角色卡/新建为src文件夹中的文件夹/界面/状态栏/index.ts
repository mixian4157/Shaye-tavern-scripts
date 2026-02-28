<<<<<<< HEAD
=======
import { waitUntil } from 'async-wait-until';
>>>>>>> a9c3922bae77d94f729a544a1b3053ac46d6c121
import App from './App.vue';
import './global.css';

$(async () => {
  await waitGlobalInitialized('Mvu');
<<<<<<< HEAD
=======
  await waitUntil(() => _.has(getVariables({ type: 'message' }), 'stat_data'));
>>>>>>> a9c3922bae77d94f729a544a1b3053ac46d6c121
  createApp(App).use(createPinia()).mount('#app');
});
