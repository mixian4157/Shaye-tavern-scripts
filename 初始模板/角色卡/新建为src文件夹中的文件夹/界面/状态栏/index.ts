<<<<<<< HEAD
=======
import { waitUntil } from 'async-wait-until';
>>>>>>> b0b1703a805d03d3a4d97270fa3ebbc17a91f8b8
import App from './App.vue';
import './global.css';

$(async () => {
  await waitGlobalInitialized('Mvu');
<<<<<<< HEAD
=======
  await waitUntil(() => _.has(getVariables({ type: 'message' }), 'stat_data'));
>>>>>>> b0b1703a805d03d3a4d97270fa3ebbc17a91f8b8
  createApp(App).use(createPinia()).mount('#app');
});
