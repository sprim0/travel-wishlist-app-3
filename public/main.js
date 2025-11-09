var thumbUp = document.getElementsByClassName("fa-thumbs-up");
var trash = document.getElementsByClassName("fa-trash");


Array.from(thumbUp).forEach(function(element) {
      element.addEventListener('click', function(event){
        // closest goes to the 1st ancestor that matches the selector
        const date = this.closest('li').querySelector('.date').innerText
        window.location.href = `/profile?date=${encodeURIComponent(date)}` //encodedURIComponent makes the date URL friendly b/c of the '/'
        
      });
});

Array.from(trash).forEach(function(element) {
      element.addEventListener('click', function(){
        const location = encodeURIComponent (this.closest('li').querySelector('.location').innerText)
        const date = encodeURIComponent (this.parentNode.parentNode.childNodes[3].innerText)
        fetch(`messages?date=${date}&location=${location}`, {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'location': location,
            'date': date
          })
        }).then(function (response) {
          window.location.reload()
        })
      });
});

// Get trip by date
const getTripButtons = document.querySelectorAll('.thumbs-up'); // your "Get Trip" buttons
getTripButtons.forEach(button => {
  button.addEventListener('click', async function () {
    const date = this.closest('li').querySelector('.date').innerText.trim();
    try {
      const res = await fetch(`/getTrip?date=${encodeURIComponent(date)}`);
      if (!res.ok) throw new Error('Trip not found');
      const trip = await res.json();

      // Fill the textareas with the trip data
      document.querySelector('textarea[name="location"]').value = trip.location || '';
      document.querySelector('textarea[name="entry2"]').value = trip.entry2 || '';
      document.querySelector('textarea[name="entry3"]').value = trip.entry3 || '';
      document.querySelector('input[name="date"]').value = trip.date || '';

    } catch (err) {
      console.error(err);
      alert('Could not load this trip.');
    }
  });
});




// debugging completed with chatgpt