import { defineStore } from "pinia";
import { axiosInstance } from "../boot/axios";
import { ref } from "vue";

const RUTA_CARGAR_SERVICIOS = "/servicios/listarservicios";
const RUTA_AGREGAR_SERVICIO = "/servicios/crearservicio";
const RUTA_CONSULTAR_SERVICIO = "/servicios/consultarservicio";
const RUTA_ACTUALIZAR_SERVICIO = "/servicios/actualizarservicio";
const RUTA_RETIRAR_SERVICIO = "/servicios/retirarservicio";

export const useServiciosStore = defineStore("storeServicios", () => {
  const servicios = ref({
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

  const cargarServicios = async (original) => {
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
          .get(RUTA_CARGAR_SERVICIOS, params)
          .then((response) => {
            if (response.data) {
              servicios.value.data = response.data.content;
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

  async function agregarServicio(servicioParam) {
    const params = {
      servicioParam,
    };

    try {
      const p = new Promise(async function (resolve, reject) {
        try {
          await axiosInstance
            .post(RUTA_AGREGAR_SERVICIO, params)
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

  async function consultarServicio(idServicio) {
    try {
      const p = new Promise(async function (resolve, reject) {
        try {
          await axiosInstance
            .get(RUTA_CONSULTAR_SERVICIO + "/" + idServicio)
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

  async function actualizarServicio(datosServicio) {
    const params = {
      datosServicio,
    };

    try {
      const p = new Promise(async function (resolve, reject) {
        try {
          await axiosInstance
            .put(RUTA_ACTUALIZAR_SERVICIO, params)
            .then((response) => {
              if (response.data) {
                resolve(response.data.ejecucion.datos);
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

  async function retirarServicio(id) {
    try {
      const p = new Promise(async function (resolve, reject) {
        try {
          await axiosInstance
            .delete(RUTA_RETIRAR_SERVICIO + "/" + id)
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
    cargarServicios,
    agregarServicio,
    consultarServicio,
    actualizarServicio,
    retirarServicio,
    servicios,
    pagination,
    paginationOriginal,
  };
});
