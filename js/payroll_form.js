var salaryOutput = document.querySelector(".salary-output");
var salary = document.querySelector("#salary");
salary.addEventListener("input", function () {
  salaryOutput.textContent = salary.value;
});

function save(e) {
  let name = document.getElementById("name").value;
  let date = document.getElementById("day").value;
  let month = document.getElementById("month").value;
  let year = document.getElementById("year").value;
  let startDate = Date.parse(year + "-" + month + "-" + date);

  let nameRegex = RegExp("^[A-Z][a-z]{2,}$");
  if (!nameRegex.test(name)) {
    alert("Invalid name");
    return false;
  }

  let difference = Math.abs(Date.now() - startDate);
  difference = Math.ceil(difference / (1000 * 60 * 60 * 24));
  if (difference > 30) {
    alert("Invalid Date");
    return false;
  }
}
