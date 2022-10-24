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
<!--              Input sell price:-->
<!--            </div>-->
<!--            <input-->
<!--                type="text"-->
<!--                v-model="sellPrice"-->
<!--                placeholder="0"-->
<!--                class="-->
<!--                      px-3-->
<!--                      py-3-->
<!--                      placeholder-red-300-->
<!--                      text-blueGray-600-->
<!--                      relative-->
<!--                      bg-white bg-white-->
<!--                      rounded-->
<!--                      text-sm-->
<!--                      border-0-->
<!--                      shadow-->
<!--                      outline-none-->
<!--                      focus:outline-none-->
<!--                      focus:ring-->
<!--                      w-full-->
<!--                      pl-2-->
<!--                    "-->
<!--            />-->

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
<!--      rockInfo: null,-->
<!--      isModalGenericVisible: false,-->
<!--      isModalGenericProcessing: false,-->
<!--      sellPrice : 0.05-->
<!--    };-->
<!--  },-->

<!--  methods: {-->
<!--    testLog: function () {-->
<!--      console.log("modal")-->
<!--    },-->
<!--    openModalSell: function (rockInfo) {-->
<!--      this.rockInfo = rockInfo;-->
<!--      this.showModalGeneric();-->
<!--    },-->

<!--    showModalGeneric: function () {-->
<!--      this.isModalGenericVisible = !this.isModalGenericVisible;-->
<!--      this.isModalGenericProcessing = false;-->
<!--    },-->
<!--    genericModalLogic: async function () {-->
<!--      this.isModalGenericProcessing = true;-->
<!--      try {-->
<!--        let tx = await trancodeService.sell(this.rockInfo, this.sellPrice, this.current_address);-->
<!--        console.log("sell complete", tx);-->

<!--        this.isModalGenericProcessing = false;-->
<!--        this.isModalGenericVisible = false;-->
<!--        await this.$parent.reloadData();-->

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

