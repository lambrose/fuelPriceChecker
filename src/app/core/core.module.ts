import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { HeaderComponent } from './components/header/header.component';
import { SearchPlaceComponent } from './components/search-place/search-place.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { StoreModule } from '@ngrx/store';
import { reducer } from './core.reducer';

@NgModule({
  declarations: [HeaderComponent, SidebarComponent, SearchPlaceComponent],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    StoreModule.forRoot(reducer),
  ],
  exports: [HeaderComponent, SidebarComponent],
  providers: [],
})
export class CoreModule {}
