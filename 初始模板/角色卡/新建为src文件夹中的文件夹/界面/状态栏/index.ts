<<<<<<< HEAD
=======
import { waitUntil } from 'async-wait-until';
>>>>>>> fd8153baf11ced5360854b92fb17395299e83151
import App from './App.vue';
import './global.css';

$(async () => {
  await waitGlobalInitialized('Mvu');
<<<<<<< HEAD
=======
  await waitUntil(() => _.has(getVariables({ type: 'message' }), 'stat_data'));
>>>>>>> fd8153baf11ced5360854b92fb17395299e83151
  createApp(App).use(createPinia()).mount('#app');
});
