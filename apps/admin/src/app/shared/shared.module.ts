import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { TitleComponent } from './components/title/title.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ErrorComponent } from './components/error/error.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [TitleComponent, ErrorComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    MatIconModule,
    MatButtonModule,
    MatExpansionModule,
    MatListModule,
    RouterModule,
    MatCardModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
  ],
  exports: [
    HttpClientModule,
    MatIconModule,
    MatButtonModule,
    MatExpansionModule,
    MatListModule,
    RouterModule,
    TitleComponent,
    CommonModule,
    MatCardModule,
    MatPaginatorModule,
    ErrorComponent,
    MatProgressSpinnerModule,
  ],
})
export class SharedModule {}