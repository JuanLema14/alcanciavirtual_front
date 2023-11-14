const routes = [
  {
    path: "/main",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        meta: { auth: true },
        component: () => import("pages/IndexPage.vue"),
      },
      {
        path: "servicios",
        meta: { auth: true },
        component: () => import("pages/ServiciosPage.vue"),
      },
      {
        path: "servicios/editar/:idServicio",
        component: () => import("src/pages/Servicios/EditarServicios.vue"),
        props: true,
      },
      {
        path: "servicios/crear",
        component: () => import("src/pages/Servicios/CrearServicios.vue"),
      },
      {
        path: "metas",
        meta: { auth: true },
        component: () => import("pages/MetasPage.vue"),
      },
      {
        path: "metas/editar/:idMeta",
        component: () => import("src/pages/Metas/EditarMetas.vue"),
        props: true,
      },
      {
        path: "metas/crear",
        component: () => import("src/pages/Metas/CrearMetas.vue"),
      },
    ],
  },
  {
    path: "/",
    component: () => import("layouts/LoginLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/LoginPage.vue"),
      },
    ],
  },
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
