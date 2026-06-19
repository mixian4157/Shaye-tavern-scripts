<<<<<<< HEAD
=======
import { waitUntil } from 'async-wait-until';
>>>>>>> 55b9a5c73448dafe8d865d5c0df9801d4b33774f
import App from './App.vue';
import './global.css';

$(async () => {
  await waitGlobalInitialized('Mvu');
<<<<<<< HEAD
=======
  await waitUntil(() => _.has(getVariables({ type: 'message' }), 'stat_data'));
>>>>>>> 55b9a5c73448dafe8d865d5c0df9801d4b33774f
  createApp(App).use(createPinia()).mount('#app');
});
