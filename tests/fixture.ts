//1-IMPORT DES CLASSES DU PROJET, A PARTIR DE LEURS FICHIERS RESPECTIFS
// "dans le dossier pages qui est juste à côté de toi", on utilise un seul point suivi d'un slash : ./
import { test as base } from '@playwright/test';
import { Accueil } from './pages/accueil';
import { APropos } from './pages/aPropos';
import { Authentification } from './pages/authentification';
import { Checkout } from './pages/checkout';
import { Compte } from './pages/compte';
import { Contact } from './pages/contact';
import { Navigation } from './pages/navigation';
import { Panier } from './pages/panier';
import { PDP } from './pages/pdp';
import { PLP } from './pages/plp';


//2-CREATION DU GRAND OBJET FIXTURE ET DE SES PROPRIETES QUI CORRESPONDENT AUX CLASSES DES POMS
//On liste tous les objets (Page Objects) que l'on veut rendre disponibles dans nos tests.
type MyFixtures = {
    accueilPage: Accueil;
    aproposPage: APropos;
    authentificationPage: Authentification;
    checkoutPage: Checkout;
    comptePage: Compte;
    contactPage: Contact;
    navigation: Navigation;
    panierPage: Panier;
    pdpPage: PDP;
    plpPage: PLP;

}

//3- EXPORTATION DU TEST ÉTENDU COMPRENANT L'INSTANCIATION DES OBJETS SPÉCIFIQUES AU PROJET
export const test = base.extend<MyFixtures>({
//propriété appelée dans le fichier de test , en minuscules, et créées à l'étape 2   
accueilPage: async ({page}, use)=> {
    //instanciation: l'instance (minuscule) est l'objet créé à partir de la Classe (majuscule), importée à l'étape 1 et issue des POM
    //l'instance est éphèmère et locale
    const accueil = new Accueil(page);
    //L'instance est inhectée dans la propriété qui sera utilisée dans le test
    await use(accueil);
},

aproposPage: async ({page}, use)=> {
    //instanciation
    const apropos = new APropos(page);
    //L'instance est inhectée dans la propriété qui sera utilisée dans le test
    await use(apropos);
},

authentificationPage: async ({page}, use)=> {
    //instanciation
    const auth = new Authentification(page);
    //L'instance est inhectée dans la propriété qui sera utilisée dans le test
    await use(auth);
},

checkoutPage: async ({page}, use)=> {
    //instanciation
    const checkout = new Checkout(page);
    //L'instance est inhectée dans la propriété qui sera utilisée dans le test
    await use(checkout);
},

comptePage: async ({page}, use)=> {
    //instanciation
    const compte = new Compte(page);
    //L'instance est inhectée dans la propriété qui sera utilisée dans le test
    await use(compte);
},

contactPage: async ({page}, use)=> {
    //instanciation
    const contact = new Contact(page);
    //L'instance est inhectée dans la propriété qui sera utilisée dans le test
    await use(contact);
},

navigation: async ({page}, use)=> {
    //instanciation
    const nav = new Navigation(page);
    //L'instance est inhectée dans la propriété qui sera utilisée dans le test
    await use(nav);
},

panierPage: async ({page}, use)=> {
    //instanciation
    const panier = new Panier(page);
    //L'instance est inhectée dans la propriété qui sera utilisée dans le test
    await use(panier);
},

pdpPage: async ({page}, use)=> {
    //instanciation
    const pdp = new PDP(page);
    //L'instance est inhectée dans la propriété qui sera utilisée dans le test
    await use(pdp);
},

plpPage: async ({page}, use)=> {
    //instanciation
    const plp = new PLP(page);
    //L'instance est inhectée dans la propriété qui sera utilisée dans le test
    await use(plp);
}



})


//4-On ré-exporte "expect" pour ne pas avoir à l'importer depuis @playwright/test ailleurs
export { expect } from '@playwright/test';