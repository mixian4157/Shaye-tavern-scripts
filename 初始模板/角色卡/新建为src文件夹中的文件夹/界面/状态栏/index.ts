<<<<<<< HEAD
=======
import { waitUntil } from 'async-wait-until';
>>>>>>> 849f27146111964777605fcda645c6789752bb1c
import App from './App.vue';
import './global.css';

$(async () => {
  await waitGlobalInitialized('Mvu');
<<<<<<< HEAD
=======
  await waitUntil(() => _.has(getVariables({ type: 'message' }), 'stat_data'));
>>>>>>> 849f27146111964777605fcda645c6789752bb1c
  createApp(App).use(createPinia()).mount('#app');
});
