import { Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { AccueilComponent } from './pages/accueil/accueil.component';
import { AdminComponent } from './pages/admin/admin.component';
import { ContactFormComponent } from './pages/formulaires/contact-form/contact-form.component';
import { LoginFormComponent } from './pages/formulaires/login-form/login-form.component';
import { RegisterFormComponent } from './pages/formulaires/register-form/register-form.component';
import { ResetPasswordRequestComponent } from './pages/formulaires/reset-password-request/reset-password-request.component';
import { ResetPasswordComponent } from './pages/formulaires/reset-password/reset-password.component';
import { CgvComponent } from './pages/legal/cgv/cgv.component';
import { MentionLegaleComponent } from './pages/legal/mention-legale/mention-legale.component';
import { RgpdComponent } from './pages/legal/rgpd/rgpd.component';
import { MarchantComponent } from './pages/marchant/marchant.component';
import { MarchesComponent } from './pages/marches/marches.component';
import { PageMarcheComponent } from './pages/page-marche/page-marche.component';
import { UserCartComponent } from './pages/pages-client/user-cart/user-cart.component';
import { UserCommandHistoryComponent } from './pages/pages-client/user-command-history/user-command-history.component';
import { UserCommentComponent } from './pages/pages-client/user-comment/user-comment.component';
import { UserEditComponent } from './pages/pages-client/user-edit/user-edit.component';
import { UserProfilComponent } from './pages/pages-client/user-profil/user-profil.component';
import { AccueilCommerceComponent } from './pages/pages-commerces/accueil-commerce/accueil-commerce.component';
import { GestionDesCommandesComponent } from './pages/pages-commerces/gestion-des-commandes/gestion-des-commandes.component';
import { GestionDesProduitsComponent } from './pages/pages-commerces/gestion-des-produits/gestion-des-produits.component';
import { ProfilCommercantComponent } from './pages/pages-commerces/profil-commercant/profil-commercant.component';
import { InterditComponent } from './pages/pages-erreurs/interdit/interdit.component';
import { NotFoundComponent } from './pages/pages-erreurs/not-found/not-found.component';
import { UnavailableComponent } from './pages/pages-erreurs/unavailable/unavailable.component';
import { ProduitsComponent } from './pages/produits/produits.component';

export const routes: Routes = 
[
    // redirection
    { path:'', redirectTo:'notfound', pathMatch: 'full'},

    // formulaires
    { path: 'login', component: LoginFormComponent },
    { path: 'register', component: RegisterFormComponent },
    { path: 'contact', component: ContactFormComponent },
    { path: 'reset-password-request', component: ResetPasswordRequestComponent },
    { path: 'reset-password', component: ResetPasswordComponent },

    // pages administration
    { path: 'admin', component: AdminComponent, canActivate: [() => AuthGuard('ROLE_ADMIN')] },

    // pages global
    { path: 'accueil', component:AccueilComponent },
    { path: 'marches', component:MarchesComponent},
    { path: 'marches/:id', component:PageMarcheComponent},
    { path: 'produits', component:ProduitsComponent},
    { path: 'marchants/:id', component:MarchantComponent},

    // pages commerces
    { path: 'commerce/accueil', component:AccueilCommerceComponent, canActivate: [() => AuthGuard('ROLE_COMMERCANT')] },
    { path: 'commerce/profil-commerçant', component:ProfilCommercantComponent, canActivate: [() => AuthGuard('ROLE_COMMERCANT')] },
    { path: 'commerce/gestion-des-produits', component:GestionDesProduitsComponent, canActivate: [() => AuthGuard('ROLE_COMMERCANT')] },
    { path: 'commerce/gestion-des-commandes', component:GestionDesCommandesComponent, canActivate: [() => AuthGuard('ROLE_COMMERCANT')] },

    // pages client
    { path: 'user/profil/:id', component: UserProfilComponent },
    { path: 'user/command-history', component: UserCommandHistoryComponent },
    { path: 'user/cart', component: UserCartComponent },
    { path: 'user/comments/:id', component: UserCommentComponent },
    { path: 'user/:id/edit', component: UserEditComponent },

    // pages legales
    { path: 'rgpd', component:RgpdComponent },
    { path: 'mention', component:MentionLegaleComponent },
    { path: 'cgv', component: CgvComponent },
    
    // pages erreurs
    { path: 'notfound', component:NotFoundComponent },
    { path: 'interdit', component:InterditComponent },
    { path: 'unavailable', component:UnavailableComponent },

    // pages user
    { path: 'user-profil', component: UserProfilComponent},
    { path: 'user/command-history/:id', component: UserCommandHistoryComponent },
    { path: 'user-cart', component: UserCartComponent },
    { path: 'user-comments', component: UserCommentComponent },
    { path: 'user/:id/edit', component: UserEditComponent },
];
