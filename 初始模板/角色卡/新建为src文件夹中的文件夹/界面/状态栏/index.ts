<<<<<<< HEAD
=======
import { waitUntil } from 'async-wait-until';
>>>>>>> c6777179271f97bed734047fcdd7a3d0067157ec
import App from './App.vue';
import './global.css';

$(async () => {
  await waitGlobalInitialized('Mvu');
<<<<<<< HEAD
=======
  await waitUntil(() => _.has(getVariables({ type: 'message' }), 'stat_data'));
>>>>>>> c6777179271f97bed734047fcdd7a3d0067157ec
  createApp(App).use(createPinia()).mount('#app');
});
