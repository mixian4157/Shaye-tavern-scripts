<<<<<<< HEAD
=======
import { waitUntil } from 'async-wait-until';
>>>>>>> 098e1f6e4ff8f2f726c3a97ca746d13033a2c842
import App from './App.vue';
import './global.css';

$(async () => {
  await waitGlobalInitialized('Mvu');
<<<<<<< HEAD
=======
  await waitUntil(() => _.has(getVariables({ type: 'message' }), 'stat_data'));
>>>>>>> 098e1f6e4ff8f2f726c3a97ca746d13033a2c842
  createApp(App).use(createPinia()).mount('#app');
});
