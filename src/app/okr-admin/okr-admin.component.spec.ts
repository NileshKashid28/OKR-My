import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OkrAdminComponent } from './okr-admin.component';

describe('OkrAdminComponent', () => {
  let component: OkrAdminComponent;
  let fixture: ComponentFixture<OkrAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OkrAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OkrAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
