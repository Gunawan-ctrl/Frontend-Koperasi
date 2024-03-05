import { boot } from "quasar/wrappers";
import axios from "axios";

const api = axios.create({ baseURL: "http://localhost:4000/" });

export default boot(({ app }) => {
  app.config.globalProperties.$axios = api;

  app.config.globalProperties.$api = api;
});

export { api };
