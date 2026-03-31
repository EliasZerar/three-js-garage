# 🚗 Garage 3D — React Three Fiber

Un garage 3D interactif en FPS construit avec React Three Fiber, où le joueur peut se déplacer librement entre des voitures exposées.

---

## 📁 Structure des fichiers

### `car_list.ts`
Contient la configuration de toutes les voitures exposées dans le garage.


Les voitures sont organisées en **3 rangées** sur l'axe X (x=0, x=6, x=12), avec 5 voitures par rangée espacées de 8 unités sur l'axe Z. Les modèles viennent du pack **Kenney Car Kit** (gratuit).

---

### `Car.tsx`
Composant simple qui charge et affiche un modèle GLTF.


Pas de physique, pas de collider — la collision est gérée côté joueur.

---

### `Garage.tsx`
Construit l'environnement 3D : sol, murs, plafond, néons et éclairage.

**Géométrie :**
- Sol et plafond en `planeGeometry`
- Murs en `boxGeometry`
- Lignes de parking calculées automatiquement depuis les positions des voitures (`car_list.ts`)

**Éclairage :**
- `rectAreaLight` sur chaque néon pour un éclairage doux et réaliste
- `pointLight` par néon pour diffuser la lumière autour
- `ambientLight` pour éviter un noir total dans les zones non éclairées

**Choix : pas de `castShadow` sur les spots**
Mettre `castShadow` sur 15 `spotLight` simultanément causait des **chutes de FPS massives** (chaque shadow génère une shadow map GPU). Supprimés au profit des `pointLight` sans ombre.

---

### `Player.tsx`
Gère le déplacement FPS et les collisions.

**Déplacement :**
Utilise `PointerLockControls` de drei avec `moveRight` / `moveForward` dans `useFrame`.

**Collisions — murs :**
Simple `Math.max / Math.min` sur la position du joueur par rapport aux `BOUNDS` du garage. Pas de librairie physique.

```ts
const BOUNDS = { minX: -3.5, maxX: 15.5, minZ: -19.5, maxZ: 19.5 }
pos.x = Math.max(BOUNDS.minX + PLAYER_RADIUS, Math.min(BOUNDS.maxX - PLAYER_RADIUS, pos.x));
```

**Collisions — voitures :**
Chaque voiture est représentée par une bounding box approximative. X et Z sont testés **séparément** pour permettre au joueur de longer une voiture sans être bloqué des deux côtés.

```ts
if (!prevXInZone) pos.x = prevX;
if (!prevZInZone) pos.z = prevZ;
```

**Spawn :**
Le joueur spawn au centre du garage via `useEffect` au montage du composant.

---

## ⚠️ Difficultés rencontrées

### 🔴 Sol rose
Le fond de la scène (background du `Canvas`) héritait de la couleur CSS de la page. Résolu en définissant explicitement la couleur de fond du Canvas.

### 🔴 Performances — lag avec les shadows
15 `spotLight` avec `castShadow` rendaient la scène injouable. Chaque lumière avec shadow génère une shadow map indépendante sur le GPU. **Solution** : suppression des `castShadow`, remplacement par des `pointLight` sans ombre.

### 🔴 Collision bloquante
La première implémentation remettait `prevX` ET `prevZ` en même temps lors d'une collision, bloquant complètement le joueur contre les voitures. **Solution** : tester X et Z indépendamment pour permettre le déplacement latéral.

### 🔴 Lag après quelques secondes de mouvement
Le tableau `zones` (bounding boxes des voitures) était recalculé à chaque render au lieu d'être mémoïsé. **Solution** : `useMemo(() => getCarZones(cars), [cars])`.

---

## 🛠️ Stack technique

| Outil | Usage |
|---|---|
| React Three Fiber | Rendu 3D dans React |
| @react-three/drei | `PointerLockControls`, `useKeyboardControls`, `useGLTF` |
| three-stdlib | Types pour `PointerLockControls` |
| Kenney Car Kit | Modèles 3D des voitures (GLB) |

---

## 🚀 Lancer le projet

```bash
npm install
npm run dev
```

Cliquer dans la scène pour activer le Pointer Lock, puis se déplacer avec **ZQSD** ou **WASD**.
