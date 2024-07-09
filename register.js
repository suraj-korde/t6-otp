document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    let valid = true;
    const fullname = document.getElementById('fullname').value.trim();
    const email = document.getElementById('email').value.trim();
    const mobile = document.getElementById('mobile').value.trim();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const confirmPassword = document.getElementById('confirmPassword').value.trim();
    const message = document.getElementById('message');

    document.getElementById('fullnameError').textContent = '';
    document.getElementById('emailError').textContent = '';
    document.getElementById('mobileError').textContent = '';
    document.getElementById('usernameError').textContent = '';
    document.getElementById('passwordError').textContent = '';
    document.getElementById('confirmPasswordError').textContent = '';

    if (fullname.length < 3) {
        valid = false;
        document.getElementById('fullnameError').textContent = 'Full name must be at least 3 characters.';
    }

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email)) {
        valid = false;
        document.getElementById('emailError').textContent = 'Invalid email format.';
    }

    const mobilePattern =  /^[789]\d{9}$/;
    if (!mobilePattern.test(mobile)) {
        valid = false;
        document.getElementById('mobileError').textContent = 'Mobile number must be 10 digits.';
    }

    const invalidChars1 = /[!~%$*()=;:,.]/;
    if (username.length < 3) {
        valid = false;
        document.getElementById('usernameError').textContent = 'Username must be at least 3 characters.';
    }
    else if (invalidChars1.test(username)) {
        valid = false;
        document.getElementById('usernameError').textContent = "Username should not contain !, ~, %, $, *, (, ), =, :, ;, ., ,";
    }

    const invalidChars = /[!~%$*()=;:,.]/;
    if (password.length <= 6 || password.length >= 15) {
        valid = false;
        document.getElementById('passwordError').textContent = "Password length must be greater than 6 and less than 15.";
    } else if (invalidChars.test(password)) {
        valid = false;
        document.getElementById('passwordError').textContent = "Password should not contain !, ~, %, $, *, (, ), =, :, ;, ., ,";
    }

    if (password !== confirmPassword) {
        valid = false;
        document.getElementById('confirmPasswordError').textContent = 'Passwords do not match.';
    }
    
    if (valid) {
        message.style.color = 'green';
        message.textContent = 'User registered successfully.';
        document.getElementById('registrationForm').reset();
    } else {
        message.style.color = 'red';
        message.textContent = 'Please fix the errors above.';
    }
});

document.getElementById('sendOtpBtn').addEventListener('click', function() {
    const email = document.getElementById('email').value.trim();
    if (email === '') {
        document.getElementById('emailError').textContent = 'Please enter your email to receive OTP.';
        return;
    }
    
    const otp = Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit OTP
    sessionStorage.setItem('otp', otp);

    emailjs.send('service_9rq5vgn', 'template_cc6bzfi', {
        to_email: email,
        otp: otp
    }).then(function(response) {
        document.getElementById('otpGroup').style.display = 'block';
        document.getElementById('emailError').textContent = 'OTP sent successfully!';
    }, function(error) {
        document.getElementById('emailError').textContent = 'Failed to send OTP. Please try again.';
    });
});

document.getElementById('verifyOtpBtn').addEventListener('click', function() {
    const enteredOtp = document.getElementById('otp').value.trim();
    const sessionOtp = sessionStorage.getItem('otp');

    if (enteredOtp === sessionOtp) {
        document.getElementById('otpError').textContent = 'OTP verified successfully!';
        document.getElementById('submitBtn').disabled = false;
    } else {
        document.getElementById('otpError').textContent = 'Invalid OTP. Please try again.';
    }
});
