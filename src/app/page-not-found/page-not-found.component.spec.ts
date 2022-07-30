import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageNotFoundComponent } from './page-not-found.component';

describe('PageNotFoundComponent', () => {
  let fixture: ComponentFixture<PageNotFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PageNotFoundComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PageNotFoundComponent);
  });

  it('should contain the 404 page not found text', () => {
    const selector = fixture.nativeElement.querySelector('.msg')?.textContent;
    expect(selector).toContain('404');
  });
});
