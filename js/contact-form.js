// Contact Form Handler for SMTP2GO
class ContactForm {
    constructor() {
        this.form = document.getElementById('contact-form');
        this.messageDiv = document.getElementById('form-message');
        this.submitButton = null;
        this.originalButtonText = '';
        this.isSubmitting = false;
        
        this.init();
    }

    init() {
        if (this.form) {
            this.submitButton = this.form.querySelector('button[type="submit"]');
            if (this.submitButton) {
                this.originalButtonText = this.submitButton.textContent;
            }
            this.form.addEventListener('submit', this.handleSubmit.bind(this));
        }
    }

    async handleSubmit(event) {
        event.preventDefault();
        
        // Prevent multiple submissions
        if (this.isSubmitting) {
            console.log('Form already submitting, ignoring duplicate submission');
            return;
        }
        
        this.isSubmitting = true;
        
        // Get form data
        const formData = new FormData(this.form);
        const data = {
            name: (formData.get('name') || '').trim(),
            email: (formData.get('email') || '').trim(),
            phone: (formData.get('phone') || '').trim(),
            message: (formData.get('message') || '').trim()
        };

        // Debug: Log form data
        console.log('Form data collected:', data);

        // Validate form
        if (!this.validateForm(data)) {
            this.isSubmitting = false;
            return;
        }

        // Show loading state
        this.setLoadingState(true);
        this.showMessage('Odosielam správu...', 'loading');

        try {
            console.log('Sending form data to function:', data);
            const response = await fetch('/.netlify/functions/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            console.log('Response status:', response.status);
            const result = await response.json();
            console.log('Response data:', result);

            if (response.ok && result.success) {
                this.showMessage(result.message || 'Správa bola úspešne odoslaná!', 'success');
                this.form.reset();
                
                // Auto-hide success message after 5 seconds
                setTimeout(() => {
                    this.hideMessage();
                }, 5000);
            } else {
                console.error('Server error response:', result);
                this.showMessage(result.error || 'Vyskytla sa chyba pri odosielaní správy.', 'error');
            }

        } catch (error) {
            console.error('Form submission error:', error);
            this.showMessage('Vyskytla sa chyba. Skúste to prosím neskôr.', 'error');
        } finally {
            this.setLoadingState(false);
            this.isSubmitting = false;
        }
    }

    validateForm(data) {
        const errors = [];

        console.log('Validating form data:', data);

        // Name validation
        if (!data.name || data.name.length < 2) {
            errors.push('Meno musí mať aspoň 2 znaky');
            console.log('Name validation failed:', data.name, 'Length:', data.name ? data.name.length : 0);
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!data.email) {
            errors.push('Email je povinný');
        } else if (!emailRegex.test(data.email)) {
            errors.push('Neplatný formát emailu');
        }

        // Message validation
        if (!data.message) {
            errors.push('Správa je povinná');
        }

        // Phone validation (optional, but if provided should be valid)
        if (data.phone && data.phone.length > 0) {
            const phoneRegex = /^[\+]?[0-9\s\-\(\)]{9,}$/;
            if (!phoneRegex.test(data.phone)) {
                errors.push('Neplatný formát telefónneho čísla');
            }
        }

        if (errors.length > 0) {
            console.log('Validation errors:', errors);
            this.showMessage(errors.join('<br>'), 'error');
            return false;
        }

        console.log('Form validation passed');
        return true;
    }

    setLoadingState(loading) {
        if (this.submitButton) {
            if (loading) {
                this.submitButton.disabled = true;
                this.submitButton.innerHTML = '<span class="spinner"></span> Odosielam...';
                this.submitButton.style.opacity = '0.7';
            } else {
                this.submitButton.disabled = false;
                this.submitButton.textContent = this.originalButtonText;
                this.submitButton.style.opacity = '1';
            }
        }

        // Disable all form inputs during loading
        const inputs = this.form.querySelectorAll('input, textarea, button');
        inputs.forEach(input => {
            input.disabled = loading;
        });
    }

    showMessage(message, type) {
        if (!this.messageDiv) {
            // Create message div if it doesn't exist
            this.messageDiv = document.createElement('div');
            this.messageDiv.id = 'form-message';
            this.form.parentNode.insertBefore(this.messageDiv, this.form.nextSibling);
        }

        this.messageDiv.innerHTML = message;
        this.messageDiv.className = `form-message form-message--${type}`;
        this.messageDiv.style.display = 'block';

        // Scroll to message
        this.messageDiv.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
        });

        // Auto-hide error messages after 8 seconds
        if (type === 'error') {
            setTimeout(() => {
                this.hideMessage();
            }, 8000);
        }
    }

    hideMessage() {
        if (this.messageDiv) {
            this.messageDiv.style.display = 'none';
            this.messageDiv.className = 'form-message';
            this.messageDiv.innerHTML = '';
        }
    }
}

// Initialize contact form - ensure single instance
(function() {
    let contactFormInitialized = false;
    
    function initContactForm() {
        if (contactFormInitialized) return;
        contactFormInitialized = true;
        new ContactForm();
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initContactForm);
    } else {
        initContactForm();
    }
})();