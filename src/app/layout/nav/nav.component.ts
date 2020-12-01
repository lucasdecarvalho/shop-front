import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  public items: Array<string>;

  constructor(private breakpointObserver: BreakpointObserver) {
    this.items = ["item1", "item2", "item3"];
  }

    alerta(event, item) {
      alert("Mensagem de teste. Item: " + item);
    }
  


}
