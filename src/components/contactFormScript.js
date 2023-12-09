// document.addEventListener('DOMContentLoaded', function() {
//     var contactForm = document.getElementById('contactForm');
  
//     contactForm.addEventListener('submit', function(event) {
//       event.preventDefault();
  
//       var name = document.getElementById('name').value;
//       var contactInfo = document.getElementById('contactInfo').value;
//       var subject = document.getElementById('subject').value;
//       var message = document.getElementById('message').value;
  
//       // Display the entered information
//       alert('Name: ' + name + '\nContact Information: ' + contactInfo + '\nSubject: ' + subject + '\nMessage: ' + message);
  
//       // You can also send this data to a server using AJAX or perform other actions.
//     });
//   });
  

document.addEventListener('DOMContentLoaded', function() {
    var contactForm = document.getElementById('contactForm');
  
    if (contactForm) {
      console.log('Contact form found!');
      
      contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
  
        var name = document.getElementById('name').value;
        var contactInfo = document.getElementById('contactInfo').value;
        var subject = document.getElementById('subject').value;
        var message = document.getElementById('message').value;
  
        // Display the entered information
        alert('Name: ' + name + '\nContact Information: ' + contactInfo + '\nSubject: ' + subject + '\nMessage: ' + message);
  
        // You can also send this data to a server using AJAX or perform other actions.
      });
    } else {
      console.error('Contact form not found!');
    }
  });
  