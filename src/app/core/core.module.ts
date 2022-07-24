import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { HeaderComponent } from './components/header/header.component';
import { SearchPlaceComponent } from './components/search-place/search-place.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { StoreModule } from '@ngrx/store';
import { reducer } from './app.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';

let devtools = [];
if (!environment.production) {
  devtools.push(StoreDevtoolsModule.instrument({ maxAge: 25 }));
}

@NgModule({
  declarations: [HeaderComponent, SidebarComponent, SearchPlaceComponent],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    StoreModule.forRoot(reducer),
    ...devtools,
  ],
  exports: [HeaderComponent, SidebarComponent],
  providers: [],
})
export class CoreModule {}
