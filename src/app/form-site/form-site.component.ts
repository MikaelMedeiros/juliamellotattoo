import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';

@Component({
  selector: 'app-form-site',
  imports: [CommonModule, FormsModule, InputTextModule, InputNumberModule],
  templateUrl: './form-site.component.html',
  styleUrl: './form-site.component.css'
})
export class FormSiteComponent {

  @ViewChild('inputField') inputField!: ElementRef;
  @ViewChild('confirmButton') confirmButton!: ElementRef; 

  questions = [
    { text: 'Qual é o seu nome?', type: 'text', placeholder: 'Digite seu nome...', maxLength: '50' },    
    { text: 'agora me conte um pouco sobre sua ideia de tatuagem', type: 'text', placeholder: 'Digite sua ideia de tattoo...', maxLength: '100' },
    { text: 'beleza, com quantos centímetros?', type: 'number', placeholder: 'Digite o tamanho em cm...', maxLength: '2' },
    { text: 'e essa tattoo seria em qual parte do corpo?', type: 'text', placeholder: 'Digite o local do corpo que será tatuado...', maxLength: '50' }    
  ];

  messages: { text: string, type: 'question' | 'answer' | 'loading' }[] = [];
  currentQuestionIndex = 0;
  currentAnswer:any;
  isTyping = false;

  constructor(private el: ElementRef) {
    this.askNextQuestion();
  }

  scrollIntoView() {
    this.el.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setTimeout(() => this.setFocusOnInput(), 100);
  }

  get inputType(): string {
    if (this.currentQuestionIndex < this.questions.length) {
      return this.questions[this.currentQuestionIndex].type;
    }
    return 'text'
  }

  askNextQuestion() {
    if (this.currentQuestionIndex < this.questions.length) {      
      this.messages.push({ text: 'Digitando...', type: 'loading' });
      this.isTyping = true;
      const questionText = this.questions[this.currentQuestionIndex].text;
      const calculatedTimeout = Math.min(Math.max(questionText.length * 25, 1500), 4000);

      setTimeout(() => {        
        this.messages.pop();
        this.messages.push({ text: this.questions[this.currentQuestionIndex].text, type: 'question' });       
        this.isTyping = false;
        if (this.currentQuestionIndex > 0) {
          this.setFocusOnInput();
        }
      }, calculatedTimeout);    
    }
  }

  nextQuestion() {
    if (!this.isTyping && this.verifyEmptyInput()) {
      this.setCmOnTextAnswer();
      this.messages.push({ text: this.currentAnswer, type: 'answer' });
      this.currentAnswer = '';      
      
      setTimeout(() => {
        this.currentQuestionIndex++;
        if (this.currentQuestionIndex < this.questions.length) {
          this.askNextQuestion();
        } else {
          this.setFocusOnConfirmButton();
        }
      }, 100);
    }
  }

  private setCmOnTextAnswer(): void {
    if (this.currentAnswer && this.questions[this.currentQuestionIndex].type === 'number') {
      this.currentAnswer = `Tattoo de ${this.currentAnswer}cm`;
    }
  }

  private verifyEmptyInput(): boolean {
    return this.currentAnswer !== null && this.currentAnswer !== undefined && this.currentAnswer !== ''
  }

  checkAutoNext() {
    if (this.inputType === 'tel' && this.currentAnswer.replace(/\D/g, '').length === 11) {
      this.nextQuestion();
    }
  }

  handleBlur() {    
    if (this.currentAnswer !== null && this.currentAnswer !== '') {
      this.nextQuestion();
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
    return ` Por último, confira se é isso mesmo e depois pode clicar no botão para enviar pro meu wpp\n${this.getFormattedResponses()}`; 
  }

  getFormattedResponses(): string {
    return this.messages
      .filter(message => message.type === 'answer')
      .map(message => '• ' + message.text)
      .join('\t\n');
  }

  sendWppMessage() {
    window.open(this.getWhatsAppLink(), '_blank')    
  }

  getWhatsAppLink(): string {
    const phoneNumber = '+5561991425954';
    const message = `Oi, Jú. Tudo bem? Eu gostaria de um orçamento, seguem meus dados \n ${this.getFormattedResponses()}`;
    return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  }
}
