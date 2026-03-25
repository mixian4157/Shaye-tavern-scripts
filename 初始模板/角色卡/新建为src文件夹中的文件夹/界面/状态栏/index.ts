<<<<<<< HEAD
=======
import { waitUntil } from 'async-wait-until';
>>>>>>> b80a86e4d72312ede7f291df2c1c65bd1f7e93eb
import App from './App.vue';
import './global.css';

$(async () => {
  await waitGlobalInitialized('Mvu');
<<<<<<< HEAD
=======
  await waitUntil(() => _.has(getVariables({ type: 'message' }), 'stat_data'));
>>>>>>> b80a86e4d72312ede7f291df2c1c65bd1f7e93eb
  createApp(App).use(createPinia()).mount('#app');
});
