<<<<<<< HEAD
=======
import { waitUntil } from 'async-wait-until';
>>>>>>> b29875444d854f6c190ef102d8ecf361ae020f06
import App from './App.vue';
import './global.css';

$(async () => {
  await waitGlobalInitialized('Mvu');
<<<<<<< HEAD
=======
  await waitUntil(() => _.has(getVariables({ type: 'message' }), 'stat_data'));
>>>>>>> b29875444d854f6c190ef102d8ecf361ae020f06
  createApp(App).use(createPinia()).mount('#app');
});
