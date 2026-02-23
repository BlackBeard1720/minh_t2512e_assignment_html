const form = document.forms['login-form'];
const fullName = document.forms['login-form'].elements['fullName'];
const email = document.forms['login-form'].elements['email'];
const phone = document.forms['login-form'].elements['phone'];
const gender = document.forms['login-form'].elements['gender'];
const hobby = document.forms['login-form'].elements['hobby'];
const intro = document.forms['login-form'].elements['intro'];
const result = document.getElementById('result');

function showError(input, message) {
    const errElement = input.nextElementSibling;
    errElement.textContent = message;
    input.classList.add('invalid');
}

function clearError(input) {
    const errElement = input.nextElementSibling;
    errElement.textContent = "";
    input.classList.remove('invalid');
}

function validateName() {
    const nameVal =  fullName.value.trim();
    if(!nameVal) {
        showError(fullName, 'Tên không được để trống');
        return false;
    }
    if(nameVal.length > 50) {
        showError(fullName, 'Tên không được vượt quá 50 ký tự');
        return false;
    }
    clearError(fullName);
    return true;
}

function validateEmail() {
    const emailVal = email.value.trim();
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailVal) {
        showError(email, 'Email không được để trống');
        return false;
    }
    if(!regex.test(emailVal)) {
        showError(email, 'Email không đúng định dạng. VD: example@email.com');
        return false;
    }
    clearError(email);
    return true;
}

function validatePhone() {
    const phoneVal = phone.value.trim();
    const regex = /^(03|05|07|08|09)\d{8}$/;
    if(!phoneVal) {
        showError(phone, 'Số điện thoại không được để trống');
        return false;
    }
    if(!regex.test(phoneVal)) {
        showError(phone, 'Số điện thoại phải gồm 10 chữ số. VD: 032xxx');
        return false;
    }
    clearError(phone);
    return true;
}

function validateGender() {
    const selected = gender.value; 
    const errElement = document.querySelector('.gender .msg-error');
    if(!selected) {
        errElement.textContent = 'Vui lòng chọn giới tính';
        return false;
    }
    errElement.textContent = '';
    return true;
}

function showResult() {
    const hobbies = [];
    for(let item of hobby) {
        if(item.checked) {
            hobbies.push(item.value);
        }
    }
    result.classList.remove('hidden');
    result.innerHTML = `
        <h2>Thông tin đã đăng ký</h2>
        <p>Họ và tên: ${fullName.value}</p>
        <p>Email: ${email.value}</p>
        <p>Phone: ${phone.value}</p>
        <p>Giới tính: ${gender.value}</p>
        <p>Sở thích: ${hobbies.join(', ') || 'Không có'}</p>
        <p>Giới thiệu bản thân: ${intro.value || 'Không có'}</p>
    `;
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;
    if(!validateName()) {
        isValid = false
    }
    if(!validateEmail()) {
        isValid = false;
    }
    if(!validatePhone()) {
        isValid = false;
    }
    if(!validateGender()) {
        isValid = false;
    }
    if(isValid) {
        showResult();
        form.reset();
        form.classList.add('hidden');
    } else {
        result.classList.add('hidden');
        form.classList.remove('hidden');
    }
});

