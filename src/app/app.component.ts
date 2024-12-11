import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { MapComponent } from './map/map.component';
import { TableComponent } from './table/table.component';
import { FooterComponent } from './footer/footer.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, MapComponent, TableComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor(private toastrService: ToastrService) {}

  title = 'weather-app2';
}
