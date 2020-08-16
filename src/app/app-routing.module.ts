import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SigninComponent } from './components/user/signin/signin.component'
import { SignupComponent } from './components/user/signup/signup.component'
import { AuthGuradService } from './services/auth/auth-gurad.service';
import { OrdersComponent } from './components/user/orders/orders.component';
import { ManageComponent } from './components/admin/manage/manage.component';
import { RoleGuardService } from './services/admin/role-guard.service';
import { AddcategoryComponent } from './components/admin/addcategory/addcategory.component';
import { AddproductComponent } from './components/admin/addproduct/addproduct.component';
import { ManageproductComponent } from './components/admin/manageproduct/manageproduct.component';
import { UpdateproductComponent } from './components/admin/updateproduct/updateproduct.component';
import { CartComponent } from './components/user/cart/cart.component';
const routes: Routes = [
  {
    path:'',component:HomeComponent
  },
  {
    path:'cart',
    component:CartComponent
  },
  {
    path:'signin',component:SigninComponent
  },
  {
    path:'signup',component:SignupComponent
  },
  {
    path:'orders',
    component:OrdersComponent,
    canActivate:[AuthGuradService]

  },
  {
    path:'admin/manage',
    component:ManageComponent,
    canActivate: [RoleGuardService],
    data:{
      expectedRole: 1
    }
  },
  {
    path:'admin/create/category',
    component:AddcategoryComponent,
    canActivate: [RoleGuardService],
    data:{
      expectedRole: 1
    }

  },
  {
    path:'admin/create/product',
    component:AddproductComponent ,
    canActivate: [RoleGuardService],
    data:{
      expectedRole: 1
    }

  },
  {
    path:'admin/manage/products',
    component:ManageproductComponent ,
    canActivate: [RoleGuardService],
    data:{
      expectedRole: 1
    }

  },
  {
    path:'admin/manage/product/update/:postId',
    component:UpdateproductComponent ,
    canActivate: [RoleGuardService],
    data:{
      expectedRole: 1
    }

  },
  { path: '**', redirectTo: '' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
