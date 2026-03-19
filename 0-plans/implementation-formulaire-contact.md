# Plan d'implémentation - Formulaire de contact PHP

## Objectif
Remplacer le système de soumission Webflow par une implémentation PHP personnalisée avec soumission AJAX.

## Destination des emails
- **Test** : julien@vert-menthe.fr
- **Production** : (à définir)

---

## 1. Fichiers à créer

### 1.1 `php/submit-form.php`
Fichier de traitement PHP à la racine du dossier `php/`.

**Fonctionnalités :**
- Réception des données en POST
- Validation server-side des champs obligatoires :
  - Prénom (requis)
  - Nom (requis)
  - Email (requis, format valide via `filter_var`)
  - Message (requis)
  - CGU (requis)
- Génération et validation token CSRF
- **Honeypot** : Vérifier que le champ `website_url` est vide (anti-spam basique)
- Envoi email via `mail()` ou PHPMailer
- Réponse JSON (succès/erreur)

**Token CSRF :**
- Générer un token unique par session
- Le champ caché `<input type="hidden" name="csrf_token" value="...">` sera ajouté par le JS
- Valider le token côté serveur avant traitement

**Réponse JSON attendue :**
```json
{
  "success": true,
  "message": "Votre message a bien été envoyé."
}
```

**Erreurs JSON :**
```json
{
  "success": false,
  "errors": {
    "prenom": "Le prénom est requis",
    "email": "L'email n'est pas valide",
    ...
  }
}
```

### 1.2 `js/form-handler.js`
Script JavaScript pour la soumission AJAX.

**Fonctionnalités :**
- Interception de la soumission des formulaires (classe `.ajax-form`)
- Récupération du token CSRF depuis le DOM (champ caché)
- **Honeypot anti-spam** : Champ caché `website_url` (à laisser vide). Si rempli = spam.
- Validation côté client
- Envoi AJAX vers `php/submit-form.php`
- Affichage message succès/erreur dans le DOM
- Réinitialisation du formulaire après succès
- **Cas spécial CGU** : Le checkbox CGU utilise un hack Webflow (`opacity:0`). Le JS doit utiliser `.closest()` ou vérifier `element.checked` directement

**Inclusion dans les pages HTML :**
```html
<script src="js/form-handler.js" defer></script>
```
Ajouter cette ligne avant `</body>` dans tous les fichiers HTML.

---

## 2. Fichiers à modifier

### 2.1 CSS - `css/cours-febus-021295.webflow.css`

**Modification ligne ~4805 :**
```css
/* AVANT */
.contact-modal2_content-wrapper {
  overflow: scroll;
}

/* APRÈS */
.contact-modal2_content-wrapper {
  overflow: visible;
  padding-bottom: 60px;
}
```

**Objectif** : Permettre aux tooltips HTML5 de s'afficher correctement dans la modale.

### 2.2 Fichiers HTML - 9 fichiers à modifier

**Formulaire Modal** (`#wf-form-Contact-popup`) :
- `method="get"` → `method="post"`
- Ajouter `action="php/submit-form.php"`
- Ajouter `class="ajax-form"`
- Ajouter `data-form-source="modal"`
- Supprimer les attributs `data-wf-*`
- **Ajouter** `<input type="hidden" name="csrf_token" value="">` (rempli par JS)

**Formulaire Footer** (`#wf-form-Contact`) :
- `method="get"` → `method="post"`
- Ajouter `action="php/submit-form.php"`
- Ajouter `class="ajax-form"`
- Ajouter `data-form-source="footer"`
- Supprimer les attributs `data-wf-*`
- **Ajouter** `<input type="hidden" name="csrf_token" value="">` (rempli par JS)

**Fichiers concernés :**
1. `index.html`
2. `cours-en-presentiel.html`
3. `cours-a-distance.html`
4. `galerie.html`
5. `conditions-generales.html`
6. `politique-de-confidentialite-et-cookies.html`
7. `cours-en-presentiel/stage-de-dessin-traditionnel.html`
8. `cours-en-presentiel/stage-illustration-numerique.html`
9. `cours-en-presentiel/stage-de-peinture-a-lhuile.html`

---

## 3. Éléments conservés

### 3.1 Validation des champs
- **Tooltips HTML5 natifs** conservés pour les champs obligatoires
- Message par défaut du navigateur pour les champs non remplis
- Validation du format email via `type="email"`

### 3.2 Messages de feedback Webflow conservés (invisible car remplacé par AJAX)
```html
<div class="form_message-success-wrapper w-form-done">
  <div class="form_message-success">
    <div class="success-text">Votre message a bien été envoyé.<br>Nous répondons habituellement sous 24h.</div>
  </div>
</div>
```

---

## 4. Structure des fichiers après modification

```
cours-febus.site/
├── index.html
├── cours-en-presentiel.html
├── cours-a-distance.html
├── galerie.html
├── conditions-generales.html
├── politique-de-confidentialite-et-cookies.html
├── php/
│   └── submit-form.php          (NOUVEAU)
├── js/
│   └── form-handler.js          (NOUVEAU)
├── css/
│   └── cours-febus-021295.webflow.css
└── cours-en-presentiel/
    ├── stage-de-dessin-traditionnel.html
    ├── stage-illustration-numerique.html
    └── stage-de-peinture-a-lhuile.html
```

---

## 5. Ordre d'implémentation suggéré

- [x] 1. Créer `php/submit-form.php`
- [x] 2. Créer `js/form-handler.js`
- [x] 3. Modifier CSS (correction overflow modale)
- [x] 4. Modifier `index.html` (ajouter script JS + modifier les 2 formulaires)
- [ ] 5. Tester la soumission depuis `index.html`
- [x] 6. Modifier `cours-en-presentiel.html`
- [x] 7. Modifier `cours-a-distance.html`
- [x] 8. Modifier `galerie.html`
- [x] 9. Modifier `conditions-generales.html`
- [x] 10. Modifier `politique-de-confidentialite-et-cookies.html`
- [x] 11. Modifier `cours-en-presentiel/stage-de-dessin-traditionnel.html`
- [x] 12. Modifier `cours-en-presentiel/stage-illustration-numerique.html`
- [x] 13. Modifier `cours-en-presentiel/stage-de-peinture-a-lhuile.html`
- [ ] 14. Tester tous les formulaires

---

## 6. Éléments non couverts (à traiter séparément)

- Intégration d'un système d'email transactionnel (SendGrid, Mailgun, etc.)
- Logs de soumission des formulaires
- Protection anti-spam renforcée (reCAPTCHA v3)
- Passage en production (changement adresse email destination)
