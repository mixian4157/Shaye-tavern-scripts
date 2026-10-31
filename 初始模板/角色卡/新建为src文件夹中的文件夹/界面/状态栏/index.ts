<<<<<<< HEAD
=======
import { waitUntil } from 'async-wait-until';
>>>>>>> dcd1be6dad2ada50ec1b3a20571c6428a8e828a4
import App from './App.vue';
import './global.css';

$(async () => {
  await waitGlobalInitialized('Mvu');
<<<<<<< HEAD
=======
  await waitUntil(() => _.has(getVariables({ type: 'message' }), 'stat_data'));
>>>>>>> dcd1be6dad2ada50ec1b3a20571c6428a8e828a4
  createApp(App).use(createPinia()).mount('#app');
});
