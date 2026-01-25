<<<<<<< HEAD
=======
import { waitUntil } from 'async-wait-until';
>>>>>>> 2837cbac784d0808fabe79c350edf0757ddf7e98
import App from './App.vue';
import './global.css';

$(async () => {
  await waitGlobalInitialized('Mvu');
<<<<<<< HEAD
=======
  await waitUntil(() => _.has(getVariables({ type: 'message' }), 'stat_data'));
>>>>>>> 2837cbac784d0808fabe79c350edf0757ddf7e98
  createApp(App).use(createPinia()).mount('#app');
});
