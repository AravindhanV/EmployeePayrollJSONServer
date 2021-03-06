let isUpdate = 1;
let employeePayrollObj = {};

window.addEventListener("DOMContentLoaded", (event) => {
  const name = document.getElementById("name");
  const textError = document.querySelector(".text-error");
  name.addEventListener("input", function () {
    if (name.value.length == 0) {
      textError.textContent = "";
      return;
    }
    try {
      checkName(name.value);
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
      checkStartDate(new Date(Date.parse(startDate)));
      dateError.textContent = "";
    } catch (e) {
      dateError.textContent = e;
    }
  }

  checkForUpdate();
});

const checkForUpdate = () => {
  const employeePayrollJson = localStorage.getItem("editEmp");
  isUpdate = employeePayrollJson ? true : false;
  if (!isUpdate) return;
  employeePayrollObj = JSON.parse(employeePayrollJson);
  setForm();
};

const setForm = () => {
  setValue("#name", employeePayrollObj.name);
  setSelectedValues("[name=profile]", employeePayrollObj.profilePic);
  setSelectedValues("[name=gender]", employeePayrollObj.gender);
  setSelectedValues("[name=department", employeePayrollObj.department);
  setValue("#salary", employeePayrollObj.salary);
  setTextValue(".salary-output", employeePayrollObj.salary);
  setValue("#notes", employeePayrollObj.note);
  let date = stringifyDate(employeePayrollObj.startDate).split("/");
  setValue("#day", date[0].replace(/^0+/, ""));
  setValue("#month", date[1].replace(/^0+/, ""));
  setValue("#year", date[2]);
};

const setSelectedValues = (propertyValue, value) => {
  let allItems = document.querySelectorAll(propertyValue);
  allItems.forEach((item) => {
    if (Array.isArray(value)) {
      if (value.includes(item.value)) {
        item.checked = true;
      }
    } else if (item.value == value) {
      item.checked = true;
    }
  });
};

const save = (event) => {
  event.preventDefault();
  event.stopPropagation();
  try {
    setEmployeePayrollObject();
    if (site_properties.use_local_storage.match("true")) {
      createAndUpdateStorage();
      resetForm();
      window.location.replace(site_properties.home_page);
    } else {
      createOrUpdateEmployeePayroll();
    }
  } catch (e) {
    console.error(e);
    return;
  }
};

const createOrUpdateEmployeePayroll = () => {
  let postURL = site_properties.server_url;
  let methodCall = "POST";
  if (isUpdate) {
    methodCall = "PUT";
    postURL = postURL + employeePayrollObj.id.toString();
  }
  makeServiceCall(methodCall, postURL, true, employeePayrollObj)
    .then((responseText) => {
      resetForm();
      window.location.replace(site_properties.home_page);
    })
    .catch((error) => {
      throw error;
    });
};

const setEmployeePayrollObject = () => {
  if (!isUpdate && site_properties.use_local_storage.match("true")) {
    employeePayrollObj.id = new Date().getTime();
  }
  employeePayrollObj.name = getInputValueById("#name");
  employeePayrollObj.profilePic = getSelectedValues("[name=profile]").pop();
  employeePayrollObj.gender = getSelectedValues("[name=gender]").pop();
  employeePayrollObj.department = getSelectedValues("[name=department]");
  employeePayrollObj.salary = getInputValueById("#salary");
  employeePayrollObj.note = getInputValueById("#notes");
  let date =
    getInputValueById("#year") +
    "-" +
    getInputValueById("#month") +
    "-" +
    getInputValueById("#day");
  employeePayrollObj.startDate = new Date(Date.parse(date));
};

const createAndUpdateStorage = () => {
  let employeePayrollList = JSON.parse(
    localStorage.getItem("EmployeePayrollList")
  );

  if (employeePayrollList) {
    let empPayrollData = employeePayrollList.find(
      (empData) => empData.id == employeePayrollObj.id
    );

    if (!empPayrollData) {
      employeePayrollList.push(employeePayrollObj);
    } else {
      const index = employeePayrollList
        .map((empData) => empData.id)
        .indexOf(empPayrollData.id);
      employeePayrollList.splice(index, 1, employeePayrollObj);
    }
  } else {
    employeePayrollList = [employeePayrollObj];
  }
  localStorage.setItem(
    "EmployeePayrollList",
    JSON.stringify(employeePayrollList)
  );
};

const resetForm = () => {
  setValue("#name", "");
  unsetSelectedValues("[name=profile]");
  unsetSelectedValues("[name=gender");
  unsetSelectedValues("[name=department");
  setValue("#salary", "");
  setValue("#notes", "");
  setValue("#day", "1");
  setValue("#month", "1");
  setValue("#year", "2021");
  setTextValue(".salary-output", "400000");
};

const unsetSelectedValues = (propertyValue) => {
  let allItems = document.querySelectorAll(propertyValue);
  allItems.forEach((item) => {
    item.checked = false;
  });
};

const setTextValue = (id, value) => {
  const element = document.querySelector(id);
  element.textContent = value;
};

const setValue = (id, value) => {
  const element = document.querySelector(id);
  element.value = value;
};

const getSelectedValues = (propertyValue) => {
  let allItems = document.querySelectorAll(propertyValue);
  let selItems = [];
  allItems.forEach((item) => {
    if (item.checked) selItems.push(item.value);
  });
  return selItems;
};

const getInputValueById = (id) => {
  let value = document.querySelector(id).value;
  return value;
};

const getInputElementValue = (id) => {
  let value = document.getElementById(id).value;
  return value;
};
