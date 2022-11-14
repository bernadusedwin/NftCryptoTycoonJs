<template>
  <nav
      class="
      md:left-0
      md:block
      md:fixed
      md:top-0
      md:bottom-0
      md:overflow-y-auto
      md:flex-row md:flex-nowrap
      md:overflow-hidden
      shadow-xl
      bg-white
      flex flex-wrap
      items-center
      justify-between
      relative
      md:w-64
      z-10
      py-4
      px-6
    "
  >
    <div
        class="
        md:flex-col
        md:items-stretch
        md:min-h-full
        md:flex-nowrap
        px-0
        flex flex-wrap
        items-center
        justify-between
        w-full
        mx-auto
      "
    >
      <!-- Toggler -->
      <button
          class="
          cursor-pointer
          text-black
          opacity-50
          md:hidden
          px-3
          py-1
          text-xl
          leading-none
          bg-transparent
          rounded
          border border-solid border-transparent
        "
          type="button"
          v-on:click="toggleCollapseShow('bg-white m-2 py-3 px-6')"
      >
        <i class="fas fa-bars"></i>
      </button>
      <!-- Brand -->
      <a
          class="
          md:block
          text-left
          md:pb-2
          text-blueGray-600
          mr-0
          inline-block
          whitespace-nowrap
          text-sm
          uppercase
          font-bold
          p-4
          px-0
        "
          href="/"
      >
        {{ appName }}
      </a>
      <!-- User -->
      <ul class="md:hidden items-center flex flex-wrap list-none">
        <li class="inline-block relative">
          <!--          <notification-dropdown-component></notification-dropdown-component>-->
        </li>
        <li class="inline-block relative">
          <!--          <user-dropdown-component></user-dropdown-component>-->
        </li>
      </ul>
      <!-- Collapse -->
      <div
          class="
          md:flex md:flex-col
          md:items-stretch
          md:opacity-100
          md:relative
          md:mt-4
          md:shadow-none
          shadow
          absolute
          top-0
          left-0
          right-0
          z-40
          overflow-y-auto overflow-x-hidden
          h-auto
          items-center
          flex-1
          rounded
        "
          v-bind:class="collapseShow"
      >
        <!-- Collapse header -->
        <div
            class="
            md:min-w-full
            md:hidden
            block
            pb-4
            mb-4
            border-b border-solid border-blueGray-200
          "
        >
          <div class="flex flex-wrap">
            <div class="w-6/12">
              <a
                  class="
                  md:block
                  text-left
                  md:pb-2
                  text-blueGray-600
                  mr-0
                  inline-block
                  whitespace-nowrap
                  text-sm
                  uppercase
                  font-bold
                  p-4
                  px-0
                "
                  href="javascript:void(0)"
              >
                {{ appName }}
              </a>
            </div>
            <div class="w-6/12 flex justify-end">
              <button
                  type="button"
                  class="
                  cursor-pointer
                  text-black
                  opacity-50
                  md:hidden
                  px-3
                  py-1
                  text-xl
                  leading-none
                  bg-transparent
                  rounded
                  border border-solid border-transparent
                "
                  v-on:click="toggleCollapseShow('hidden')"
              >
                <i class="fas fa-times"></i>
              </button>
            </div>
          </div>
        </div>
        <!-- Form -->
        <form class="mt-6 mb-4 md:hidden">
          <div class="mb-3 pt-0">
            <!-- <input
              type="text"
              placeholder="Search"
              class="
                border-0
                px-3
                py-2
                h-12
                border border-solid border-blueGray-500
                placeholder-blueGray-300
                text-blueGray-600
                bg-white
                rounded
                text-base
                leading-snug
                shadow-none
                outline-none
                focus:outline-none
                w-full
                font-normal
              "
            /> -->
          </div>
        </form>
        <!-- Navigation -->
        <ul class="md:flex-col md:min-w-full flex flex-col list-none">
          <li class="items-center">
            <a v-bind:class="inquiryMenuClassDashboard()" href="/"
            ><i class="fas fa-tv opacity-75 mr-2 text-sm"></i> Main</a
            >
          </li>
          <li class="items-center">
            <a v-bind:class="inquiryColorMenu('nft2')" href="/nft2"
            ><i class="fas fa-tv opacity-75 mr-2 text-sm"></i> NFT2</a
            >
          </li>
          <li class="items-center">
            <a v-bind:class="inquiryColorMenu('bridge1')" href="/bridge1"
            ><i class="fas fa-tv opacity-75 mr-2 text-sm"></i> Bridge</a
            >
          </li>
          <li class="items-center">
            <a v-bind:class="inquiryColorMenu('bridge2')" href="/bridge2"
            ><i class="fas fa-tv opacity-75 mr-2 text-sm"></i> Bridge2</a
            >
          </li>
          <li class="items-center">
            <a v-bind:class="inquiryColorMenu('intro')" href="/intro"
            ><i class="fas fa-tv opacity-75 mr-2 text-sm"></i> intro</a
            >
          </li>
          <li class="items-center" v-if="isDevMode">
            <a v-bind:class="inquiryColorMenu('info2')" href="/info2"
            ><i class="fas fa-newspaper text-blueGray-400 mr-2 text-sm"></i>
              Debug</a
            >
          </li>

        </ul>
      </div>
    </div>
  </nav>
</template>



<script lang="ts">


import globalParam from "@/library/global_param";
import abiService from "@/library/abi_service";
import {defineComponent} from "vue";

export default defineComponent( {
  data() {
    return {
      collapseShow: "hidden",
      testData : 123
    };
  },
  // hint: search Navigation
  methods: {
    inquiryMenuClassAdmin: function () {
      let v = this.testData;
      if (this.isBoldMenu("info2")) {
        return this.colorTwo;
      } else {
        return this.colorOne;
      }
    },
    inquiryMenuClassDashboard: function () {
      if (this.isDashboard()) {
        return this.colorTwo;
      } else {
        return this.colorOne;
      }
    },
    inquiryColorMenu: function (input : string) {
      // console.log("inquiryColorMenu",input)
      if (this.isBoldMenu(input)) {
        return this.colorTwo;
      } else {
        return this.colorOne;
      }
    },
    inquiryMenuClassDemo: function () {
      if (this.isBoldMenu("demo")) {
        return this.colorTwo;
      } else {
        return this.colorOne;
      }
    },
    inquiryMenuClassDocumentation: function () {
      if (this.isBoldMenu("documentation")) {
        return this.colorTwo;
      } else {
        return this.colorOne;
      }
    },
    toggleCollapseShow: function (classes : any) {
      this.collapseShow = classes;
    },
    isBoldMenu(input : string) {
      let url = window.location.href;
      let input2 = input.toString();
      let output = url.toLowerCase().includes(input2);
      return output;
    },
    isDashboard() {
      let url = window.location.href;
      // console.log("current url", url)
      let l = this.getLocation(url)
      // console.log("hostname", l.origin)

      let url2 = this.trimChar(url,"/")
      // console.log("url2", url)
      if (url2 == l.origin) {
        return true;
      } else {
        return false;
      }
    },
    trimChar(string : string, charToRemove : any) {
      while (string.charAt(0) == charToRemove) {
        string = string.substring(1);
      }

      while (string.charAt(string.length - 1) == charToRemove) {
        string = string.substring(0, string.length - 1);
      }

      return string;
    },
    getLocation(href : string) {
      var l = document.createElement("a");
      l.href = href;
      return l;
    }
  },
  components: {
    // NotificationDropdownComponent,
    // UserDropdownComponent
  },
  computed: {

    colorOne() {
      let output =
          "text-blueGray-700 hover:text-blueGray-500 text-xs uppercase py-3 font-bold block";
      return output;
    },
    colorTwo() {
      let output =
          "text-pink-500 hover:text-pink-600 text-xs uppercase py-3 font-bold block";
      return output;
    },
    appName(){
      return globalParam.getAppName();
    },
    version(){
      return globalParam.getVersion();
    },
    isDevMode: function () {
      return abiService.isDevMode();
      // return true;
    },
  },
});
</script>
