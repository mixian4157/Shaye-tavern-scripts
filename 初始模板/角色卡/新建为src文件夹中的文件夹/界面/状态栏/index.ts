<<<<<<< HEAD
=======
import { waitUntil } from 'async-wait-until';
>>>>>>> 72a51d17062514fb40787823c97af1af514bf0f1
import App from './App.vue';
import './global.css';

$(async () => {
  await waitGlobalInitialized('Mvu');
<<<<<<< HEAD
=======
  await waitUntil(() => _.has(getVariables({ type: 'message' }), 'stat_data'));
>>>>>>> 72a51d17062514fb40787823c97af1af514bf0f1
  createApp(App).use(createPinia()).mount('#app');
});
