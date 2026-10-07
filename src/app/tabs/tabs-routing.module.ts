import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        loadChildren: () =>
          import('../tab1/tab1.module').then(m => m.Tab1PageModule)
      },
      {
        path: 'tab2',
        loadChildren: () =>
          import('../tab2/tab2.module').then(m => m.Tab2PageModule)
      },
      {
        path: 'tab3',
        loadChildren: () =>
          import('../tab3/tab3.module').then(m => m.Tab3PageModule)
      },
      {
        path: 'product-detail/:id',
        loadChildren: () =>
          import('../product-detail/product-detail.module')
            .then(m => m.ProductDetailPageModule)
      },
      {
        path: 'product-form',
        loadChildren: () =>
          import('../product-form/product-form.module')
            .then(m => m.ProductFormPageModule)
      },
      {
        path: 'product-form/:id',
        loadChildren: () =>
          import('../product-form/product-form.module')
            .then(m => m.ProductFormPageModule)
      },
      {
        path: 'cart',
        loadChildren: () =>
          import('../cart/cart.module').then(m => m.CartPageModule)
      },
      {
        path: 'transaction-detail/:id',
        loadChildren: () =>
          import('../transaction-detail/transaction-detail.module')
            .then(m => m.TransactionDetailPageModule)
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('../profile/profile.module').then(m => m.ProfilePageModule)
      },
      {
        path: 'settings',
        loadChildren: () =>
          import('../settings/settings.module').then(m => m.SettingsPageModule)
      },
      {
        path: 'about',
        loadChildren: () =>
          import('../about/about.module').then(m => m.AboutPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}