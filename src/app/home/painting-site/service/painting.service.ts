import { Injectable } from '@angular/core';
import { Painting } from '../model/Painting';

@Injectable({
  providedIn: 'root'
})
export class PaintingService {

  constructor() { }

    getData() {

      const paintings: Painting[] = [
          {
              id: '1000',
              code: 'PNT-0001',
              name: 'Energia',
              description: 'A beautiful painting by Júlia Mello.',
              image: 'assets/paintings/energia.png',
              price: 45,
              category: 'Impressionism',
              quantity: 10,
              inventoryStatus: 'INSTOCK',
              size: '15x10'
          },
          {
              id: '1001',
              code: 'PNT-0002',
              name: 'Entardecer',
              description: 'A masterpiece by Júlia Mello.',
              image: 'assets/paintings/entardecer.png',
              price: 27,
              category: 'Impressionism',
              quantity: 5,
              inventoryStatus: 'INSTOCK',
              size: '5x10'
          },
          {
              id: '1002',
              code: 'PNT-0003',
              name: 'Nuvens de pensamento',
              description: 'An iconic painting by Júlia Mello.',
              image: 'assets/paintings/nuvensdepensamento.png',
              price: 45,
              category: 'Impressionism',
              quantity: 0,
              inventoryStatus: 'INSTOCK',
              size: '15x10'
          },
          {
            id: '1003',
            code: 'PNT-0004',
            name: 'Textura e mar',
            description: 'A beautiful painting by Júlia Mello.',
            image: 'assets/paintings/txturaemmar.png',
            price: 57,
            category: 'Impressionism',
            quantity: 8,
            inventoryStatus: 'INSTOCK',
            size: '15x15'
          },
          {
            id: '1004',
            code: 'PNT-0005',
            name: 'Por do sol no mar',
            description: 'A beautiful painting by Júlia Mello.',
            image: 'assets/paintings/pordosolnomar.png',
            price: 27,
            category: 'Impressionism',
            quantity: 8,
            inventoryStatus: 'INSTOCK',
            size: '5x10'
          }
      ];

      return paintings;
    }

    getPaintingSmall() {      
        return Promise.resolve(this.getData());
    } 

}
