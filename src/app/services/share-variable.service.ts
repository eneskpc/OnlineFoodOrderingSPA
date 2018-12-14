import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShareVariableService {

  constructor() { }

  public isViewBreadCrumb: boolean = true;

}
