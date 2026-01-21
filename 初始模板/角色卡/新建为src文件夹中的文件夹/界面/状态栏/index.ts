<<<<<<< HEAD
=======
import { waitUntil } from 'async-wait-until';
>>>>>>> 73c4586a45f7285ddd527cb83f79dadb3f5fdd2e
import App from './App.vue';
import './global.css';

$(async () => {
  await waitGlobalInitialized('Mvu');
<<<<<<< HEAD
=======
  await waitUntil(() => _.has(getVariables({ type: 'message' }), 'stat_data'));
>>>>>>> 73c4586a45f7285ddd527cb83f79dadb3f5fdd2e
  createApp(App).use(createPinia()).mount('#app');
});
