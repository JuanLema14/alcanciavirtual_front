import { defineStore } from "pinia";
import { axiosInstance } from "../boot/axios";
import { ref } from "vue";

const RUTA_CARGAR_METAS = "/metas/listarmetas";
const RUTA_AGREGAR_META = "/metas/crearmeta";
const RUTA_CONSULTAR_META = "/metas/consultarmeta";
const RUTA_ACTUALIZAR_META = "/metas/actualizarmeta";
const RUTA_RETIRAR_META = "/metas/retirarmeta";

export const useMetasStore = defineStore("storeMetas", () => {
  const metas = ref({
    data: [],
  });

  const paginationOriginal = ref({
    page: 0,
    rowsPerPage: 5,
    rowsNumber: 0,
  });

  const pagination = ref({
    page: 0,
    rowsPerPage: 5,
    rowsNumber: 0,
  });

  const cargarMetas = async (original) => {
    let params = {
      params: {
        page: paginationOriginal.value.page,
        rowsPerPage: paginationOriginal.value.rowsPerPage,
      },
    };

    if (!original) {
      params.params.page = pagination.value.page;
      params.params.rowsPerPage = pagination.value.rowsPerPage;
    }

    try {
      return new Promise(async function (resolve, reject) {
        await axiosInstance
          .get(RUTA_CARGAR_METAS, params)
          .then((response) => {
            if (response.data) {
              metas.value.data = response.data.content;
              pagination.value.rowsNumber = response.data.totalElements;
              resolve();
            } else {
              reject(
                new Error("Ha ocurrido un error, consulte con el Administrador")
              );
            }
          })
          .catch((error) => {
            reject(error);
          });
      });
    } catch (error) {
      throw error;
    }
  };

  async function agregarMeta(metaParam) {
    const params = {
      params: {
        descripcion_meta: metaParam.descripcion_meta,
        cantidad_meta: +metaParam.cantidad_meta,
        estado: metaParam.estado.value,
        cantidad_abonada: +metaParam.cantidad_abonada,
        fecha_esperada: metaParam.fecha_esperada,
      },
    };
    try {
      const p = new Promise(async function (resolve, reject) {
        try {
          await axiosInstance
            .post(RUTA_AGREGAR_META, null, params)
            .then((response) => {
              if (response.data) {
                resolve(response.data);
              } else {
                reject(
                  new Error(
                    "Ha ocurrido un error, consulte con el Administrador"
                  )
                );
              }
            })
            .catch((error) => {
              reject(error);
            });
        } catch (error) {
          reject(error);
        }
      });
      return p;
    } catch (error) {
      console.log("Error en el proceso:", error.message);
    }
  }

  async function consultarMeta(idMeta) {
    try {
      const p = new Promise(async function (resolve, reject) {
        try {
          await axiosInstance
            .get(RUTA_CONSULTAR_META + "/" + idMeta)
            .then((response) => {
              if (response.data) {
                resolve(response.data);
              } else {
                reject(
                  new Error(
                    "Ha ocurrido un error, consulte con el Administrador"
                  )
                );
              }
            })
            .catch((error) => {
              reject(error);
            });
        } catch (error) {
          reject(error);
        }
      });
      return p;
    } catch (error) {
      console.log("Error en el proceso:", error.message);
    }
  }

  async function actualizarMeta(datosMeta) {
    const params = {
      id: datosMeta.id,
      descripcion_meta: datosMeta.descripcion_meta,
      cantidad_meta: +datosMeta.cantidad_meta,
      estado: datosMeta.estado,
      cantidad_abonada: datosMeta.cantidad_abonada,
      fecha_esperada: datosMeta.fecha_esperada,
    };

    try {
      const p = new Promise(async function (resolve, reject) {
        try {
          await axiosInstance
            .put(RUTA_ACTUALIZAR_META + "/" + datosMeta.id, params)
            .then((response) => {
              if (response.data) {
                resolve(response.data);
              } else {
                reject(
                  new Error(
                    "Ha ocurrido un error, consulte con el Administrador"
                  )
                );
              }
            })
            .catch((error) => {
              reject(error);
            });
        } catch (error) {
          reject(error);
        }
      });
      return p;
    } catch (error) {
      console.log("Error en el proceso:", error.message);
    }
  }

  async function retirarMeta(id) {
    try {
      const p = new Promise(async function (resolve, reject) {
        try {
          await axiosInstance
            .delete(RUTA_RETIRAR_META + "/" + id)
            .then((response) => {
              resolve();
            })
            .catch((error) => {
              reject(error);
            });
        } catch (error) {
          reject(error);
        }
      });
      return p;
    } catch (error) {
      console.log("Error en el proceso:", error.message);
    }
  }

  return {
    cargarMetas,
    agregarMeta,
    consultarMeta,
    actualizarMeta,
    retirarMeta,
    metas,
    pagination,
    paginationOriginal,
  };
});
