import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrandDetailsPage } from './brand-details.page';

describe('BrandDetailsPage', () => {
  let component: BrandDetailsPage;
  let fixture: ComponentFixture<BrandDetailsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(BrandDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
