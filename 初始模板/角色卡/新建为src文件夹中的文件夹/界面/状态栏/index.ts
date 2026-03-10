<<<<<<< HEAD
=======
import { waitUntil } from 'async-wait-until';
>>>>>>> da0118dfd92c2c94f015b40b73e9666c996c3fe8
import App from './App.vue';
import './global.css';

$(async () => {
  await waitGlobalInitialized('Mvu');
<<<<<<< HEAD
=======
  await waitUntil(() => _.has(getVariables({ type: 'message' }), 'stat_data'));
>>>>>>> da0118dfd92c2c94f015b40b73e9666c996c3fe8
  createApp(App).use(createPinia()).mount('#app');
});
