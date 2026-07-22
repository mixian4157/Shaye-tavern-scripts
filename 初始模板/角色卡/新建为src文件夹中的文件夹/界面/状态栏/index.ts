<<<<<<< HEAD
=======
import { waitUntil } from 'async-wait-until';
>>>>>>> f24091c9a91d583dafdb4867d858268ebc487545
import App from './App.vue';
import './global.css';

$(async () => {
  await waitGlobalInitialized('Mvu');
<<<<<<< HEAD
=======
  await waitUntil(() => _.has(getVariables({ type: 'message' }), 'stat_data'));
>>>>>>> f24091c9a91d583dafdb4867d858268ebc487545
  createApp(App).use(createPinia()).mount('#app');
});
