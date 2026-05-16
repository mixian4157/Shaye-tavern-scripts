<<<<<<< HEAD
=======
import { waitUntil } from 'async-wait-until';
>>>>>>> 7bdcf6686f559c588cd3e4b41cdfc5e6dd270e6f
import App from './App.vue';
import './global.css';

$(async () => {
  await waitGlobalInitialized('Mvu');
<<<<<<< HEAD
=======
  await waitUntil(() => _.has(getVariables({ type: 'message' }), 'stat_data'));
>>>>>>> 7bdcf6686f559c588cd3e4b41cdfc5e6dd270e6f
  createApp(App).use(createPinia()).mount('#app');
});
