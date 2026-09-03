import {
  Component,
  ElementRef,
  inject,
  Input,
  OnInit,
  ViewChild
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';

import {
  UPLOAD_CONFIG,
  UploadSection
} from './model/image-upload.config';

import { ImageService } from './image.service';
import { ImageUploadResponse } from './model/image-upload.response';
import { SkeletonModule } from 'primeng/skeleton';


@Component({
  selector: 'app-image-upload',
  standalone: true,

  imports: [
    CommonModule,
    ButtonModule,
    SkeletonModule
  ],

  templateUrl: './image-upload.component.html',

  styleUrl: './image-upload.component.css'
})
export class ImageUploadComponent implements OnInit {

  private readonly imageService = inject(ImageService);

  private readonly messageService = inject(MessageService);

  isLoading = true;

  @ViewChild('fileInput')
  fileInput!: ElementRef<HTMLInputElement>;


  @Input({ required: true })
  section!: UploadSection;


  /**
   * Imagens atualmente exibidas na galeria.
   */
  uploadedFiles: ImageUploadResponse[] = [];


  /**
   * Imagens carregadas inicialmente.
   *
   * Essa propriedade pode ser preenchida pelo carregamento
   * inicial da sua API.
   */
  initialImages: ImageUploadResponse[] = [];


  /**
   * URL do site que será aberto pelo botão
   * "Ver no site".
   */
  siteUrl = 'https://juliamellotattoo.com.br';


  /**
   * Indica se existe algum upload em andamento.
   */
  isUploading = false;


  /**
   * Índice da imagem que será substituída.
   *
   * null significa que o próximo arquivo será
   * tratado como uma nova imagem.
   */
  private replacingIndex: number | null = null;


  /**
   * Configuração da seção atual.
   */
  get config() {
    return UPLOAD_CONFIG[this.section];
  }


  ngOnInit(): void {

    /**
     * As imagens iniciais podem ser carregadas
     * pelo ImageService antes deste componente,
     * ou atribuídas aqui quando sua API de consulta
     * estiver implementada.
     *
     * Mantemos uma cópia para evitar alterar
     * diretamente a referência original.
     */
    this.imageService.getImages(this.section).subscribe(images => {
      this.initialImages = images;
      this.uploadedFiles = [...this.initialImages];
    });   

  }


  /**
   * Abre o seletor de arquivos para adicionar
   * uma nova imagem.
   */
  openAddDialog(): void {

    if (this.isUploading) {
      return;
    }

    this.replacingIndex = null;

    this.resetFileInput();

    this.fileInput.nativeElement.click();

  }

  isAnimating = false;
  animatingImageId: string | null = null;
  animatingAction: 'delete' | 'replace' | null = null;

  isAnimatingImage(
    imageId: string,
    action: 'delete' | 'replace'
  ): boolean {
    return (
      this.animatingImageId === imageId &&
      this.animatingAction === action
    );
  }

  /**
   * Abre o seletor de arquivos para substituir
   * uma imagem existente.
   */
  openReplaceDialog(index: number): void {

    if (this.isUploading || this.isAnimating) {
      return;
    }

    const image = this.uploadedFiles[index];

    if (!image) {
      return;
    }

    this.animatingImageId = image.id;
    this.animatingAction = 'replace';
    this.isAnimating = true;

    this.replacingIndex = index;

    this.resetFileInput();

    this.fileInput.nativeElement.click();
  }


  /**
   * Reseta o input para permitir selecionar
   * novamente o mesmo arquivo.
   */
  private resetFileInput(): void {

    if (!this.fileInput) {
      return;
    }

    this.fileInput.nativeElement.value = '';

  }


    /**
   * Evento do input nativo de arquivos.
   *
   * O mesmo input é utilizado tanto para:
   *
   * - Adicionar
   * - Trocar
   */
  onFileSelected(event: Event): void {

    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) {
      this.clearAnimation();
      return;
    }

    const file = input.files[0];

    if (!this.validateImageType(file)) {
      input.value = '';
      this.clearAnimation();
      return;
    }

    if (this.replacingIndex !== null) {

      const index = this.replacingIndex;

      this.replacingIndex = null;

      this.replaceImage(
        index,
        file
      );

      return;
    }

    this.onUpload([file]);
  }


  
  private validateImageType(file: File): boolean {
    const allowedTypes = [
      'image/jpeg',
      'image/png',
      'image/webp',
      'image/heic',
      'image/heif'
    ];

    const allowedExtensions = [
      '.jpg',
      '.jpeg',
      '.png',
      '.webp',
      '.heic',
      '.heif'
    ];

    const extension = file.name
      .substring(file.name.lastIndexOf('.'))
      .toLowerCase();

    const isValid =
      allowedTypes.includes(file.type) ||
      allowedExtensions.includes(extension);

    if (!isValid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Formato inválido',
        detail: 'Apenas imagens JPG, PNG, WebP ou HEIC são permitidas.'
      });

      return false;
    }

    return true;
  }



  /**
   * Faz upload de novas imagens.
   */
  public onUpload(files: File[]): void {

    if (!files.length) {
      return;
    }


    /**
     * Respeita o limite configurado.
     *
     * Para configurações como banner,
     * maxFiles provavelmente será 1.
     */
    const availableSlots =
      this.config.maxFiles -
      this.uploadedFiles.length;


    if (availableSlots <= 0) {

      this.messageService.add({
        severity: 'warn',
        summary: 'Limite atingido',
        detail: `Você pode adicionar no máximo ${this.config.maxFiles} imagem(ns).`
      });

      return;
    }


    const filesToUpload =
      files.slice(
        0,
        availableSlots
      );


    this.isUploading = true;


    let completed = 0;

    const positions = this.getAvailablePositions( filesToUpload.length );


    filesToUpload.forEach( (file, index) => {

      const position = positions[index];

      this.imageService
        .upload(
          file,
          this.section,
          position
        )
        .subscribe({

          next: image => {
            if (!image.url) {
              image.url =
                URL.createObjectURL(file);
            }

            this.uploadedFiles.push(image);
            this.handlerMaxFiles();

            completed++;

            if (
              completed ===
              filesToUpload.length
            ) {
              this.isUploading = false;
            }      

            this.messageService.add({
              severity: 'success',
              summary: 'Sucesso',
              detail: 'Imagem enviada com sucesso!'
            });

          },

          error: error => {
            completed++;

            if (
              completed ===
              filesToUpload.length
            ) {
              this.isUploading = false;
            }

            console.error(
              'Erro ao enviar imagem:',
              error
            );

            this.messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail: 'Erro ao enviar imagem!'
            });

          }
        });

      }
    );

  }


  /**
   * Substitui uma imagem existente.
   *
   * Neste fluxo o novo arquivo é enviado normalmente
   * e, após o upload, substituímos a referência visual
   * da imagem no mesmo índice.
   */
  private replaceImage(
    index: number,
    file: File
  ): void {

    const currentImage =
      this.uploadedFiles[index];
    const position = index + 1;

    if (!currentImage) {
      return;
    }

    this.isUploading = true;

    this.imageService
      .upload(        
        file,
        this.section,
        position
      )
      .subscribe({

        next: image => {

          if (currentImage.url) {
            URL.revokeObjectURL(currentImage.url);
          }

          if (!image.url) {
            image.url = URL.createObjectURL(file);
          }

          this.uploadedFiles =
            this.uploadedFiles.map(
              (item, itemIndex) =>
                itemIndex === index
                  ? image
                  : item
            );

          this.isUploading = false;

          this.clearAnimation();

          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'Imagem substituída com sucesso!'
          });

        },

        error: error => {
          this.isUploading = false;
          this.clearAnimation();

          console.error(
            'Erro ao substituir imagem:',
            error
          );

          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Erro ao substituir imagem!'
          });
        }

      });

  }

  private clearAnimation(): void {
    this.animatingImageId = null;
    this.animatingAction = null;
    this.isAnimating = false;
  }


  /**
   * Garante que o número máximo de arquivos
   * configurado não seja ultrapassado.
   */
  handlerMaxFiles(): void {

    while (
      this.uploadedFiles.length >
      this.config.maxFiles
    ) {

      const removed =
        this.uploadedFiles.shift();


      if (removed?.url) {

        URL.revokeObjectURL(
          removed.url
        );

      }

    }

  }


  /**
   * Remove uma imagem da lista visual.
   *
   * Mantive a mesma semântica do seu TS original:
   * a remoção da referência no storage/backend
   * deve ser adicionada aqui quando o ImageService
   * possuir o método correspondente.
   */
  removeImage(index: number): void {

    if (this.isUploading || this.isAnimating) {
      return;
    }

    const image = this.uploadedFiles[index];
    const position = image.position;

    if (!image) {
      return;
    }

    this.animatingImageId = image.id;
    this.animatingAction = 'delete';
    this.isAnimating = true;

    this.imageService
      .removeImage(this.section, position)
      .subscribe({

        next: () => {

          if (image.url) {
            URL.revokeObjectURL(image.url);
          }

          this.uploadedFiles =
            this.uploadedFiles.filter(
              item => item.id !== image.id
            );

          this.clearAnimation();

          this.messageService.add({
            severity: 'success',
            summary: 'Imagem removida',
            detail: 'Imagem removida da seção.'
          });
        },

        error: error => {

          this.clearAnimation();

          console.error(
            'Erro ao remover imagem:',
            error
          );

          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Erro ao remover imagem!'
          });
        }

      });
  }

  private getAvailablePositions(quantity: number): number[] {
    const usedPositions = new Set(
      this.uploadedFiles.map(image => image.position)
    );

    const positions: number[] = [];

    let position = 1;

    while (positions.length < quantity) {

      if (!usedPositions.has(position)) {
        positions.push(position);
        usedPositions.add(position);
      }

      position++;
    }

    return positions;
  }

  /**
   * Abre o site em uma nova aba.
   */
  openSite(): void {
    if (!this.siteUrl) {
      return;
    }

    window.open(
      this.siteUrl,
      '_blank',
      'noopener,noreferrer'
    );
  }

}