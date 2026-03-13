(function() {
    'use strict';

    const forms = document.querySelectorAll('.ajax-form');
    
    if (forms.length === 0) return;

    function generateCSRFToken() {
        return Math.random().toString(36).substring(2) + Date.now().toString(36);
    }

    function updateCSRFToken(form) {
        let tokenInput = form.querySelector('input[name="csrf_token"]');
        if (!tokenInput) {
            tokenInput = document.createElement('input');
            tokenInput.type = 'hidden';
            tokenInput.name = 'csrf_token';
            form.appendChild(tokenInput);
        }
        tokenInput.value = generateCSRFToken();
    }

    function addHoneypotField(form) {
        let honeypot = form.querySelector('input[name="website_url"]');
        if (!honeypot) {
            honeypot = document.createElement('input');
            honeypot.type = 'text';
            honeypot.name = 'website_url';
            honeypot.style.display = 'none';
            honeypot.tabIndex = -1;
            honeypot.autocomplete = 'off';
            form.appendChild(honeypot);
        }
    }

    forms.forEach(function(form) {
        updateCSRFToken(form);
        addHoneypotField(form);
    });

    function showMessage(form, message, isError) {
        const formBlock = form.closest('.w-form');
        if (!formBlock) return;

        let messageWrapper;
        
        if (isError) {
            messageWrapper = formBlock.querySelector('.w-form-fail');
            if (messageWrapper) {
                const errorText = messageWrapper.querySelector('.error-text');
                if (errorText) {
                    errorText.innerHTML = message;
                }
                messageWrapper.style.display = 'block';
            }
        } else {
            messageWrapper = formBlock.querySelector('.w-form-done');
            if (messageWrapper) {
                messageWrapper.style.display = 'block';
            }
        }

        if (isError) {
            setTimeout(() => {
                if (messageWrapper) messageWrapper.style.display = 'none';
            }, 5000);
        }
    }

    function hideMessages(form) {
        const formBlock = form.closest('.w-form');
        if (!formBlock) return;

        const doneWrapper = formBlock.querySelector('.w-form-done');
        const failWrapper = formBlock.querySelector('.w-form-fail');
        
        if (doneWrapper) doneWrapper.style.display = 'none';
        if (failWrapper) failWrapper.style.display = 'none';
    }

    function getCheckboxValue(checkboxContainer) {
        if (!checkboxContainer) return false;
        
        const hiddenInput = checkboxContainer.querySelector('input[type="checkbox"]');
        if (hiddenInput) {
            return hiddenInput.checked;
        }
        
        return false;
    }

    forms.forEach(function(form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            hideMessages(form);

            const formData = new FormData(form);
            
            const cguContainer = form.querySelector('.form_checkbox');
            if (cguContainer) {
                const checkboxInput = cguContainer.querySelector('input[type="checkbox"]');
                if (checkboxInput) {
                    const checkboxName = checkboxInput.name;
                    formData.set(checkboxName, getCheckboxValue(cguContainer) ? 'on' : '');
                }
            }

            formData.append('form_source', form.dataset.formSource || 'inconnu');

            const submitBtn = form.querySelector('input[type="submit"], button[type="submit"]');
            const originalBtnText = submitBtn ? submitBtn.value : 'Envoyer';
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.value = 'Envoi en cours...';
            }

            try {
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: formData
                });

                const data = await response.json();

                if (data.success) {
                    showMessage(form, data.message, false);
                    form.reset();
                    forms.forEach(updateCSRFToken);
                } else {
                    if (data.errors) {
                        let errorMessages = [];
                        for (const [field, message] of Object.entries(data.errors)) {
                            errorMessages.push(message);
                        }
                        showMessage(form, errorMessages.join('<br>'), true);
                    } else if (data.errors && data.errors.general) {
                        showMessage(form, data.errors.general, true);
                    } else {
                        showMessage(form, 'Une erreur est survenue. Veuillez réessayer.', true);
                    }
                }
            } catch (error) {
                showMessage(form, 'Une erreur de connexion est survenue. Veuillez réessayer.', true);
            } finally {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.value = originalBtnText;
                }
            }
        });
    });
})();
