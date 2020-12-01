import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-newsletter',
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.scss']
})
export class NewsletterComponent implements OnInit {

  @Input() recebeFamilia: string;

  constructor() { }

  ngOnInit() {
    console.log(this.recebeFamilia);
  }

}
