import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModelDetailsPage } from './model-details.page';

describe('ModelDetailsPage', () => {
  let component: ModelDetailsPage;
  let fixture: ComponentFixture<ModelDetailsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ModelDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
