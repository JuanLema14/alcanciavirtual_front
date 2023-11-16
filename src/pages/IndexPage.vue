<template>
  <q-page>
    <div class="row">
      <div class="q-pa-sm col">
        <q-card class="warning" style="border-radius: 25px">
          <q-card-section>
            <div class="row">
              <div class="col-lg-9 col-md-9 col-sm-9 col-xs-9">
                <div>
                  <p class="text-weight-bold" style="font-size: 1.5vmax">20</p>
                  <p class="text-weight-bold text-grey-8">servicios</p>
                  <div class="row">
                    <div class="col row">
                      <q-icon
                        name="stacked_line_chart"
                        class="q-pr-xs"
                        color="purple-14"
                      />
                      <p class="text-purple-14 q-pr-sm">20%</p>
                    </div>
                    <div class="col-lg-9 col-md-9 col-sm-9 col-xs-9">
                      <p>Pagados desde el mes pasado</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-3 col-md-3 col-sm-3 col-xs-3 flex flex-center">
                <q-avatar style="background: #ebb3ff">
                  <q-icon name="wallet" style="color: #b910fc" />
                </q-avatar>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>

      <div class="q-pa-sm col">
        <q-card class="warning" style="border-radius: 25px">
          <q-card-section>
            <div class="row">
              <div class="col-lg-9 col-md-9 col-sm-9 col-xs-9">
                <div>
                  <p class="text-weight-bold" style="font-size: 1.5vmax">10</p>
                  <p class="text-weight-bold text-grey-8">Metas</p>
                  <div class="row">
                    <div class="col row">
                      <q-icon
                        name="new_releases"
                        class="q-pr-xs"
                        color="cyan-6"
                      />
                      <p class="text-cyan-6 q-pr-sm">10%</p>
                    </div>
                    <div class="col-lg-9 col-md-9 col-sm-9 col-xs-9">
                      <p>Alcanzadas desde el mes pasado</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-3 col-md-3 col-sm-3 col-xs-3 flex flex-center">
                <q-avatar style="background: #b3ffff">
                  <q-icon name="volunteer_activism" style="color: #10d9fc" />
                </q-avatar>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>

      <div class="q-pa-sm col">
        <q-card class="warning" style="border-radius: 25px">
          <q-card-section>
            <div class="row">
              <div class="col-lg-9 col-md-9 col-sm-9 col-xs-9">
                <div>
                  <p class="text-weight-bold" style="font-size: 1.5vmax">10</p>
                  <p class="text-weight-bold text-grey-8">Remesas</p>
                  <div class="row">
                    <div class="col row">
                      <q-icon
                        name="payments"
                        class="q-pr-xs"
                        color="green-14"
                      />
                      <p class="text-green-14 q-pr-sm">10%</p>
                    </div>
                    <div class="col-lg-9 col-md-9 col-sm-9 col-xs-9">
                      <p>Adquiridas desde el mes pasado</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-3 col-md-3 col-sm-3 col-xs-3 flex flex-center">
                <q-avatar style="background: #c0ffb3">
                  <q-icon name="volunteer_activism" style="color: #11b327" />
                </q-avatar>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>

      <div class="q-pa-sm col">
        <q-card class="warning" style="border-radius: 25px">
          <q-card-section>
            <div class="row">
              <div class="col-lg-9 col-md-9 col-sm-9 col-xs-9">
                <div>
                  <p class="text-weight-bold" style="font-size: 1.5vmax">10</p>
                  <p class="text-weight-bold text-grey-8">servicios</p>
                  <div class="row">
                    <div class="col row">
                      <q-icon
                        name="stacked_line_chart"
                        class="q-pr-xs"
                        color="orange-14"
                      />
                      <p class="text-orange-14 q-pr-sm">-5%</p>
                    </div>
                    <div class="col-lg-9 col-md-9 col-sm-9 col-xs-9">
                      <p>Por pagar desde el mes pasado</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-3 col-md-3 col-sm-3 col-xs-3 flex flex-center">
                <q-avatar style="background: #ffe1b3">
                  <q-icon name="error" style="color: #fc7a10" />
                </q-avatar>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- <div class="row q-col-gutter-sm flex flex-center q-pa-md ">
      <div class="col-lg-10 col-md-10 col-sm-10 col-xs-10 ">
        <registro-ahorro/>
      </div>
    </div> -->

  </q-page>
</template>

<script setup>
import { defineComponent, defineAsyncComponent } from "vue";

const RegistroAhorro = defineAsyncComponent(() =>
  import("src/components/Ahorro/RegistroAhorro.vue")
);
defineComponent({
  name: "IndexPage",
});
</script>

<style scoped>

.warning {
  -webkit-box-shadow: -1px 14px 24px -5px rgba(57, 66, 196, 0.5);
  box-shadow: -1px 14px 24px -5px rgba(11, 19, 138, 0.2);
}
</style>
