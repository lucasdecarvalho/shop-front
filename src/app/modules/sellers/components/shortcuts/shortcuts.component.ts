import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-shortcuts',
  templateUrl: './shortcuts.component.html',
  styleUrls: ['./shortcuts.component.scss']
})
export class ShortcutsComponent implements OnInit {

  constructor(
    private title: Title,
  ) { 

    this.title.setTitle('Painel de controle');
  }

  ngOnInit(): void {
  }

}
