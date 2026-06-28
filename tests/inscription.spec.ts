import { test, expect } from './fixture';
import {faker} from '@faker-js/faker';


test.beforeEach(async ({ page }) => {
        await page.goto('https://shop.missionplaywright.fr/');

});

test('inscription', async ({ page, navigation, authentificationPage, comptePage  }) => {
  const fakeUser = {
      nom: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password({ length: 12 }),
    };


  //aller sur page insciption
  await navigation.cliquerSurLogin();
  //aller sur inscription
  await authentificationPage.boutonInscription.click();
  //saisir et soumettre formulaire inscription
  await authentificationPage.soumettreFormulaireInscription(fakeUser.nom, fakeUser.email, fakeUser.password, fakeUser.password);
  //attendre redirection vers page accueil
  await page.waitForURL('https://shop.missionplaywright.fr/');  
  //vérifier que l'inscription est enregistrée en vérifiant accès mon compte
  await navigation.cliquerSurMonCompte();
  //cliquer sur profil
  await comptePage.tabProfil.click();
  //patienter pour que les données soient affichées
  await expect (comptePage.titreInformationsPersonnelles).toBeVisible();

  //vérifier que les données saisies sont affichées
  await page.reload(); //rechargement de la page car le nom n'est pas affiché juste après la création
  await expect (comptePage.valeurNomComplet).toContainText(fakeUser.nom);
  await expect (comptePage.valeurEmail).toContainText(fakeUser.email, {ignoreCase:true});

  //Supprimer le compte
  //Cliquer sur Parametres
  //await comptePage.tabParametres.click(); 
  //Cliquer sur Supprimer compte -- SUPPRIMER COMPTE N'EST PAS IMPLEMENTE
  //await comptePage.btnSupprimerCompte.click();
})
