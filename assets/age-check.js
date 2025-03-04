document.addEventListener("DOMContentLoaded", function () {
    var agePopup = document.getElementById("age-check-overlay");
  
    // Controleren of de gebruiker al is geverifieerd
    if (document.cookie.includes("age_verified=true")) {
      agePopup.style.display = "none";
      return;
    }
  
    document.body.style.overflow = "hidden"; // Voorkom scrollen op de site
  
    document.getElementById("verify-age").addEventListener("click", function () {
      var birthdate = document.getElementById("birthdate").value;
      if (!birthdate) return;
  
      var today = new Date();
      var birthDateObj = new Date(birthdate);
      var age = today.getFullYear() - birthDateObj.getFullYear();
      var m = today.getMonth() - birthDateObj.getMonth();
  
      if (m < 0 || (m === 0 && today.getDate() < birthDateObj.getDate())) {
        age--;
      }
  
      if (age >= 18) {
        document.cookie = "age_verified=true; path=/; max-age=" + 60 * 60 * 24 * 365; // 1 jaar geldig
        agePopup.style.display = "none";
        document.body.style.overflow = "auto"; // Scrollen weer toestaan
      } else {
        document.getElementById("age-check-error").style.display = "block";
        setTimeout(function () {
          window.location.href = "https://www.google.com"; // Redirect naar een andere site
        }, 3000); // 3 seconden wachten en dan doorsturen
      }
    });
  });
  