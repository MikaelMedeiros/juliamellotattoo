import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';

@Component({
  selector: 'app-form-site',
  imports: [CommonModule, FormsModule, InputTextModule, InputMaskModule],
  templateUrl: './form-site.component.html',
  styleUrl: './form-site.component.css'
})
export class FormSiteComponent {

  @ViewChild('inputField') inputField!: ElementRef;
  @ViewChild('confirmButton') confirmButton!: ElementRef; 

  questions = [
    { text: 'Qual é o seu nome?', type: 'text', placeholder: 'Digite seu nome...', maxLength: '50' },
    { text: 'e telefone?', type: 'tel', placeholder: '(XX) XXXXX-XXXX' }
  ];

  messages: { text: string, type: 'question' | 'answer' }[] = [];
  currentQuestionIndex = 0;
  currentAnswer = '';

  constructor(private el: ElementRef) {
    this.askNextQuestion();
  }

  scrollIntoView() {
    this.el.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setTimeout(() => this.setFocusOnInput(), 100);
  }

  get inputType(): string {
    return this.currentQuestionIndex < this.questions.length && this.questions[this.currentQuestionIndex].type === 'tel' 
      ? 'tel' 
      : 'text';
  }

  askNextQuestion() {
    if (this.currentQuestionIndex < this.questions.length) {
      this.messages.push({ text: this.questions[this.currentQuestionIndex].text, type: 'question' });      
    }    
  }

  nextQuestion() {
    if (this.currentAnswer.trim() !== '') {
      this.messages.push({ text: this.currentAnswer, type: 'answer' });
      this.currentAnswer = '';
      this.currentQuestionIndex++;
      
      setTimeout(() => {
        if (this.currentQuestionIndex < this.questions.length) {
          this.askNextQuestion();
        } else {
          this.setFocusOnConfirmButton();
        }
      }, 500);
    }
  }

  setFocusOnInput() {
    if (this.inputField) {
      this.inputField.nativeElement.focus();
    }
  }

  setFocusOnConfirmButton() {
    if (this.confirmButton) {
      this.confirmButton.nativeElement.focus();
    }
  }

  sendLastMessage(): string {
    return ` Por último, confira se é isso mesmo e depois pode clicar no botão para enviar pro meu wpp \n
    ${
      this.getFormattedResponses()
    }`; 
  }

  getFormattedResponses(): string {
    return this.messages
      .filter(message => message.type === 'answer')
      .map(message => message.text)
      .join('\n'); // Junta as respostas, cada uma em uma linha;  
  }

  sendWppMessage() {
    window.open(this.getWhatsAppLink(), '_blank')    
  }

  getWhatsAppLink(): string {
    const phoneNumber = '+5561991885361'; // Substitua pelo seu número com código do país
    const message = `Oi, Jú. Tudo bem? Eu gostaria de um orçamento, seguem meus dados \n${encodeURIComponent(this.getFormattedResponses())}`;
    return `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
  }
}
