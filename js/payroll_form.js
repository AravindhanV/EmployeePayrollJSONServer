window.addEventListener("DOMContentLoaded", (event) => {
  const name = document.getElementById("name");
  const textError = document.querySelector(".text-error");
  name.addEventListener("input", function () {
    if (name.value.length == 0) {
      textError.textContent = "";
      return;
    }
    try {
      new EmployeePayrollData().name = name.value;
      textError.textContent = "";
    } catch (e) {
      textError.textContent = e;
    }
  });

  const salary = document.querySelector("#salary");
  const output = document.querySelector(".salary-output");
  output.textContent = salary.value;
  salary.addEventListener("input", function () {
    output.textContent = salary.value;
  });

  var date = document.getElementById("day");
  var month = document.getElementById("month");
  var year = document.getElementById("year");
  const dateError = document.querySelector(".date-error");
  date.addEventListener("change", validateDate);
  month.addEventListener("change", validateDate);
  year.addEventListener("change", validateDate);

  function validateDate() {
    let startDate = Date.parse(
      year.value + "-" + month.value + "-" + date.value
    );
    try {
      new EmployeePayrollData().startDate = startDate;
      dateError.textContent = "";
    } catch (e) {
      dateError.textContent = e;
    }
  }
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
