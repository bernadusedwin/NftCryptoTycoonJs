<!--<template>-->
<!--  <div id="modalGeneric">-->
<!--    <div-->
<!--        v-if="isModalGenericVisible"-->
<!--        class="-->
<!--              overflow-x-hidden overflow-y-auto-->
<!--              fixed-->
<!--              inset-0-->
<!--              z-50-->
<!--              outline-none-->
<!--              focus:outline-none-->
<!--              justify-center-->
<!--              items-center-->
<!--              flex-->
<!--            "-->
<!--    >-->
<!--      <div class="relative w-auto my-6 mx-auto max-w-md">-->
<!--        &lt;!&ndash;content&ndash;&gt;-->
<!--        <div-->
<!--            class="-->
<!--                  border-0-->
<!--                  rounded-lg-->
<!--                  shadow-lg-->
<!--                  relative-->
<!--                  flex flex-col-->
<!--                  w-full-->
<!--                  bg-white-->
<!--                  outline-none-->
<!--                  focus:outline-none-->
<!--                "-->
<!--        >-->
<!--          &lt;!&ndash;header&ndash;&gt;-->
<!--          <div-->
<!--              class="-->
<!--                    flex-->
<!--                    items-start-->
<!--                    justify-between-->
<!--                    p-5-->
<!--                    border-b border-solid border-blueGray-200-->
<!--                    rounded-t-->
<!--                  "-->
<!--          >-->
<!--            <h3 class="text-2l font-semibold">Confirmation</h3>-->
<!--            <button-->
<!--                class="-->
<!--                      p-1-->
<!--                      ml-auto-->
<!--                      bg-transparent-->
<!--                      border-0-->
<!--                      text-black-->
<!--                      opacity-5-->
<!--                      float-right-->
<!--                      text-3xl-->
<!--                      leading-none-->
<!--                      font-semibold-->
<!--                      outline-none-->
<!--                      focus:outline-none-->
<!--                    "-->
<!--                v-on:click="showModalGeneric()"-->
<!--            >-->
<!--                    <span-->
<!--                        class="-->
<!--                        bg-transparent-->
<!--                        text-black-->
<!--                        opacity-5-->
<!--                        h-6-->
<!--                        w-6-->
<!--                        text-2xl-->
<!--                        block-->
<!--                        outline-none-->
<!--                        focus:outline-none-->
<!--                      "-->
<!--                    >-->
<!--                      ×-->
<!--                    </span>-->
<!--            </button>-->
<!--          </div>-->
<!--          &lt;!&ndash;body&ndash;&gt;-->
<!--          <div class="relative p-5 flex-auto">-->
<!--            <div class="my-4 text-blueGray-500 text-md leading-relaxed">-->
<!--              {{ content }}-->
<!--            </div>-->

<!--          </div>-->
<!--          &lt;!&ndash;footer&ndash;&gt;-->
<!--          <div-->
<!--              class="-->
<!--                    flex-->
<!--                    items-center-->
<!--                    justify-end-->
<!--                    p-6-->
<!--                    border-t border-solid border-blueGray-200-->
<!--                    rounded-b-->
<!--                  "-->
<!--          >-->
<!--            <button-->
<!--                class="-->
<!--                      text-red-500-->
<!--                      bg-transparent-->
<!--                      border border-solid border-red-500-->
<!--                      hover:bg-red-500-->
<!--                      hover:text-white-->
<!--                      active:bg-red-600-->
<!--                      font-bold-->
<!--                      uppercase-->
<!--                      text-sm-->
<!--                      px-6-->
<!--                      py-3-->
<!--                      rounded-->
<!--                      outline-none-->
<!--                      focus:outline-none-->
<!--                      mr-1-->
<!--                      mb-1-->
<!--                      ease-linear-->
<!--                      transition-all-->
<!--                      duration-150-->
<!--                    "-->
<!--                type="button"-->
<!--                v-on:click="showModalGeneric()"-->
<!--            >-->
<!--              Close-->
<!--            </button>-->
<!--            <button-->
<!--                v-if="isModalGenericProcessing"-->
<!--                :disabled="true"-->
<!--                class="-->
<!--                      text-black-500-->
<!--                      background-transparent-->
<!--                      font-bold-->
<!--                      uppercase-->
<!--                      px-6-->
<!--                      py-2-->
<!--                      text-sm-->
<!--                      outline-none-->
<!--                      focus:outline-none-->
<!--                      mr-1-->
<!--                      mb-1-->
<!--                      ease-linear-->
<!--                      transition-all-->
<!--                      duration-150-->
<!--                    "-->
<!--                type="button"-->

<!--            >-->
<!--              Processing-->
<!--            </button>-->
<!--            <button-->
<!--                v-if="isModalGenericProcessing==false"-->
<!--                class="-->
<!--                      text-red-500-->
<!--                      background-transparent-->
<!--                      font-bold-->
<!--                      uppercase-->
<!--                      px-6-->
<!--                      py-2-->
<!--                      text-sm-->
<!--                      outline-none-->
<!--                      focus:outline-none-->
<!--                      mr-1-->
<!--                      mb-1-->
<!--                      ease-linear-->
<!--                      transition-all-->
<!--                      duration-150-->
<!--                    "-->
<!--                type="button"-->
<!--                v-on:click="genericModalLogic()"-->
<!--            >-->
<!--              Yes-->
<!--            </button>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
<!--    <div-->
<!--        v-if="isModalGenericVisible"-->
<!--        class="opacity-25 fixed inset-0 z-40 bg-black"-->
<!--    ></div>-->
<!--  </div>-->
<!--</template>-->
<!--<script>-->

<!--import globalParam from "@/library/global_param";-->
<!--import trancodeService from "../library/trancode_service";-->

<!--export default {-->
<!--  name: "modal-generic",-->
<!--  components: {},-->
<!--  props: {-->
<!--    current_address: String,-->
<!--  },-->
<!--  data() {-->
<!--    return {-->
<!--      // gameInfo: null,-->
<!--      rockInfo: null,-->
<!--      isModalGenericVisible: false,-->
<!--      isModalGenericProcessing: false,-->
<!--      content: "",-->
<!--      methodName: "",-->
<!--    };-->
<!--  },-->
<!--  // mounted: function () {-->
<!--  //-->
<!--  // },-->
<!--  methods: {-->
<!--    testLog: function () {-->
<!--      console.log("modal")-->
<!--    },-->
<!--    openModalGeneric: function (rockInfo, methodName) {-->
<!--      this.rockInfo = rockInfo;-->
<!--      this.methodName = methodName;-->
<!--      this.setContent();-->
<!--      this.showModalGeneric();-->

<!--    },-->
<!--    setContent() {-->
<!--      if (this.methodName == "buy") {-->
<!--        this.content = "Are you sure want to buy inventory " + this.rockInfo.id + "?";-->
<!--      } else if (this.methodName == "stop_sell") {-->
<!--        this.content = "Are you sure want to stop sell " + this.rockInfo.id + "?";-->
<!--      }-->
<!--    },-->
<!--    showModalGeneric: function () {-->
<!--      this.isModalGenericVisible = !this.isModalGenericVisible;-->
<!--      this.isModalGenericProcessing = false;-->
<!--    },-->
<!--    genericModalLogic: async function () {-->
<!--      this.isModalGenericProcessing = true;-->
<!--      try {-->
<!--        if (this.methodName == "buy") {-->
<!--          let tx = await trancodeService.buy(this.rockInfo, this.current_address);-->
<!--          console.log("buy complete", tx);-->

<!--        } else if (this.methodName == "stop_sell") {-->
<!--          let tx = await trancodeService.stopSell(this.rockInfo, this.current_address);-->
<!--          console.log("stop sell complete", tx);-->
<!--        }-->
<!--        await this.$parent.reloadData();-->

<!--        this.isModalGenericProcessing = false;-->
<!--        this.isModalGenericVisible = false;-->

<!--      } catch (e) {-->
<!--        this.isModalGenericProcessing = false;-->

<!--      }-->

<!--    },-->

<!--  },-->
<!--  computed: {-->
<!--    isDevMode: function () {-->
<!--      return globalParam.getDevMode();-->
<!--    },-->

<!--  },-->
<!--};-->
<!--</script>-->

