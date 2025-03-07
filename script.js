window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Countdown Timer
const countdownDate = new Date("May 20, 2025 09:00:00").getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const distance = countdownDate - now;
    
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    document.getElementById("days").innerText = days < 10 ? '0' + days : days;
    document.getElementById("hours").innerText = hours < 10 ? '0' + hours : hours;
    document.getElementById("minutes").innerText = minutes < 10 ? '0' + minutes : minutes;
    document.getElementById("seconds").innerText = seconds < 10 ? '0' + seconds : seconds;
    
    if (distance < 0) {
        clearInterval(countdownInterval);
        document.getElementById("days").innerText = "00";
        document.getElementById("hours").innerText = "00";
        document.getElementById("minutes").innerText = "00";
        document.getElementById("seconds").innerText = "00";
    }
}

updateCountdown();
const countdownInterval = setInterval(updateCountdown, 1000);

// Form Submission
// Form Submission with Loading Indicator
document.getElementById('event-registration').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const company = document.getElementById('company').value;
    const country = document.getElementById('country').value;
    const sector = document.getElementById('sector').value;
    console.log({ full_name:name, email, phone, organization:company, sector, country });
    
    // Show loading indicator
    const submitButton = this.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.innerHTML = '<span class="loading-spinner"></span> Processing...';
    
    
    try {
        // Make API call
        const res = await fetch('https://arm.yamltech.com/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ full_name:name, email, phone, organization:company })
        });
        
        const data = await res.json();
        console.log(res, data);
        
        // Show success message
        alert('Thank you for registering! We\'ll send you a confirmation email shortly.');
        
        // Reset form
        this.reset();
    } catch (error) {
        console.error('Error submitting form:', error);
        alert('There was an error processing your registration. Please try again later.');
    } finally {
        // Hide loading indicator and restore button
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText;
    }
});