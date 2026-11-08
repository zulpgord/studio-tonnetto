# Tonnetto · Timer di focus

Timer Pomodoro a tema tonno in scatola. Gratis, senza account, i dati restano sul telefono.

## Funzioni

- Timer Pomodoro (focus, pausa breve, pausa lunga) e cronometro
- Avvio tirando giù la linguetta della scatoletta, pausa spingendola su
- Tag con colori, note a fine sessione, sessioni interrotte
- Agenda a colonne (1, 2 o 3 giorni)
- Riepilogo per giorno, settimana o mese, con il confronto col periodo precedente
- Suoni di sottofondo: bianco, rosa, marrone, pioggia, oceano
- Swipe tra le sezioni, tema chiaro e scuro, schermo orizzontale
- Funziona offline dopo la prima apertura; esportazione e importazione dei dati

## Pubblicazione su GitHub Pages

1. Settings → Pages → Source: **Deploy from a branch**
2. Branch: `main`, cartella `/ (root)` → Save
3. Dopo un minuto l'app è su `https://zulpgord.github.io/studio-tonnetto/`

## Installazione su iPhone

Apri il link in **Safari** → Condividi → **Aggiungi alla schermata Home**.
Da lì si apre a schermo intero e può mostrare le notifiche (da autorizzare in Opzioni).

## Limiti noti (iOS)

Con il telefono bloccato iOS sospende le app web: il tempo resta giusto, ma il suono e la notifica di fine sessione arrivano solo quando riapri l'app.

## File

| File | Ruolo |
|---|---|
| `index.html` | L'app completa (HTML, CSS e JS in un solo file) |
| `manifest.webmanifest` | Nome, colori e icone per l'installazione |
| `sw.js` | Service worker: uso offline e notifiche |
| `icon*.png`, `icon.svg` | Icone |
