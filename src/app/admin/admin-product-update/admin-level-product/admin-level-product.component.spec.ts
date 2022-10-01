import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLevelProductComponent } from './admin-level-product.component';

describe('AdminLevelProductComponent', () => {
  let component: AdminLevelProductComponent;
  let fixture: ComponentFixture<AdminLevelProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminLevelProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminLevelProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
