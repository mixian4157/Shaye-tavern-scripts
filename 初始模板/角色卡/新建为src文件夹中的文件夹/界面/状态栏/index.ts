<<<<<<< HEAD
=======
import { waitUntil } from 'async-wait-until';
>>>>>>> f0b81694107b46de13c384cb766919135218501f
import App from './App.vue';
import './global.css';

$(async () => {
  await waitGlobalInitialized('Mvu');
<<<<<<< HEAD
=======
  await waitUntil(() => _.has(getVariables({ type: 'message' }), 'stat_data'));
>>>>>>> f0b81694107b46de13c384cb766919135218501f
  createApp(App).use(createPinia()).mount('#app');
});
