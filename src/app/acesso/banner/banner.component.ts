import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

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

  public stateOfImage: string = 'visible';

  constructor() { }

  ngOnInit(): void {
  }

  public toggleState(): void {
    this.stateOfImage = this.stateOfImage === 'hidden' ? 'visible' : 'hidden';
  }

}
