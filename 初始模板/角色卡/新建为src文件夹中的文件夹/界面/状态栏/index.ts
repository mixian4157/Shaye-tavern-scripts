<<<<<<< HEAD
=======
import { waitUntil } from 'async-wait-until';
>>>>>>> ffcef6e22b372e2f3dcc1048bf50073234505d74
import App from './App.vue';
import './global.css';

$(async () => {
  await waitGlobalInitialized('Mvu');
<<<<<<< HEAD
=======
  await waitUntil(() => _.has(getVariables({ type: 'message' }), 'stat_data'));
>>>>>>> ffcef6e22b372e2f3dcc1048bf50073234505d74
  createApp(App).use(createPinia()).mount('#app');
});
