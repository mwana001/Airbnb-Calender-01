document.addEventListener("DOMContentLoaded", () => {
  const calendarEl = document.getElementById("calendar");
  const bookingForm = document.getElementById("bookingForm");
  const formTitle = document.getElementById("formTitle");
  const nameInput = document.getElementById("name");
  const contactInput = document.getElementById("contact");
  const locationInput = document.getElementById("location");
  const checkinInput = document.getElementById("checkin");
  const checkoutInput = document.getElementById("checkout");
  let editingEvent = null;

  // Initialize the calendar
  const calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: "dayGridMonth",
    editable: true,
    selectable: true,
    events: [],
    eventClick: function (info) {
      // Populate the form with event details
      editingEvent = info.event;
      nameInput.value = info.event.title;
      contactInput.value = info.event.extendedProps.contact;
      locationInput.value = info.event.extendedProps.location;
      checkinInput.value = info.event.startStr;
      checkoutInput.value = info.event.endStr.slice(0, 10); // Remove timestamp
      bookingForm.style.display = "block";
      formTitle.textContent = "Edit Booking";
    },
  });

  calendar.render();

  // Add booking
  document.getElementById("addBookingBtn").addEventListener("click", () => {
    bookingForm.style.display = "block";
    formTitle.textContent = "Add Booking";
    bookingForm.reset();
    editingEvent = null; // Clear editing state
  });

  // Save booking
  bookingForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const newEvent = {
      title: nameInput.value,
      start: checkinInput.value,
      end: new Date(checkoutInput.value).toISOString(), // Add time offset
      extendedProps: {
        contact: contactInput.value,
        location: locationInput.value,
      },
    };

    if (editingEvent) {
      // Update existing event
      editingEvent.setProp("title", newEvent.title);
      editingEvent.setStart(newEvent.start);
      editingEvent.setEnd(newEvent.end);
      editingEvent.setExtendedProp("contact", newEvent.extendedProps.contact);
      editingEvent.setExtendedProp("location", newEvent.extendedProps.location);
    } else {
      // Add new event
      calendar.addEvent(newEvent);
    }

    bookingForm.reset();
    bookingForm.style.display = "none";
  });

  // Delete booking
  document.getElementById("deleteBookingBtn").addEventListener("click", () => {
    if (editingEvent) {
      editingEvent.remove();
      bookingForm.reset();
      bookingForm.style.display = "none";
    } else {
      alert("Please select a booking to delete.");
    }
  });
});
