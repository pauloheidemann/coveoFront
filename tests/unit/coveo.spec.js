import { shallowMount } from "@vue/test-utils";
import Coveo from "@/components/Coveo.vue";
import moxios from "moxios";
import expect from 'expect';
import Vue from "vue";
import Dialog from 'vue-dialog-loading';

Vue.use(Dialog);

describe("Coveo.vue", () => {
  let wrapper;
  const ACCESS_TOKEN = "058c85fd-3c79-42a3-9236-b83d35588103"

  // Helper Functions
  let see = (text, selector) => {
    let wrap = selector ? wrapper.find(selector) : wrapper;
    expect(wrap.html()).toContain(text);
  };

  let click = selector => {
      wrapper.find(selector).trigger('click');
  };

  beforeEach(function () {
    moxios.install();
    wrapper = shallowMount(Coveo);
  });

  afterEach(function () {
    moxios.uninstall()
  });
  
  it("Presents form", () => {
    //checks if the form has been rendered properly
    see('Generic search');
  });

  it("POST request to get all wines", (done) => {
    //stubs a request to retrieve all wines
    moxios.stubRequest("https://cloudplatform.coveo.com/rest/search?access_token=" + ACCESS_TOKEN, {
      status: 200,
      responseText: {
        data : [
          {title: "wine", uri: "", thumbnail: "", category: ""},
          {title: "wine2", uri: "", thumbnail: "", category: ""},
          {title: "wine3", uri: "", thumbnail: "", category: ""}
        ]
      }
    });

    //Executes the method search without parameters using the stub above
    click("#search");

    //Waits for the API call and checks if the text is in the html
    moxios.wait(function () {
      see('wine');
      done();
    });

  });
});