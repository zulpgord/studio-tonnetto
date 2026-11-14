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

## Sezione Studio (con il Tracker Psicobiologia)

Il piano di studio (capitoli, macro-domande, richiami, simulazioni) sta nel **Tracker Psicobiologia**. Tonnetto fa partire lo studio e registra cosa hai fatto. Le due app si passano un testo copiato e incollato:

- **Tracker → Tonnetto** (prima di studiare): nel Tracker «Invia a Tonnetto», in Tonnetto Studio → «Ricevi». Compaiono i capitoli da studiare, i richiami in scadenza e le scalette da scrivere.
- **Tonnetto → Tracker** (a fine serata): in Tonnetto Studio → «Invia» → Copia, nel Tracker «Ricevi da Tonnetto». Il Tracker registra minuti per capitolo e righe scritte a memoria; reinviare non crea doppioni.

Funzioni di Tonnetto per lo studio:

- **Esca**: a fine sessione scrivi da dove ripartire; alla riapertura un solo pulsante, «Apri la scatola»
- **Scatoletta piccola**: focus da 10 minuti per le serate no, poi scegli se chiudere o continuare
- **Pausa con richiamo**: dopo ogni focus di studio, 3 righe scritte a memoria prima della pausa
- **Numero sull'icona**: i richiami del Tracker in scadenza oggi (serve il permesso per le notifiche)
- **Diario per il tutor**: riepilogo della serata da copiare o condividere
- **Promesse mantenute** (sere fatte rispetto a quelle previste, con una sera di tolleranza) e un tonno che cresce con le sessioni

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
