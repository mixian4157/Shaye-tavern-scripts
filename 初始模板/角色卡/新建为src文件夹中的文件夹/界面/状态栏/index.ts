<<<<<<< HEAD
=======
import { waitUntil } from 'async-wait-until';
>>>>>>> d3edc570be82dfef999b800e6b45a51d0863a025
import App from './App.vue';
import './global.css';

$(async () => {
  await waitGlobalInitialized('Mvu');
<<<<<<< HEAD
=======
  await waitUntil(() => _.has(getVariables({ type: 'message' }), 'stat_data'));
>>>>>>> d3edc570be82dfef999b800e6b45a51d0863a025
  createApp(App).use(createPinia()).mount('#app');
});
