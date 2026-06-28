import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  getData() {
    return [
         {
            itemImageSrc: 'assets/ft01.png',
            thumbnailImageSrc: 'assets/ft01.png',
            alt: 'Description for Image 1',
            title: 'Title 1'
        },
        {
            itemImageSrc: 'assets/_SITE_juliaTATTOO__ft_01.png',
            thumbnailImageSrc: 'assets/_SITE_juliaTATTOO__ft_01.png',
            alt: 'Description for Image 1',
            title: 'Title 1'
        },
        {
            itemImageSrc: 'assets/_SITE_juliaTATTOO__ft_02.png',
            thumbnailImageSrc: 'assets/_SITE_juliaTATTOO__ft_02.png',
            alt: 'Description for Image 2',
            title: 'Title 2'
        },
        {
            itemImageSrc: 'assets/_SITE_juliaTATTOO__ft_03.png',
            thumbnailImageSrc: 'assets/_SITE_juliaTATTOO__ft_03.png',
            alt: 'Description for Image 3',
            title: 'Title 3'
        },
        {
            itemImageSrc: 'assets/_SITE_juliaTATTOO__ft_04.png',
            thumbnailImageSrc: 'assets/_SITE_juliaTATTOO__ft_04.png',
            alt: 'Description for Image 4',
            title: 'Title 4'
        },
        {
            itemImageSrc: 'assets/_SITE_juliaTATTOO__ft_05.png',
            thumbnailImageSrc: 'assets/_SITE_juliaTATTOO__ft_05.png',
            alt: 'Description for Image 5',
            title: 'Title 5'
        },
        {
            itemImageSrc: 'assets/_SITE_juliaTATTOO__ft_06.png',
            thumbnailImageSrc: 'assets/_SITE_juliaTATTOO__ft_06.png',
            alt: 'Description for Image 6',
            title: 'Title 6'
        },
        {
            itemImageSrc: 'assets/_SITE_juliaTATTOO__ft_07.png',
            thumbnailImageSrc: 'assets/_SITE_juliaTATTOO__ft_07.png',
            alt: 'Description for Image 7',
            title: 'Title 7'
        },
        {
            itemImageSrc: 'assets/_SITE_juliaTATTOO__ft_08.png',
            thumbnailImageSrc: 'assets/_SITE_juliaTATTOO__ft_08.png',
            alt: 'Description for Image 8',
            title: 'Title 8'
        },
        {
            itemImageSrc: 'assets/_SITE_juliaTATTOO__ft_09.png',
            thumbnailImageSrc: 'assets/_SITE_juliaTATTOO__ft_09.png',
            alt: 'Description for Image 9',
            title: 'Title 9'
        },
        {
            itemImageSrc: 'assets/ft03.png',
            thumbnailImageSrc: 'assets/ft03.png',
            alt: 'Description for Image 13',
            title: 'Title 13'
        },
        {
            itemImageSrc: 'assets/ft04.png',
            thumbnailImageSrc: 'assets/ft04.png',
            alt: 'Description for Image 14',
            title: 'Title 14'
        },
        {
            itemImageSrc: 'assets/ft07.png',
            thumbnailImageSrc: 'assets/ft07.png',
            alt: 'Description for Image 17',
            title: 'Title 17'
        },
        {
            itemImageSrc: 'assets/ft08.png',
            thumbnailImageSrc: 'assets/ft08.png',
            alt: 'Description for Image 18',
            title: 'Title 18'
        }
    ];
}

getImages() {
    return Promise.resolve(this.getData());
}

}
