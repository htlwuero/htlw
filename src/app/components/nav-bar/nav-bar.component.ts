import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  @Input()
  header = '';

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  buttonClicked() : void {
    console.log('buttonClicked');
  }

  navigateToHome() {
    this.router.navigate(['']);
  }

}
