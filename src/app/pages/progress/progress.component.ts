import { Component, OnInit } from '@angular/core';
// import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styles: []
})
export class ProgressComponent implements OnInit {

  public porcentaje1: number = 70;
  public porcentaje2: number = 30;

  constructor() { }

  ngOnInit() {
  }

}
