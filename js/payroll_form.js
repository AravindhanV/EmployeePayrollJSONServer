var salaryOutput = document.querySelector(".salary-output");
var salary = document.querySelector("#salary");
salary.addEventListener("input", function () {
  salaryOutput.textContent = salary.value;
});

function save(e) {
  e.preventDefault();
  let name = document.getElementById("name").value;
  let date = document.getElementById("day").value;
  let month = document.getElementById("month").value;
  let year = document.getElementById("year").value;
  let startDate = Date.parse(year + "-" + month + "-" + date);
}
