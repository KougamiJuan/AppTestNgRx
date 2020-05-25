import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// NgRx Modules
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule, routerReducer } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

// NgRx Imports
import { reducers, metaReducers } from './reducers/reducers';

// Firebase
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';

// Configs
import { AppRoutingModule } from './app-routing.module';
import { environment } from 'src/environments/environment';

// Components
import { AppComponent } from './app.component';

const FIRE_IMPORTS = [
  AngularFireModule.initializeApp(environment.firebase),
  AngularFirestoreModule,
  AngularFireAuthModule
];

const NGRX_IMPORTS = [
  StoreModule.forRoot(reducers, { metaReducers }),
  StoreRouterConnectingModule.forRoot({ stateKey: 'router' }),
  StoreDevtoolsModule.instrument({
    name: 'AppTestNgRx',
    logOnly: environment.production,
    maxAge: 25
  }),
  EffectsModule.forRoot([])
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ...NGRX_IMPORTS,
    ...FIRE_IMPORTS
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
