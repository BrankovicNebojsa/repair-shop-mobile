import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { PricesPage } from './prices.page';

describe('PricesPage', () => {
  let component: PricesPage;
  let fixture: ComponentFixture<PricesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PricesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
