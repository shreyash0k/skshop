import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './components/home/home.component'
import { FlexLayoutModule } from '@angular/flex-layout';
import {HttpClientModule} from '@angular/common/http'
import { SidenavListComponent } from './sidenav-list/sidenav-list.component';
import { SignupComponent } from './components/user/signup/signup.component';
import { SigninComponent } from './components/user/signin/signin.component'
import {FormsModule} from '@angular/forms'
import {ReactiveFormsModule} from '@angular/forms'
import {MatFormFieldModule} from '@angular/material/form-field'
import { JwtHelperService, JWT_OPTIONS  } from '@auth0/angular-jwt';
import { ImageHelperModule } from 'image-helper';
import { NgxBraintreeModule } from 'ngx-braintree';


//material
import {MatSidenavModule} from '@angular/material/sidenav'
import {MatIconModule} from '@angular/material/icon'
import {MatButtonModule} from '@angular/material/button'
import {MatListModule } from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {MatRadioModule} from '@angular/material/radio';

import { OrdersComponent } from './components/user/orders/orders.component';
import { ManageComponent } from './components/admin/manage/manage.component';
import { AddcategoryComponent } from './components/admin/addcategory/addcategory.component';
import { AddproductComponent } from './components/admin/addproduct/addproduct.component';
import { ManageproductComponent } from './components/admin/manageproduct/manageproduct.component';
import { UpdateproductComponent } from './components/admin/updateproduct/updateproduct.component';
import { CartComponent } from './components/user/cart/cart.component'



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    SidenavListComponent,
    SignupComponent,
    SigninComponent,
    OrdersComponent,
    ManageComponent,
    AddcategoryComponent,
    AddproductComponent,
    ManageproductComponent,
    UpdateproductComponent,
    CartComponent,
  ],
  imports: [
    BrowserModule,
    FlexLayoutModule,
    HttpClientModule,
    AppRoutingModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    NgbModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatCardModule,
    MatRadioModule,
    ImageHelperModule,
    NgxBraintreeModule

  ],
  providers: [{ provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService],
  bootstrap: [AppComponent]
})
export class AppModule { }
