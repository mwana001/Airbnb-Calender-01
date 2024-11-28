document.addEventListener("DOMContentLoaded", function () {
  // Calendar element
  var calendarEl = document.getElementById("calendar");

  // Calendar initialization
  var calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: "dayGridMonth",
    editable: true,
    events: [],
    eventClick: function (info) {
      if (confirm("Do you want to delete this booking?")) {
        info.event.remove();
      }
    }
  });

  calendar.render();

  // Handle form submission
  document.getElementById("bookingForm").addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form values
    const location = document.getElementById("location").value;
    const checkin = document.getElementById("checkin").value;
    const checkout = document.getElementById("checkout").value;

    // Add event to calendar
    if (checkin && checkout) {
      calendar.addEvent({
        title: `Booking: ${location}`,
        start: checkin,
        end: checkout,
        color: "green",
      });

      // Reset form
      e.target.reset();
    } else {
      alert("Please fill in all fields!");
    }
  });
});