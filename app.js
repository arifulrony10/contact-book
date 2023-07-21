const contactList = [
  {
    id: 1,
    firstName: "md. ariful",
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

// ! handle contact save
const handleSaveContact = (e) => {
  // prevent default
  e.preventDefault();
  // save to contact list variable
  const contactObj = {
    id: +`${contactList.length}`,
    firstName: $("#firstName")?.val().toLowerCase(),
    lastName: $("#lastName")?.val().toLowerCase(),
    phone: $("#phone")?.val().toLowerCase(),
    email: $("#email")?.val().toLowerCase(),
    address: $("#address")?.val().toLowerCase(),
  };
  contactList.push(contactObj);
  console.log(contactList);

  resetFormInputs(contactAddForm); // form input field reset
  // close modal
  closeAddContactModal();
  updateContactPage(contactList);
};

// ! update contact list

const updateContactPage = (contactList) => {
  // update dom
  $(".contact-lists").empty();

  // check if contact exists or not
  contactList.length !== 0
    ? contactList?.map((obj) => {
        $("<li />", {
          text: `${
            obj.firstName.charAt(0).toUpperCase() +
            obj.firstName.slice(1).toLowerCase()
          } ${
            obj.lastName.charAt(0).toUpperCase() +
            obj.lastName.slice(1).toLowerCase()
          }`,
          class: "contact-list-info",
        }).appendTo(".contact-lists");
      })
    : $("<li />", {
        text: `No Contact Found`,
        class: "no-contact-msg",
      }).appendTo(".contact-lists") &&
      homeBtn.css({ transform: "translateX(0)" });
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

  console.log(foundList);
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

updateContactPage(contactList);
