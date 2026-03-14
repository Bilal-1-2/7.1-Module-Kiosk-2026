# Kiosk Bestelsysteem - Testdocumentatie 

## Installatie en Opstart Instructies

## 📋 Vereisten

- [x] XAMPP (Apache + MySQL) geïnstalleerd en draaiend
- [x] Browser (Chrome/Firefox aanbevolen)
- [x] Visual Studio Code met Live Server extensie (optioneel voor ontwikkeling)

### 🛠️ Stap 1: Database Opzetten [Checklist]

- [x] Open phpMyAdmin: `http://localhost/phpmyadmin`
- [x] Nieuwe database aangemaakt: `kiosk_db`
- [x] `api/kiosk_db.sql` geïmporteerd
- [x] Tabellen geverifieerd:
      | Tabel | Verwacht | Status |
      |-------|-----------|--------|
      | categories | 6 rijen | ✅ |
      | products | 25 rijen | ✅ |
      | images | 25 rijen | ✅ |
      | order_status | 5 rijen | ✅ |
      | orders | leeg | ✅ |
      | order_product | leeg | ✅ |

### Stap 2: Configuratie Controleren

### 🔧 Stap 2: Configuratie Verificatie

1. Open `api/config.php`
2. Verifieer credentials:

```php
// Lokaal XAMPP
$this->host = "localhost";
$this->db_name = "kiosk_db";
$this->username = "root";
$this->password = "";
```

- [x] Credentials correct

### ▶️ Stap 3: Server Starten

Start XAMPP (Apache + MySQL)

Open terminal in project map:

bash

# Controleer of PHP werkt

php -v

# Test database connectie

http://localhost/7.1-Module-Kiosk-2026/api/test_db.php

### 🚀 Stap 4: Applicatie Testen

- [x] Open in browser: `http://localhost/7.1-Module-Kiosk-2026/index.html`
- [x] Of via Live Server: `http://127.0.0.1:5501/index.html`

## 🧪 Test Scenarios

1. Idle Scherm
   GIF animatie wordt geladen

"BESTELLEN" knop werkt

Taalkeuze (NL/EN) werkt

Eat-in/Take-out knoppen verschijnen

2. Categorie Navigatie
   Alle 6 categorieën zichtbaar

"Alles" toont 25 producten

Categorie filter werkt

Actieve categorie heeft groene rand

3. Producten
   3-koloms grid

Product afbeeldingen laden

Prijzen correct (€)

VG/V badges zichtbaar

4. Detail Popup
   Openen bij klik

Afbeelding toont

Beschrijving leesbaar

kcal weergave

- en - knoppen (1-99)

Annuleren sluit popup

Toevoegen aan winkelwagen

5. Winkelwagen
   Teller update bij toevoegen

Zelfde product verhoogt quantity

Toast notificatie verschijnt

"Bestelling Bekijken" toont items

6. Bestelling Overzicht
   text
   ┌─────────────────────────┐
   │ Bestelling Bekijken │
   ├─────────────────────────┤
   │ 🖼️ Product A x2 €13.00│
   │ 🖼️ Product B x1 €6.50 │
   ├─────────────────────────┤
   │ Totaal: €19.50│
   │ Totaal kcal: 570 │
   ├─────────────────────────┤
   │ [Annuleren] [Betalen]│
   └─────────────────────────┘
7. Pairing Suggesties
   Product Gesuggereerde Dip
   Sweet Potato Wedges Avocado Lime Crema
   Zucchini Fries Greek Yogurt Ranch
   Popup verschijnt na toevoegen

"Ja, toevoegen!" werkt

"Nee bedankt" sluit popup

Geen suggestie als dip al in winkelwagen

8. Betaling
   3 betaalmethodes tonen

Processing animatie (2 sec)

API call naar orders.php

Order ID ontvangen (1-99 cyclisch)

9. Order Nummer Berekening

```javascript
// Cyclisch nummer (1-99)
const displayNumber = ((actualOrderId - 1) % 99) + 1;
const paddedNumber = displayNumber.toString().padStart(2, "0");

// Voorbeeld:
// Order #1   → "01"
// Order #50  → "50"
// Order #99  → "99"
// Order #100 → "01"
// Order #101 → "02"
```

10. **Bon Afdrukken**
    text
    HAPPY HERBIVORE
    ===============
    Bestelnr: #42
    Datum: 14-03-2026 14:30
    Type: Eat-in

---

Product A x2 €13.00
Product B x1 €6.50

---

TOTAAL €19.50

Bedankt voor uw bestelling!
Toon deze bon bij afhalen
API Tests
Products API

```bash
curl -X GET "http://localhost/7.1-Module-Kiosk-2026/api/products.php"
```

**Expected Response:**

```json
{
  "success": true,
  "data": {
    "items": [...],
    "count": 25
  }
}
```

Orders API - POST
bash
POST http://localhost/7.1-Module-Kiosk-2026/api/orders.php
Content-Type: application/json

Request:
{
"products": [
{"product_id": 27, "quantity": 2},
{"product_id": 39, "quantity": 1}
],
"pickup_number": "76"
}

Response:
{
"success": true,
"data": {
"order_id": 52,
"pickup_number": "76",
"price_total": "18.00"
}
}
Database Schema
Tabellen
sql
categories (
category_id INT PRIMARY KEY AUTO_INCREMENT,
name VARCHAR(100),
description TEXT,
categoryfilename VARCHAR(255)
);

products (
product_id INT PRIMARY KEY AUTO_INCREMENT,
category_id INT,
image_id INT,
name VARCHAR(200),
description TEXT,
price DECIMAL(10,2),
kcal INT,
available BOOLEAN,
is_vegan BOOLEAN,
is_vegetarian BOOLEAN,
FOREIGN KEY (category_id) REFERENCES categories(category_id),
FOREIGN KEY (image_id) REFERENCES images(image_id)
);

orders (
order_id INT PRIMARY KEY AUTO_INCREMENT,
order_status_id INT,
pickup_number VARCHAR(2),
price_total DECIMAL(10,2),
datetime DATETIME,
FOREIGN KEY (order_status_id) REFERENCES order_status(order_status_id)
);

order_product (
order_id INT,
product_id INT,
price DECIMAL(10,2),
quantity INT DEFAULT 1,
PRIMARY KEY (order_id, product_id),
FOREIGN KEY (order_id) REFERENCES orders(order_id),
FOREIGN KEY (product_id) REFERENCES products(product_id)
);

order_status (
order_status_id INT PRIMARY KEY AUTO_INCREMENT,
description VARCHAR(50)
);

images (
image_id INT PRIMARY KEY AUTO_INCREMENT,
filename VARCHAR(255),
description TEXT
);
Probleemoplossing
Debug Logs
bash

# Bekijk API debug logs

cat api/debug.log

# Test database connectie

http://localhost/7.1-Module-Kiosk-2026/api/test_db.php

# Test API endpoints

http://localhost/7.1-Module-Kiosk-2026/test_api.html

## 🔧 Veelvoorkomende Fouten

| Fout                      | Oplossing                             |
| ------------------------- | ------------------------------------- |
| 500 Internal Server Error | Check `api/debug.log` voor details    |
| Database connectie error  | Controleer `config.php` credentials   |
| Duplicate entry fout      | Quantity kolom toegevoegd?            |
| Pagina herlaadt           | Knoppen moeten `type="button"` hebben |

Kleuren Thema
Oranje: #ff7520 (knoppen, destructief)

Licht Oranje: #ffb181 (achtergronden)

Groen: #8cd003 (succes, accents)

Licht Groen: #deff78 (main bg)

Donker Blauw: #053631 (tekst, primair)

Test Resultaten
Functionaliteiten
✅ Idle screen & taalkeuze

✅ Categorie filtering

✅ Product detail popup

✅ Winkelwagen beheer

✅ Pairing suggesties

✅ Betalingsflow

✅ Order nummer cyclisch (01-99)

✅ Bon afdrukken

✅ Nieuwe bestelling

API Endpoints
✅ GET /api/products.php - 25 items

✅ GET /api/categories.php - 6 categorieën

✅ POST /api/orders.php - Bestelling aanmaken

✅ GET /api/orders.php - Bestellingen ophalen

✅ PUT /api/orders.php - Status updaten

Database
✅ Alle tabellen bestaan

✅ Foreign keys werken

✅ AUTO_INCREMENT werkt

✅ Transacties worden gerollback bij fouten

Conclusie
Het kiosk systeem functioneert volledig volgens specificaties. Alle kritieke bugs zijn opgelost en het systeem is klaar voor gebruik in productie. De cyclische nummering (01-99) geeft klanten een overzichtelijk bestelnummer terwijl de database unieke ID's behoudt voor administratie.

```

```
