import { test, expect } from './fixture';
import users from '../tests/data/users.json'; //import du fichier

test.beforeEach(async ({ page }) => {
        await page.goto('https://shop.missionplaywright.fr/');
});

test('authentification avec succès', async ({ page, navigation, authentificationPage,comptePage }) => {
  //Aller sur page de connexion
  await navigation.headerLogin.click();
  //Saisir et soumettre formulaire de connexion
  await authentificationPage.soumettreFormulaireConnexion(users.authentifie.email,users.authentifie.password);

  //verifier page accueil
  //attendre redirection vers page accueil
  await page.waitForURL('https://shop.missionplaywright.fr/');  

  //Accéder à mon compte pour vérifier que je suis bien connectée
  await navigation.cliquerSurMonCompte();
  //cliquer sur profil
  await comptePage.tabProfil.click();
  //patienter pour que les données soient affichées
  await expect (comptePage.titreInformationsPersonnelles).toBeVisible();
  //vérifier que les données de mon compte sont affichées
  await expect (comptePage.valeurNomComplet).toContainText(users.authentifie.nom);
  await expect (comptePage.valeurEmail).toContainText(users.authentifie.email, {ignoreCase:true});

  //déconnexion pour revenir à l'état initial 
  await comptePage.btnDeconnexion.click();
  //attendre redirection vers page accueil
  await page.waitForURL('https://shop.missionplaywright.fr/');  
  //On s'assure que le bouton "Login" est de nouveau visible
  await expect(navigation.headerLogin).toBeVisible();
});