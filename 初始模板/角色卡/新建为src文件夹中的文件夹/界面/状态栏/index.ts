<<<<<<< HEAD
=======
import { waitUntil } from 'async-wait-until';
>>>>>>> 9f9d4a629e598c1c7452062fdb7482361ad09c6f
import App from './App.vue';
import './global.css';

$(async () => {
  await waitGlobalInitialized('Mvu');
<<<<<<< HEAD
=======
  await waitUntil(() => _.has(getVariables({ type: 'message' }), 'stat_data'));
>>>>>>> 9f9d4a629e598c1c7452062fdb7482361ad09c6f
  createApp(App).use(createPinia()).mount('#app');
});
