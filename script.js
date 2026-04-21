async function fetchMealData() {
  const status = document.querySelector("#status");

  try {
    status.textContent = "로딩중...";

    const res = await fetch(
      "https://open.neis.go.kr/hub/mealServiceDietInfo?KEY=cb109111c234423f84d29555a04e51a3&Type=json&ATPT_OFCDC_SC_CODE=F10&SD_SCHUL_CODE=7380292&MLSV_YMD=20260422",
    );

    if (!res.ok) {
      throw new Error("API 요청 실패");
    }

    const data = await res.json();

    const meal = data.mealServiceDietInfo[1].row;

    document.querySelector("#breakfast").innerHTML = meal[0].DDISH_NM.replace(
      /\([0-9.]+\)/g,
      "",
    ).replace(/<br\/>/g, "<br>");

    document.querySelector("#lunch").innerHTML = meal[1].DDISH_NM.replace(
      /\([0-9.]+\)/g,
      "",
    ).replace(/<br\/>/g, "<br>");

    document.querySelector("#dinner").innerHTML = meal[2].DDISH_NM.replace(
      /\([0-9.]+\)/g,
      "",
    ).replace(/<br\/>/g, "<br>");

    status.textContent = "";
  } catch (error) {
    status.textContent = "에러 발생";

    console.error(error);
  }
}

document.querySelector("#reloadBtn").addEventListener("click", function () {
  fetchMealData();
});
