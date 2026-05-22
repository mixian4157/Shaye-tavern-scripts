<<<<<<< HEAD
=======
import { waitUntil } from 'async-wait-until';
>>>>>>> 6a70f8e1a961db42005bf8013b76cf97e1512794
import App from './App.vue';
import './global.css';

$(async () => {
  await waitGlobalInitialized('Mvu');
<<<<<<< HEAD
=======
  await waitUntil(() => _.has(getVariables({ type: 'message' }), 'stat_data'));
>>>>>>> 6a70f8e1a961db42005bf8013b76cf97e1512794
  createApp(App).use(createPinia()).mount('#app');
});
