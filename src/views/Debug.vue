<template>
  <div>
    <sidebar-component></sidebar-component>
    <div class="relative md:ml-64 bg-blueGray-100">
      <navbar-component></navbar-component>
      <!-- Header - Start -->
      <div class="relative bg-pink-600 md:pt-32 pb-32 pt-12">
        <div class="px-4 md:px-10 mx-auto w-full">
          <div>
            <h5 class="text-white p-4">Coin Address : {{ address }}</h5>
            <button
              class="text-white p-2 m-4 bg-gray-700"
              v-on:click="debugOne()"
            >
              DebugOne
            </button>
            <button
              class="text-white p-2 m-4 bg-blue-600"
              v-on:click="debugTwo()"
            >
              DebugTwo
            </button>
            <!-- Card stats -->
          </div>
        </div>
      </div>
      <!-- Header - End -->

      <div class="px-4 md:px-10 mx-auto w-full -m-24"></div>
    </div>
  </div>
</template>


<script lang="ts">
import NavbarComponent from "../components/Navbar.vue";
import SidebarComponent from "../components/Sidebar.vue";
import inquiryFunction from "../library/inquiry_function";
// import globalParam from "../library/global_param";
// import trancode_service from "@/library/trancode_service";
import trancode_generic_blockchain from "@/library/trancode_generic_blockchain";
import {defineComponent} from "vue";

export default defineComponent( {
  name: "demo-page",
  components: {
    NavbarComponent,
    SidebarComponent,
  },
  data() {
    return {
      address: "",
    };
  },
  mounted: async function () {
    this.address = "123";
    this.address = await inquiryFunction.getDataLength("asfafa");
  },
  methods: {
    async debugOne() {
      // alert("debug one")

      // let tx = "0xef72252ad771de6d77122db1b6185ae43b73a95a4408263ff77fd701ca6ab69c";
      // let result = await trancode_generic_service.getTransactionReceipt(tx);
      // console.log("result",result)
      // let item = result.logs[0];
      // console.log("item-log",item)
      // let topic = item.topics[0];
      // console.log("topic",topic)


      let output = await trancode_generic_blockchain.getLogs();
      console.log("result",output)

      let items : any[] = output.result;
      let output2 = items.map(x => x.transactionHash);
      console.log("result topic2",output2)


      // let t = await trancode_service.getData();
      // this.address = t;
    },
    async debugTwo() {
      // alert("debug two")

      let tx = "0xef72252ad771de6d77122db1b6185ae43b73a95a4408263ff77fd701ca6ab69c";
      let output = await trancode_generic_blockchain.getTopicFromTransactionReceipt(tx);
      console.log("result topic",output)



      // let t = await trancode_service.updateData("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266","hi 123");
    },

  },
});
</script>
