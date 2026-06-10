<<<<<<< HEAD
=======
import { waitUntil } from 'async-wait-until';
>>>>>>> fdfcbc5386747889d0b011123d4dde6612c67d1b
import App from './App.vue';
import './global.css';

$(async () => {
  await waitGlobalInitialized('Mvu');
<<<<<<< HEAD
=======
  await waitUntil(() => _.has(getVariables({ type: 'message' }), 'stat_data'));
>>>>>>> fdfcbc5386747889d0b011123d4dde6612c67d1b
  createApp(App).use(createPinia()).mount('#app');
});
