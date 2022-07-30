import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { HeaderComponent } from './core/components/header/header.component';
import { SidebarComponent } from './core/components/sidebar/sidebar.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent, SidebarComponent, HeaderComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
  });

  it('should create the app', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should have a header directive on the template', () => {
    const headerCED = fixture.debugElement.queryAll(
      By.directive(SidebarComponent)
    );
    expect(headerCED.length).toEqual(1);
  });

  it('should have a sidebar directive on the template', () => {
    const sidebarCED = fixture.debugElement.queryAll(
      By.directive(SidebarComponent)
    );
    expect(sidebarCED.length).toEqual(1);
  });
});
