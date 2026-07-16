<<<<<<< HEAD
=======
import { waitUntil } from 'async-wait-until';
>>>>>>> b6c722413d8cfdaf014bbb3f87518fd8c19754be
import App from './App.vue';
import './global.css';

$(async () => {
  await waitGlobalInitialized('Mvu');
<<<<<<< HEAD
=======
  await waitUntil(() => _.has(getVariables({ type: 'message' }), 'stat_data'));
>>>>>>> b6c722413d8cfdaf014bbb3f87518fd8c19754be
  createApp(App).use(createPinia()).mount('#app');
});
