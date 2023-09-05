import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EnginesService } from '../engines.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {
  addEngineForm: FormGroup;

  constructor(private engineService: EnginesService) {
    this.addEngineForm = new FormGroup({
      horse_power: new FormControl(null, Validators.required),
      engine_capacity: new FormControl(null, Validators.required),
      number_of_cylinders: new FormControl(null, Validators.required)
    });
  }

  ngOnInit() {}

  onAddEngine() {
    this.engineService
      .addEngine(
        this.addEngineForm.get('horse_power')?.value,
        this.addEngineForm.get('engine_capacity')?.value,
        this.addEngineForm.get('number_of_cylinders')?.value
      )
      .subscribe((res) => {
        console.log(res);
      });
    this.resetForm();
  }

  resetForm() {
    this.addEngineForm = new FormGroup({
      horse_power: new FormControl(null, Validators.required),
      engine_capacity: new FormControl(null, Validators.required),
      number_of_cylinders: new FormControl(null, Validators.required)
    });
  }

}
