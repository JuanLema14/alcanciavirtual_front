/* eslint-disable */
import { boot } from "quasar/wrappers";
import { useAuthStore } from "../stores/auth-store";
import { createPinia } from "pinia";

export default boot(({ app, router, store, Vue }) => {
  app.use(createPinia());

  const autenticacionStore = useAuthStore(store);

  router.beforeEach((to, from, next) => {
    const record = to.matched.find((record) => record.meta.auth);
    if (record) {
      if (!autenticacionStore.loggedIn()) {
        // No loggedIn
        console.log("No loggedIn");
        const response = autenticacionStore
          .fetch()
          .then((data) => {
            if (!autenticacionStore.loggedIn()) {
              next("/");
            } else {
              next();
            }
          })
          .catch((err) => {
            next("/");
          });
      } else {
        next();
      }
    } else {
      console.log("loggedIn");
      next();
    }
  });

  /**
   * Set authentication routes
   */
  let { routes } = router.options;
  let routeData = routes.find((r) => r.path === "/");
  const currentRoutes = routeData.children.map((route) => route.path);

  /* app.mount = () => {
    autenticacionStore.fetch().catch((err) => {
      autenticacionStore.logout;
    });
  }; */

  var helper = {};
  helper.login = async (data) => {
    return autenticacionStore.doLogin(data);
  };
  helper.logout = () => {
    return autenticacionStore.logout();
  };
  helper.loggedIn = () => {
    return autenticacionStore.loggedIn;
  };
  helper.setHeader = (data) => {
    return autenticacionStore.setHeader(data);
  };
  helper.fetch = () => {
    return autenticacionStore.fetch();
  };
  app.config.globalProperties.$auth = helper;
});
