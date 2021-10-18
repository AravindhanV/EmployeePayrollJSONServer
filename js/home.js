let employeePayrollList;
window.addEventListener("DOMContentLoaded", (event) => {
  if (site_properties.use_local_storage.match("true")) {
    getEmployeePayrollDataFromStorage();
  } else {
    getEmployeePayrollDataFromServer();
  }
});

const getEmployeePayrollDataFromStorage = () => {
  employeePayrollList = localStorage.getItem("EmployeePayrollList")
    ? JSON.parse(localStorage.getItem("EmployeePayrollList"))
    : [];
  processEmployeePayrollDataResponse();
};

const processEmployeePayrollDataResponse = () => {
  document.querySelector(".emp-count").textContent = employeePayrollList.length;
  createInnerHtml();
  localStorage.removeItem("editEmp");
};

const getEmployeePayrollDataFromServer = () => {
  makeServiceCall("GET", site_properties.server_url, true)
    .then((responseText) => {
      employeePayrollList = JSON.parse(responseText);
      processEmployeePayrollDataResponse();
    })
    .catch((error) => {
      console.log("GET Error Status: " + JSON.stringify(error));
      employeePayrollList = [];
      processEmployeePayrollDataResponse();
    });
};

const createInnerHtml = () => {
  const headerHtml =
    "<tr><th></th><th>Name</th><th>Gender</th><th>Department</th>" +
    "<th>Salary</th><th>Start Date</th><th>Actions</th></tr>";
  let innerHtml = "";
  if (!employeePayrollList.length == 0) {
    innerHtml = `${headerHtml}`;
    for (const empPayrollData of employeePayrollList) {
      innerHtml = `${innerHtml}
        <tr>
        <td><img class="profile" alt="" src="${empPayrollData.profilePic}"></td>
        <td>${empPayrollData.name}</td>
        <td>${empPayrollData.gender}</td>
        <td>${getDeptHtml(empPayrollData.department)}
        <td>${empPayrollData.salary}</td>
        <td>${formatDate(empPayrollData.startDate)}</td>
        <td>
        <img id="${
          empPayrollData.id
        }" onclick="remove(this)" alt="delete" src="../assets/icons/delete-black-18dp.svg">
        <img id="${
          empPayrollData.id
        }" alt="edit" onclick="update(this)" src="../assets/icons/create-black-18dp.svg">
        </td>
        </tr>
        `;
    }
  }
  document.querySelector("#table-display").innerHTML = innerHtml;
};

const formatDate = (date) => {
  date = new Date(date);
  return (
    date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear()
  );
};

const remove = (node) => {
  let empPayrollData = employeePayrollList.find(
    (empData) => empData.id == node.id
  );
  let temp = employeePayrollList;
  if (!empPayrollData) return;
  const index = employeePayrollList
    .map((empData) => empData.id)
    .indexOf(empPayrollData.id);
  employeePayrollList.splice(index, 1);
  localStorage.setItem(
    "EmployeePayrollList",
    JSON.stringify(employeePayrollList)
  );
  employeePayrollList = temp;
  document.querySelector(".emp-count").textContent = employeePayrollList.length;
  createInnerHtml();
};

const update = (node) => {
  let empPayrollData = employeePayrollList.find(
    (empData) => empData.id == node.id
  );
  if (!empPayrollData) return;
  localStorage.setItem("editEmp", JSON.stringify(empPayrollData));
  window.location.replace(site_properties.add_emp_payroll_page);
};

const getDeptHtml = (departmentList) => {
  let deptHtml = "";
  for (const dept of departmentList) {
    deptHtml = `${deptHtml}<div class="dept-label">${dept}</div>`;
  }
  return deptHtml;
};
