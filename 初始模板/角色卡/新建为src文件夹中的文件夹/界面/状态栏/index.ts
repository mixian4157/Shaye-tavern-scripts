<<<<<<< HEAD
=======
import { waitUntil } from 'async-wait-until';
>>>>>>> 3ee370304f725ffc74d481bb24331e890bad1641
import App from './App.vue';
import './global.css';

$(async () => {
  await waitGlobalInitialized('Mvu');
<<<<<<< HEAD
=======
  await waitUntil(() => _.has(getVariables({ type: 'message' }), 'stat_data'));
>>>>>>> 3ee370304f725ffc74d481bb24331e890bad1641
  createApp(App).use(createPinia()).mount('#app');
});
