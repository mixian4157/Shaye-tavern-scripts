<<<<<<< HEAD
=======
import { waitUntil } from 'async-wait-until';
>>>>>>> f538e79657e2c9a15aa14642adc83ec4c804dd21
import App from './App.vue';
import './global.css';

$(async () => {
  await waitGlobalInitialized('Mvu');
<<<<<<< HEAD
=======
  await waitUntil(() => _.has(getVariables({ type: 'message' }), 'stat_data'));
>>>>>>> f538e79657e2c9a15aa14642adc83ec4c804dd21
  createApp(App).use(createPinia()).mount('#app');
});
