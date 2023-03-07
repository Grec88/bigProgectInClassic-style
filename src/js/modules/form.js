 import {postData} from '../services/requests';

export const form = () => {
    const forms = document.querySelectorAll('form');
    const inputs = document.querySelectorAll('input');
    const uploads = document.querySelectorAll('[name="upload"');

    // checkNumInputs('input[name="user_phone"]');

    const message = {
        loading: 'Загрузка',
        success: 'Спасибо! Мы скоро свяжимся с вами.',
        failure: 'Что-то пошло не так...',
        spinner: 'assets/img/spinner.gif',
        ok: 'assets/img/ok.png',
        fail: 'assets/img/fail.png',
    };

    const path = {
        designer: 'assets/server.php',
        question: 'assets/question.php'
    }

    const clearInputs = () => {
        inputs.forEach(input => {
            input.value = "";
        });
        uploads.forEach(upload => {
            upload.previousElementSibling.textContent = "Файл не выбран";
        })
    }

    uploads.forEach(upload => {
        upload.addEventListener('input', (e) => {
            const file = e.target.files[0];
            const [fileName, fileExt] = file.name.split('.');
            const dots = fileName.length > 6 ? '...' : '.';
            const name = `${fileName.substring(0, 6)} ${dots} ${fileExt}`;
            upload.previousElementSibling.textContent = name;
        })
    })

    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            form.parentNode.appendChild(statusMessage);

            form.classList.add('animated', 'fadeOutUp');
            setTimeout(() => {
                form.style.display = 'none';
            }, 400);

            const statusImg = document.createElement('img');

            statusImg.setAttribute('src', message.spinner);
            statusImg.classList.add('animated', 'fadeInUp');
            statusMessage.appendChild(statusImg);

            const textMessage = document.createElement('div');
            textMessage.textContent = message.loading;
            statusMessage.appendChild(textMessage);

            const formData = new FormData(form);
            const api = form.closest('.popup-design')
                || form.classList.contains('calc_form')
                ? path.designer : path.question;


            postData(api, formData)
                .then(res => {
                    statusImg.setAttribute('src', message.ok);
                    textMessage.textContent = message.success;
                })
                .catch(() => {
                    statusImg.setAttribute('src', message.fail);
                    textMessage.textContent = message.failure;
                })
                .finally(() => {
                    clearInputs();
                    setTimeout(() => {
                        console.log(1);
                        statusMessage.remove();
                        form.style.display = 'block';
                        form.classList.remove('fadeOutUp');
                        form.classList.add('fadeInUp');

                    }, 5000);
                });
        })
    })
};