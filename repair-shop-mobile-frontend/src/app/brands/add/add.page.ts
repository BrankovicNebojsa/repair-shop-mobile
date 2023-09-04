import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BrandsService } from '../brands.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {
  addBrandForm: FormGroup;

  constructor(private brandsService: BrandsService) {
    this.addBrandForm = new FormGroup({
      name: new FormControl(null, Validators.required),
    });
  }

  ngOnInit() {}

  onAddBrand() {
    console.log(this.addBrandForm.get('name')?.value);
    this.brandsService.addBrand(this.addBrandForm.get('name')?.value).subscribe((res) => {
      console.log(res);
    });
    this.resetForm();
  }

  resetForm() {
    this.addBrandForm = new FormGroup({
      name: new FormControl(null, Validators.required),
    });
  }
}
