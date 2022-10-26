
$(".spa-menu__link").on("click", (event) => {
  event.preventDefault();
  const href = $(event.target).attr("href");
  changeUrlPath(href);
});

// popstate provided by JS
$(window).on("popstate", (event) => {
  console.log("popstate", event);
});

// create by us
$(window).on("locationchange", async (event) => {
  const url = event.detail.url;
  console.log("locationchange", url);
  switch (url) {
    case "/abc": {
      // const response = await fetch(
      //   "https://data.tycg.gov.tw/opendata/datalist/datasetMeta/download?id=5ca2bfc7-9ace-4719-88ae-4034b9a5a55c&rid=a1b4714b-3b75-4ff8-a8f2-cc377e4eaa0f",
      //   {
      //     method: "get"
      //   }
      // );
      // const data = await response.json();
      // console.log("response", data);
      $("#main").html("ABC Page");
      $(document).prop("title", "Page ABC");
      break;
    }
    case "/def": {
      $("#main").html("DEF Page");
      $(document).prop("title", "Page DEF");
      break;
    }
    case "/ghi": {
      $("#main").html("GHI Page");
      $(document).prop("title", "Page GHI");
      break;
    }
    default: {
      //
    }
  }
});

const { history } = window;
// const history  = window.history

const changeUrlPath = (url, data) => {
  const historyData = {
    ...data,
    url
  };
  history.pushState(historyData, "", url);
  const event = new CustomEvent("locationchange", { detail: historyData });
  window.dispatchEvent(event);
};

$("#spa-back").on("click", () => {
  history.back();
});
