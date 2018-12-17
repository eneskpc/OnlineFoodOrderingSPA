import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AddressService } from '../services/address.service';
import Swal from 'sweetalert2';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-address-list',
  templateUrl: './address-list.component.html',
  styleUrls: ['./address-list.component.css']
})
export class AddressListComponent implements OnInit {

  constructor(private authService: AuthService,
    private addressService: AddressService,
    private titleService: Title) { }
  mask: any[] = ['+', '1', ' ', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  ngOnInit() {
    setTimeout(() => {
      this.titleService.setTitle("Adreslerim");
    }, 0);
  }
}
