# ◈ WebFolio — Luxury Web Portfolio

Eine elegante, dunkle Portfolio-Website zur Präsentation deiner Webprojekte als Kacheln.
Mit Google Login für den Admin-Bereich und Firebase als Backend.

---

## 🚀 Live-Demo einrichten (3 Schritte)

### Schritt 1 — Firebase-Projekt anlegen

1. Gehe zu [console.firebase.google.com](https://console.firebase.google.com)
2. **„Projekt erstellen"** → Name eingeben → Fortfahren
3. Google Analytics kann deaktiviert werden

#### Authentication aktivieren
1. Im linken Menü: **Build → Authentication → Get started**
2. **Sign-in method → Google → Aktivieren**
3. Deine E-Mail als „Projektunterstützungs-E-Mail" angeben → Speichern

#### Firestore-Datenbank anlegen
1. Im linken Menü: **Build → Firestore Database → Create database**
2. **„Start in production mode"** wählen → Next
3. Region wählen (z. B. `europe-west1`) → Done

#### Firestore-Regeln setzen
Unter **Firestore → Rules** folgendes einfügen:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Öffentlich lesbar
    match /sites/{document} {
      allow read: if true;
      // Nur authentifizierte Nutzer dürfen schreiben
      allow write: if request.auth != null;
    }
  }
}
```

#### Firebase-Konfiguration kopieren
1. **Project Settings** (Zahnrad-Icon) → **„Deine Apps"** → Web-App (`</>`) hinzufügen
2. App-Nickname eingeben → Registrieren
3. Den `firebaseConfig`-Block kopieren

---

### Schritt 2 — `index.html` anpassen

Öffne `index.html` und ersetze den Platzhalter-Block:

```javascript
// 🔧 FIREBASE KONFIGURATION — hier anpassen!
const firebaseConfig = {
  apiKey:            "DEIN_API_KEY",
  authDomain:        "DEIN_PROJECT.firebaseapp.com",
  projectId:         "DEIN_PROJECT_ID",
  storageBucket:     "DEIN_PROJECT.appspot.com",
  messagingSenderId: "DEINE_SENDER_ID",
  appId:             "DEINE_APP_ID"
};
```

…mit deinen echten Werten aus Firebase.

---

### Schritt 3 — Auf GitHub Pages deployen

```bash
# 1. Neues GitHub-Repository anlegen (z. B. "webfolio")
# 2. Dateien pushen
git init
git add .
git commit -m "Initial: WebFolio"
git branch -M main
git remote add origin https://github.com/DEIN_USERNAME/webfolio.git
git push -u origin main

# 3. GitHub Pages aktivieren:
# Repository → Settings → Pages → Source: "Deploy from a branch"
# Branch: main / (root) → Save
```

Deine Website ist dann erreichbar unter:  
`https://DEIN_USERNAME.github.io/webfolio/`

#### Authorized Domains in Firebase eintragen
1. Firebase Console → Authentication → Settings → Authorized domains
2. **„Add domain"** → `DEIN_USERNAME.github.io` eintragen → Speichern

---

## 🛠 Lokale Entwicklung

Da Firebase ES-Module verwendet, benötigst du einen lokalen Server:

```bash
# Option A: Python
python3 -m http.server 8000

# Option B: Node.js (npx)
npx serve .

# Option C: VS Code Extension
# "Live Server" installieren → Rechtsklick auf index.html → "Open with Live Server"
```

---

## ✏️ Anpassen

### Seitentitel & Name ändern
In `index.html` suchen und ersetzen:
- `WebFolio` → dein Projektname
- `Web Showcase` → dein Seitentitel

### Farben anpassen
In `css/style.css` oben im `:root`-Block:
```css
--gold:       #c9a84c;   /* Akzentfarbe */
--bg:         #070708;   /* Hintergrundfarbe */
--bg-card:    #0e0e10;   /* Kachelfarbe */
```

### Admin-Zugriff auf bestimmte E-Mails beschränken
In `index.html` nach `onAuthStateChanged` suchen und ergänzen:
```javascript
const ALLOWED_EMAILS = ["deine@email.de"];
if (user && !ALLOWED_EMAILS.includes(user.email)) {
  await signOut(auth);
  showToast("Kein Zugriff.", "error");
  return;
}
```

---

## 📁 Dateistruktur

```
webfolio/
├── index.html          # Haupt-App (Frontend + Firebase-Logik)
├── css/
│   └── style.css       # Design-System
├── js/
│   └── app.js          # UI-Utilities (Modal, Toast)
└── README.md           # Diese Datei
```

---

## 🔧 Website-Felder

| Feld | Pflicht | Beschreibung |
|------|---------|-------------|
| Titel | ✅ | Name der Website |
| URL | ✅ | Link zur Website |
| Beschreibung | — | Kurzer Text unter dem Titel |
| Kategorie | — | Tag oben auf der Kachel (z. B. "E-Commerce") |
| Reihenfolge | — | Zahl für die Sortierung (0 = zuerst) |
| Vorschaubild | — | URL zu einem Screenshot/Bild |

---

## 🔐 Sicherheit

- **Nur authentifizierte Nutzer** können Daten schreiben (Firestore-Regeln)
- **Öffentlich lesbar** — alle können die Kacheln sehen
- **API-Keys** in `index.html` sind für Frontend-Nutzung gedacht und per Domain-Beschränkung gesichert
- Für Produktion empfohlen: [Firebase App Check](https://firebase.google.com/docs/app-check) aktivieren

---

*Erstellt mit ◈ WebFolio*
