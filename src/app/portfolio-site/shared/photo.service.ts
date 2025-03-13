import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  getData() {
    return [
        {
            itemImageSrc: 'assets/fo01.png',
            thumbnailImageSrc: 'assets/fo01.png',
            alt: 'Description for Image 1',
            title: 'Title 1'
        },
        {
            itemImageSrc: 'assets/ft02.png',
            thumbnailImageSrc: 'assets/ft02.png',
            alt: 'Description for Image 2',
            title: 'Title 2'
        },
        {
            itemImageSrc: 'assets/ft03.png',
            thumbnailImageSrc: 'assets/ft03.png',
            alt: 'Description for Image 3',
            title: 'Title 3'
        },
        {
            itemImageSrc: 'assets/ft04.png',
            thumbnailImageSrc: 'assets/ft04.png',
            alt: 'Description for Image 4',
            title: 'Title 4'
        },
        {
            itemImageSrc: 'assets/ft05.png',
            thumbnailImageSrc: 'assets/ft05.png',
            alt: 'Description for Image 5',
            title: 'Title 5'
        },
        {
            itemImageSrc: 'assets/ft06.png',
            thumbnailImageSrc: 'assets/ft06.png',
            alt: 'Description for Image 6',
            title: 'Title 6'
        },
        {
            itemImageSrc: 'assets/ft07.png',
            thumbnailImageSrc: 'assets/ft07.png',
            alt: 'Description for Image 7',
            title: 'Title 7'
        },
        {
            itemImageSrc: 'assets/ft08.png',
            thumbnailImageSrc: 'assets/ft08.png',
            alt: 'Description for Image 8',
            title: 'Title 8'
        },
        {
            itemImageSrc: 'assets/ft09.png',
            thumbnailImageSrc: 'assets/ft09.png',
            alt: 'Description for Image 9',
            title: 'Title 9'
        },
        {
            itemImageSrc: 'assets/ft10.png',
            thumbnailImageSrc: 'assets/ft10.png',
            alt: 'Description for Image 10',
            title: 'Title 10'
        }
    ];
}

getImages() {
    return Promise.resolve(this.getData());
}

}
