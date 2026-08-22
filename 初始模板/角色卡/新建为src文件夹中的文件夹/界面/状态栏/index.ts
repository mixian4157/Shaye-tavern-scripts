<<<<<<< HEAD
=======
import { waitUntil } from 'async-wait-until';
>>>>>>> c27dc311feeca88f575184c70cd539091ffeaf47
import App from './App.vue';
import './global.css';

$(async () => {
  await waitGlobalInitialized('Mvu');
<<<<<<< HEAD
=======
  await waitUntil(() => _.has(getVariables({ type: 'message' }), 'stat_data'));
>>>>>>> c27dc311feeca88f575184c70cd539091ffeaf47
  createApp(App).use(createPinia()).mount('#app');
});
