const week2 = document.getElementById("week");
const state = document.getElementById("state");
const daum = document.getElementById("DaumStateText");
const naver = document.getElementById("NaverStateText");
const all = document.getElementById("AllStateText");
const home = document.getElementById("HomeStateText");
const about = document.getElementById("AboutStateText");

function showWeek() {
  week2.style.display = "block";
}
function hideWeek() {
  week2.style.display = "none";
}
function showState() {
  state.style.display = "none";
}
function hideWeek() {
  state.style.display = "none";
}

function selWeek() {
  week2.style.display = "block";
  state.style.display = "none";
}

function selState() {
  week2.style.display = "none";
  state.style.display = "block";
}

function selDaum() {
  daum.style.display = "block";
  naver.style.display = "none";
  all.style.display = "none";
  home.style.display = "none";
  about.style.display = "none";
}

function selNaver() {
  daum.style.display = "none";
  naver.style.display = "block";
  all.style.display = "none";
  home.style.display = "none";
  about.style.display = "none";
}

function selAll() {
  daum.style.display = "none";
  naver.style.display = "none";
  all.style.display = "block";
  home.style.display = "none";
  about.style.display = "none";
}

function selHome() {
  daum.style.display = "none";
  naver.style.display = "none";
  all.style.display = "none";
  home.style.display = "block";
  about.style.display = "none";
}

function selAbout() {
  daum.style.display = "none";
  naver.style.display = "none";
  all.style.display = "none";
  home.style.display = "none";
  about.style.display = "block";
}

/*API*/
const api_url = "https://korean-webtoon-hub-project.herokuapp.com/";
var today = new Date();
var week = ["mon", "tue", "wed", "thu", "fri", "sat", "sun", "finished", "all"];
var service_num = 0;
var state_num = null;
var week_num = today.getDay();

reload();

function ajax_get(url, callback) {
  //ajax 구현을 위한 함수
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      console.log("responseText:" + xmlhttp.responseText);
      try {
        var data = JSON.parse(xmlhttp.responseText);
      } catch (err) {
        console.log(err.message + " in " + xmlhttp.responseText);
        return;
      }
      callback(data);
    }
  };
  xmlhttp.open("GET", url, false); //true는 비동기식, false는 동기식 true로 할시 변수 변경전에 웹페이지가 떠버림
  xmlhttp.send();
}

function get_weeknum_reload(get_week_num) {
  week_num = get_week_num;
  reload();
}

function get_service_num_reload(get_service_num) {
  service_num = get_service_num;
  reload();
}

function get_state_num_reload(get_state_num) {
  week_num = 8;
  state_num = get_state_num;
  reload();
}

function reload() {
  var webtoon_contents = document.getElementById("webtoon_contents");
  webtoon_contents.innerHTML = "";
  var target_api = api_url + week[week_num];
  ajax_get(target_api, function (data) {
    for (i = 0; i < data.length; i++) {
      if (service_num == 0) {
        view_by_state();
      } else if (data[i].service == service_num) {
        view_by_state();
      }

      function view_by_state() {
        if (state_num == null) {
          get_webtoon();
        } else if (data[i].state == state_num) {
          get_webtoon();
        }
      }

      function get_webtoon() {
        //웹툰 정보 받아오기
        var webtoon_link = document.createElement("a");
        webtoon_link.href = data[i].url;
        var new_dt = document.createElement("dt");
        new_dt.classList.add("webtoon_container");
        var new_div = document.createElement("div");
        new_div.classList.add("square");
        var img_container = document.createElement("div");
        img_container.classList.add("content");
        var img_text = document.createElement("div");
        img_text.classList.add("icon");
        var new_dd = document.createElement("dd");
        new_dd.classList.add("webtoon_info");
        if (data[i].img == null) {
          img_container.innerHTML =
            "<img src=../img/noimg.jpg width=25% height=15%>";
        } else {
          img_container.innerHTML =
            "<img style='object-fit:cover;width:100%;'src=" + data[i].img + ">";
        }
        new_dd.innerHTML =
          "<p style='font-size:1.1em;line-height:120%;'>" +
          data[i].title +
          "</p><p style='font-size:0.8em;'>" +
          data[i].artist +
          "</p>";

        switch (data[i].service) {
          case "Naver":
            img_text.innerHTML = "<img src=../img/naver.png width=30%>";
            break;
          case "Daum":
            img_text.innerHTML = "<img src=../img/daum.png width=30%>";
            break;
        }
        webtoon_contents.appendChild(webtoon_link);
        webtoon_link.appendChild(new_dt);
        new_dt.appendChild(new_div);
        new_div.appendChild(img_container);
        img_container.appendChild(img_text);
        new_dt.appendChild(new_dd);
      }
    }
  });
}

/*메뉴 클릭 이벤트 */
var menu = document.querySelector(".top_display_week_web");

function clickHandler(e) {
  console.log(e.target);
  console.log(e.currentTarget);
  console.log(this);
  console.log(this == e.currentTarget);
}

var currentMenu;
var menu = document.querySelector(".top_display_week_web");

function inactivate(elem) {
  elem.classList.remove("clicked");
}

function activate(elem) {
  elem.classList.add("clicked");
  currentMenu = elem;
}
function clickHandler(e) {
  if (currentMenu) {
    inactivate(currentMenu);
  }
  activate(e.target);
}

menu.addEventListener("click", clickHandler);
