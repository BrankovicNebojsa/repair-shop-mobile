import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModelsService } from '../models.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {
  addModelForm: FormGroup;

  constructor(private modelService: ModelsService) {
    this.addModelForm = new FormGroup({
      brand_name: new FormControl(null, Validators.required),
      model_name: new FormControl(null, Validators.required),
    });
  }

  ngOnInit() {}

  onAddModel() {
    this.modelService
      .addModel(
        this.addModelForm.get('brand_name')?.value,
        this.addModelForm.get('model_name')?.value
      )
      .subscribe((res) => {
        console.log(res);
      });
    this.resetForm();
  }

  resetForm() {
    this.addModelForm = new FormGroup({
      brand_name: new FormControl(null, Validators.required),
      model_name: new FormControl(null, Validators.required),
    });
  }
}
