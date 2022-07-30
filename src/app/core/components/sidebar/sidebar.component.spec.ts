import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { SidebarComponent } from './sidebar.component';

describe('SidebarComponent', () => {
  let fixture: ComponentFixture<SidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SidebarComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(SidebarComponent);
  });

  it('should contain a title section', () => {
    const text = fixture.nativeElement.querySelector('#title')?.textContent;
    expect(text).toBe('Dashboard');
  });

  it('should contain two button routerLinks', () => {
    const buttons = fixture.debugElement.queryAll(By.css('button')).length;
    expect(buttons).toEqual(2);
  });
});
