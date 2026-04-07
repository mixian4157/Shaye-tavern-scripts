<<<<<<< HEAD
=======
import { waitUntil } from 'async-wait-until';
>>>>>>> f759a3e3f10c9abb6086ecf76222f35268e80cf1
import App from './App.vue';
import './global.css';

$(async () => {
  await waitGlobalInitialized('Mvu');
<<<<<<< HEAD
=======
  await waitUntil(() => _.has(getVariables({ type: 'message' }), 'stat_data'));
>>>>>>> f759a3e3f10c9abb6086ecf76222f35268e80cf1
  createApp(App).use(createPinia()).mount('#app');
});
