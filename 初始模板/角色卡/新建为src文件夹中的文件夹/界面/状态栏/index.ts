<<<<<<< HEAD
=======
import { waitUntil } from 'async-wait-until';
>>>>>>> d1ab9562bec19f593c4f8c6eab9057a58f1ef66f
import App from './App.vue';
import './global.css';

$(async () => {
  await waitGlobalInitialized('Mvu');
<<<<<<< HEAD
=======
  await waitUntil(() => _.has(getVariables({ type: 'message' }), 'stat_data'));
>>>>>>> d1ab9562bec19f593c4f8c6eab9057a58f1ef66f
  createApp(App).use(createPinia()).mount('#app');
});
