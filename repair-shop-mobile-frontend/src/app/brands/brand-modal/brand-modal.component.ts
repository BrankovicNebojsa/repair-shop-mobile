import { Component, Input, OnInit, ViewChild, } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-brand-modal',
  templateUrl: './brand-modal.component.html',
  styleUrls: ['./brand-modal.component.scss'],
})


export class BrandModalComponent implements OnInit {
  editBrandForm: FormGroup;
  @Input() title: string = 'Edit brand';
  @Input() name: string = '';

  constructor(private modalCtrl: ModalController) {
    this.editBrandForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
    });
  }

  ngOnInit() {}

  isFormValid() {
    if (this.editBrandForm.valid) {
      return false;
    } else {
      return true;
    }
  }

  onCancel() {
    this.modalCtrl.dismiss();
  }

  onSubmit() {
    if (!this.editBrandForm.valid) {
      return;
    }

    this.modalCtrl.dismiss(
      {
        brandData: {
          name: this.editBrandForm.get('name')?.value,
        },
      },
      'confirm'
    );
  }
}
