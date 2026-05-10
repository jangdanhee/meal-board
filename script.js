async function fetchMealData() {
  const status = document.querySelector("#status");

  try {
    status.textContent = "로딩중...";

    const ymd = new Date().toISOString().slice(0, 10).replace(/-/g, "");

    const res = await fetch(
      `https://open.neis.go.kr/hub/mealServiceDietInfo?KEY=cb109111c234423f84d29555a04e51a3&Type=json&ATPT_OFCDC_SC_CODE=F10&SD_SCHUL_CODE=7380292&MLSV_YMD=${ymd}`,
    );

    if (!res.ok) throw new Error("API 요청 실패");

    const data = await res.json();

    const rows = data.mealServiceDietInfo?.[1]?.row;
    if (!rows) throw new Error("NO_MEAL");

    const clean = (dish) =>
      dish?.DDISH_NM?.replace(/\([0-9.]+\)/g, "").replace(/<br\/>/g, "<br>") ??
      "급식 없음";

    const getByMealType = (code) =>
      rows.find((r) => r.MMEAL_SC_CODE === String(code));

    document.querySelector("#breakfast").innerHTML = clean(getByMealType(1));
    document.querySelector("#lunch").innerHTML = clean(getByMealType(2));
    document.querySelector("#dinner").innerHTML = clean(getByMealType(3));
    status.textContent = "";
  } catch (error) {
    if (error.message === "NO_MEAL") {
      status.textContent = "오늘은 급식이 없습니다.";
    } else if (error instanceof TypeError) {
      status.textContent = "네트워크 오류가 발생했습니다.";
    } else {
      status.textContent = `오류: ${error.message}`;
    }
    console.error(error);
  }
}

document.querySelector("#reloadBtn").addEventListener("click", function () {
  fetchMealData();
});

function updateClock() {
  var now = new Date();
  var hours = now.getHours().toString().padStart(2, "0");
  var minutes = now.getMinutes().toString().padStart(2, "0");
  var seconds = now.getSeconds().toString().padStart(2, "0");

  var timeString = `${hours}:${minutes}:${seconds}`;
  document.getElementById("clock").textContent = timeString;
}

setInterval(updateClock, 1000);

updateClock();
