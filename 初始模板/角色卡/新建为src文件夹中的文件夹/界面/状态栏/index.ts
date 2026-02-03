<<<<<<< HEAD
=======
import { waitUntil } from 'async-wait-until';
>>>>>>> 657d325b384170d58b72e3fe3cc38173e31a414a
import App from './App.vue';
import './global.css';

$(async () => {
  await waitGlobalInitialized('Mvu');
<<<<<<< HEAD
=======
  await waitUntil(() => _.has(getVariables({ type: 'message' }), 'stat_data'));
>>>>>>> 657d325b384170d58b72e3fe3cc38173e31a414a
  createApp(App).use(createPinia()).mount('#app');
});
