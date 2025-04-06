import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import emailjs from 'emailjs-com';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'portfolio-ghailene';
  constructor() {}

   // Remplace par tes vrais identifiants EmailJS
   serviceID = 'service_e9fomwm';
   templateID = 'template_6isolrg';
   userID = 'D6k9Efb7uJSUKYTZb';
 
   onSubmit(form: NgForm) {
     if (form.valid) {
       const templateParams = {
         from_name: form.value.name,
         reply_to: form.value.email,
         message: form.value.message
       };
 
       emailjs.send(this.serviceID, this.templateID, templateParams, this.userID)
         .then(() => {
           alert('✉️ Message envoyé avec succès !');
           form.reset();
         })
         .catch((error) => {
           console.error('Erreur lors de l’envoi', error);
           alert('❌ Une erreur est survenue lors de l’envoi du message.');
         });
     }
   }
}