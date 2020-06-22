import { Component, OnInit } from '@angular/core';
import { trigger, state, style } from '@angular/animations';

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
      }))
    ])
  ]
})
export class BannerComponent implements OnInit {

  public state: string = 'hidden';

  constructor() { }

  ngOnInit(): void {
  }

}
