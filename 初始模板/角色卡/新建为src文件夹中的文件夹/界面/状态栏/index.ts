<<<<<<< HEAD
=======
import { waitUntil } from 'async-wait-until';
>>>>>>> 462be5564c1bc75e384240f1a553e175687078a0
import App from './App.vue';
import './global.css';

$(async () => {
  await waitGlobalInitialized('Mvu');
<<<<<<< HEAD
=======
  await waitUntil(() => _.has(getVariables({ type: 'message' }), 'stat_data'));
>>>>>>> 462be5564c1bc75e384240f1a553e175687078a0
  createApp(App).use(createPinia()).mount('#app');
});
