const contactList = [
  {
    id: 1,
    firstName: "ariful",
    lastName: "islam",
    phone: "01305252052",
    email: "ariful.rony10@gmail.com",
    address: "baridhara, dhaka-1212",
  },
  {
    id: 2,
    firstName: "dummy",
    lastName: "joe",
    phone: "01216546544",
    email: "dummy.joe@gmail.com",
    address: "unknown",
  },
  {
    id: 3,
    firstName: "patty",
    lastName: "bugg",
    phone: "01586523945",
    email: "bugg@gmail.com",
    address: "baridhara, dhaka-1212",
  },
  {
    id: 4,
    firstName: "the",
    lastName: "weeknd",
    phone: "01236547896",
    email: "the@weeknd.com",
    address: "baridhara, dhaka-1212",
  },
  {
    id: 5,
    firstName: "kendrick",
    lastName: "lamar",
    phone: "01936547896",
    email: "hi@lamar.com",
    address: "baridhara, dhaka-1212",
  },
];

// select dom elements
const contactAddModal = $(".contact-add-modal"); // contact add modal
const contactAddForm = $(".contact-add-form"); // contact add form
const searchForm = $("#search-form"); // search form
const searchInput = $("#search");

const contactAddBtn = $("#add-contact-btn");
const contactCloseBtn = $("#add-contact-close-btn");
const contactFormSaveBtn = $("add-contact-save-btn");
const contactFormClearBtn = $("add-contact-reset-btn");
const contactSearchBtn = $("#contact-search-btn"); // contact add form
const homeBtn = $(".home-btn");

// open add contact modal
const openAddContactModal = () => {
  contactAddModal.addClass("open");
};
// close add contact modal
const closeAddContactModal = () => {
  contactAddModal.removeClass("open");
};

// clear form data
const resetFormInputs = (form) => {
  form.trigger("reset");
};

// form validation
function validateForm() {
  const firstName = $("#firstName").val();
  const lastName = $("#lastName").val();
  const phone = $("#phone").val();
  const email = $("#email").val();
  const address = $("#address").val();

  if (
    firstName === "" ||
    lastName === "" ||
    phone === "" ||
    email === "" ||
    address === ""
  ) {
    alert("Name is required!");
    return false;
  }

  return true;
}

// ? sowh contacts

const showContacts = () => {
  let contactDB;

  if (localStorage.getItem("contactDB") === null) {
    contactDB = [];
  } else {
    contactDB = JSON.parse(localStorage.getItem("contactDB"));
  }

  let html = "";

  contactDB.forEach((element, index) => {
    html += `<li class='contact-list-info'><span>${element.firstName} ${
      element.lastName
    }</span><div><button onclick="updateContact(${+index})" class="material-symbols-outlined contact-edit-btn">edit_square</button> <button onclick="deleteContact(${+index})" class="material-symbols-outlined contact-delete-btn">delete</button></div> </li>`;
  });

  $("#contact-lists").html(html);
};

// ! handle contact save
const handleSaveContact = (e) => {
  // prevent default
  e.preventDefault();
  // save to contact list variable

  // ? save data to local storage start
  let contactDB;

  if (localStorage.getItem("contactDB") === null) {
    contactDB = [];
  } else {
    contactDB = JSON.parse(localStorage.getItem("contactDB"));
  }

  contactDB.push({
    firstName: $("#firstName")?.val().toLowerCase(),
    lastName: $("#lastName")?.val().toLowerCase(),
    phone: $("#phone")?.val().toLowerCase(),
    email: $("#email")?.val().toLowerCase(),
    address: $("#address")?.val().toLowerCase(),
  });

  localStorage.setItem("contactDB", JSON.stringify(contactDB));
  // ? save data to local storage end

  // const contactObj = {
  //   id: +`${contactList.length}`,
  //   firstName: $("#firstName")?.val().toLowerCase(),
  //   lastName: $("#lastName")?.val().toLowerCase(),
  //   phone: $("#phone")?.val().toLowerCase(),
  //   email: $("#email")?.val().toLowerCase(),
  //   address: $("#address")?.val().toLowerCase(),
  // };
  // contactList.push(contactObj);
  // console.log(contactList);

  // resetFormInputs(contactAddForm); // form input field reset
  // // close modal
  // closeAddContactModal();
  // updateContactPage(contactList);
};

// ! update contact list

const updateContactPage = (contactList) => {
  let contactDB;
  if (localStorage.getItem("contactDB") === null) {
    contactDB = [];
  } else {
    contactDB = JSON.parse(localStorage.getItem("contactDB"));
  }

  let html = "";

  contactDB.forEach((element, index) => {
    html += `<li class='contact-list-info'><span>${element.firstName} ${
      element.lastName
    }</span><div><button onclick="updateContact(${+index})" class="material-symbols-outlined contact-edit-btn">edit_square</button> <button onclick="deleteContact(${+index})" class="material-symbols-outlined contact-delete-btn">delete</button></div> </li>`;
  });

  // append html to class lists
  $("#contact-lists").html(html);
};

// !handle update contact

const updateContact = (index) => {
  openAddContactModal();

  // document.getElementById("submit").style.display = "none";
  // document.getElementById("update").style.display = "block";

  let contactDB;

  if (localStorage.getItem("contactDB") === null) {
    contactDB = [];
  } else {
    contactDB = JSON.parse(localStorage.getItem("contactDB"));
  }

  $("#firstName").val(contactDB[index].firstName);
  $("#lastName").val(contactDB[index].lastName);
  $("#phone").val(contactDB[index].phone);
  $("#email").val(contactDB[index].email);
  $("#address").val(contactDB[index].address);

  document.getElementById("update").onclick = () => {
    if (validateForm() === true) {
      contactDB[index].firstName = $("#firstName").val();
      contactDB[index].lastName = $("#lastName").val();
      contactDB[index].phone = $("#phone").val();
      contactDB[index].email = $("#email").val();
      contactDB[index].address = $("#address").val();

      localStorage.setItem("contactDB", JSON.stringify(contactDB));

      showContacts();

      $("#firstName").val("");
      $("#lastName").val("");
      $("#phone").val("");
      $("#email").val("");
      $("#address").val("");

      // document.getElementById("submit").style.display = "block";
      // document.getElementById("update").style.display = "none";
    }
  };
};

// ! handle search
const handleContactSearch = (e) => {
  console.log("executed");
  e.preventDefault();
  const searchParam = searchInput?.val().toLowerCase();
  const foundList = [];
  contactList.filter((contactObj) => {
    Object.values(contactObj).includes(searchParam)
      ? foundList.push(contactObj)
      : null;
  });

  updateContactPage(foundList);
};

// ! handle home btn click

const handleHomeBtnClick = () => {
  updateContactPage(contactList);
  homeBtn.css({ transform: "translateX(-120vw)" });
  resetFormInputs(searchForm);
};

// click events
contactAddBtn.click(openAddContactModal);
contactCloseBtn.click(closeAddContactModal);
contactAddForm.submit(handleSaveContact);
contactFormClearBtn.click(resetFormInputs(contactAddForm));
searchForm.submit(handleContactSearch);
homeBtn.click(handleHomeBtnClick);

document.onload(showContacts());
