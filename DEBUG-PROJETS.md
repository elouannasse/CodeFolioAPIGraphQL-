# 🐛 Guide de Debugging - Page Projets Vide

## 🔍 Étape 1: Vérifier les logs du navigateur

Ouvrez la Console du navigateur (F12) et recherchez ces messages:

```
✅ GET_PROJETS query completed
📊 Data received: {...}
📝 Projets count: X
```

Si vous voyez des erreurs `❌`, notez le message exact.

---

## 🛠️ Étape 2: Tester la Query GraphQL directement

### Option A: Via GraphQL Playground

1. Ouvrez: **http://localhost:4000/graphql**

2. Dans les **HTTP HEADERS**, ajoutez votre token:

```json
{
  "Authorization": "Bearer VOTRE_TOKEN_ICI"
}
```

3. Exécutez cette query:

```graphql
query TestGetProjets {
  getProjets {
    id
    title
    description
    technologies
    category
    status
    featured
  }
}
```

4. **Résultat attendu:**
   - ✅ Si vide: `{ "data": { "getProjets": [] } }` → Base de données vide (normal)
   - ❌ Si erreur: Vérifiez le message d'erreur

---

## 📦 Étape 3: Ajouter des données de test

### Méthode 1: Script Node.js (Recommandé)

```bash
# Depuis la racine du projet
node seed-projets.js
```

Ce script va:

- ✅ Supprimer les anciens projets de test
- ✅ Créer 5 nouveaux projets variés
- ✅ Afficher les résultats dans la console

### Méthode 2: Via GraphQL Playground

Ouvrez le fichier `graphql-test-projets.graphql` et copiez les mutations une par une dans le Playground.

**N'oubliez pas le Header Authorization!**

### Méthode 3: Via l'interface Admin

1. Cliquez sur **🚀 Nouveau Projet**
2. Remplissez le formulaire:
   - **Titre**: "Mon Premier Projet"
   - **Description**: "Description test"
   - **Technologies**: "React, Node.js, MongoDB"
   - **Catégorie**: Web
   - **Statut**: En cours
3. Cliquez **➕ Créer**
4. Vérifiez la console du navigateur pour les logs

---

## 🔍 Étape 4: Vérifier la base de données MongoDB

### Via MongoDB Compass ou mongosh:

```javascript
// Connexion
mongosh mongodb://127.0.0.1:27017/portfolio

// Compter les projets
db.projets.countDocuments()

// Afficher tous les projets
db.projets.find().pretty()

// Vérifier les userId
db.projets.find({}, { title: 1, userId: 1 })
```

### Problème connu: userId null

Si vous voyez cette erreur dans les logs backend:

```
Cannot return null for non-nullable field Projet.userId
```

**Solution**: Les anciens projets dans la DB n'ont pas de userId. Options:

1. **Supprimer les anciens projets:**

```javascript
db.projets.deleteMany({ userId: null });
```

2. **Ou mettre à jour avec votre userId:**

```javascript
// D'abord, trouvez votre userId
db.users.find({ email: "admin@portfolio.com" });

// Ensuite, mettez à jour
db.projets.updateMany(
  { userId: null },
  { $set: { userId: ObjectId("VOTRE_USER_ID_ICI") } }
);
```

---

## 🎯 Étape 5: Tests de la page Admin

### Checklist de debugging:

- [ ] La page se charge sans erreur 500
- [ ] Le spinner de chargement apparaît brièvement
- [ ] Aucune erreur rouge dans la console
- [ ] Le bouton "🚀 Nouveau Projet" est visible
- [ ] Le compteur affiche "Mes Projets (X)"
- [ ] Les logs dans la console montrent la query exécutée

### Si la page affiche "Aucun projet ajouté":

C'est **NORMAL** si:

- ✅ Aucune erreur dans la console
- ✅ Le compteur affiche (0)
- ✅ Les logs montrent `getProjets: []`

→ Votre backend fonctionne, la DB est juste vide. Passez à l'étape suivante.

---

## ✅ Étape 6: Créer votre premier projet

1. **Cliquez sur "🚀 Nouveau Projet"**

2. **Remplissez le formulaire complet:**

   ```
   Titre: Portfolio GraphQL API
   Catégorie: Backend
   Statut: En cours
   Technologies: Node.js, TypeScript, GraphQL, MongoDB
   Description: API complète pour portfolio professionnel
   Date début: 2025-10-01
   GitHub: https://github.com/username/portfolio-api
   ⭐ Projet vedette: Coché
   ```

3. **Cliquez "➕ Créer"**

4. **Dans la console, vous devriez voir:**

   ```
   ✅ Projet created: {...}
   ✅ GET_PROJETS query completed
   📝 Projets count: 1
   ```

5. **La carte du projet doit apparaître** avec:
   - Titre en gras
   - Badge "⭐ Projet vedette"
   - Badge catégorie "⚙️ Backend"
   - Badge statut "🔄 En cours"
   - Tags technologies en bleu
   - Boutons Modifier (bleu) et Supprimer (rouge)

---

## 🐞 Problèmes courants

### Erreur: "Cannot return null for non-nullable field userId"

**Cause**: Anciens projets sans userId
**Solution**: Nettoyez la DB (voir Étape 4)

### La query ne s'exécute jamais

**Vérification**:

1. Backend est-il lancé? → http://localhost:4000/health
2. Token valide? → Reconnectez-vous
3. CORS activé? → Vérifiez les headers dans Network

### Erreur 401 Unauthorized

**Solution**: Votre token a expiré

1. Déconnectez-vous
2. Reconnectez-vous avec admin@portfolio.com
3. Le nouveau token sera stocké automatiquement

### Les projets n'apparaissent pas après création

**Vérifications**:

1. Console → Cherchez "✅ Projet created"
2. Si présent → La création a réussi
3. Cliquez sur "🔄 Actualiser" pour forcer un refetch
4. Si toujours vide → Vérifiez la DB directement

---

## 📞 Commandes de diagnostic rapides

```bash
# Vérifier que les serveurs tournent
# Backend:
curl http://localhost:4000/health

# Frontend:
# Ouvrir http://localhost:3003 dans le navigateur

# Vérifier MongoDB
mongosh mongodb://127.0.0.1:27017/portfolio --eval "db.projets.countDocuments()"

# Ajouter des données de test
node seed-projets.js

# Nettoyer tous les projets
node clean-projets.js
```

---

## 📊 Exemple de logs réussis

**Console navigateur après chargement:**

```
🔍 ProjetsManagement render - loading: false error: undefined data: {...}
✅ GET_PROJETS query completed
📊 Data received: { getProjets: [...] }
📝 Projets count: 5
📋 Projets: [{...}, {...}, ...]
📊 Final projets to display: (5) [{...}]
```

**Console backend après requête:**

```
2025-11-06 20:30:15 [info]: ::1 - - [06/Nov/2025:19:30:15 +0000] "POST /graphql HTTP/1.1" 200 2450
```

---

## 🎉 Succès!

Si vous voyez vos projets s'afficher avec:

- ✅ Cartes blanches avec bordure bleue
- ✅ Titres, descriptions, technologies
- ✅ Badges de statut et catégorie
- ✅ Boutons Modifier/Supprimer fonctionnels

**Félicitations! Votre page Projets fonctionne parfaitement!** 🚀
