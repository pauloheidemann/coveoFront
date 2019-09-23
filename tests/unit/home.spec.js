import { expect } from "chai";
import { shallowMount } from "@vue/test-utils";
import Coveo from "@/components/Coveo.vue";

describe("HelloWorld.vue", () => {
  it("Primeiro teste", () => {
    const wrapper = shallowMount(Coveo);
    console.log(wrapper.find("h1").text());
    expect(wrapper.find("h1").text());
  });
});
