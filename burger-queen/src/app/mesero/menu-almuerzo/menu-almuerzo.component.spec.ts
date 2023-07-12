import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuAlmuerzoComponent } from './menu-almuerzo.component';

describe('MenuAlmuerzoComponent', () => {
  let component: MenuAlmuerzoComponent;
  let fixture: ComponentFixture<MenuAlmuerzoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MenuAlmuerzoComponent]
    });
    fixture = TestBed.createComponent(MenuAlmuerzoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
