import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Imagem } from './imagem.model';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css'],
  animations: [
    trigger('banner', [
      state('hidden', style({
        opacity: 0
      })),
      state('visible', style({
        opacity: 1
      })),
      transition('hidden <=> visible', animate('1s ease-in'))
    ])
  ]
})
export class BannerComponent implements OnInit {

  public imagens: Imagem[] = [
    { state: 'visible', url: '/assets/banner-acesso/img_1.png' },
    { state: 'visible', url: '/assets/banner-acesso/img_2.png' },
    { state: 'visible', url: '/assets/banner-acesso/img_3.png' },
    { state: 'visible', url: '/assets/banner-acesso/img_4.png' },
    { state: 'visible', url: '/assets/banner-acesso/img_5.png' }
  ];

  constructor() { }

  ngOnInit(): void {
    this.animateBanner(4);
  }
  
  animateBanner(index: number): void {
    setTimeout(() => {
      this.imagens[index].state = 'hidden';
      index--;
      if(index < 0) {
        this.imagens.forEach(img => {
          img.state = 'visible';
        })
        index = 4;
      }
      this.animateBanner(index);
    }, 4000);
  }

}
