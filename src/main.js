import * as THREE from "three";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Headphones,
  Images,
  Mail,
  MessageCircle,
  Moon,
  Pause,
  Play,
  Radio,
  Sun,
  Table2,
  createIcons
} from "lucide";
import "./styles.css";

const iconSet = {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Headphones,
  Images,
  Mail,
  MessageCircle,
  Moon,
  Pause,
  Play,
  Radio,
  Sun,
  Table2
};

const I18N = {
  de: {
    "nav.program": "Programm",
    "nav.community": "Community",
    "nav.podcast": "Podcast",
    "theme.light": "Hell",
    "theme.dark": "Dunkel",
    "language.aria": "Sprache auswählen",
    "hero.kicker": "Live aus Mike's AI Radio",
    "hero.lead": "Ein direkter Einstieg in neue AI-Musik: aktuelle Sendung, nächste Shows und Community auf einer Seite.",
    "hero.playerAria": "Webradio Player",
    "hero.now": "Jetzt live",
    "hero.next": "Nächste Sendung",
    "hero.nextAria": "Nächste Sendung",
    "hero.mediaAria": "Podcast und Textbooks",
    "hero.podcastText": "Sendungen nachhören",
    "hero.textbooksText": "Begleittexte lesen",
    "hero.sphereAria": "Aktuelles Sendungsbild als drehende Sphäre",
    "program.kicker": "Programm Vorschau",
    "program.title": "Die nächsten Stunden im Blick",
    "program.showCarousel": "Karussell zeigen",
    "program.showTable": "Programmplan",
    "program.weekdaysAria": "Wochentage",
    "program.prev": "Vorherige Sendung",
    "program.next": "Nächste Sendung",
    "program.carouselAria": "Sendungskarussell",
    "program.scheduleTitle": "Programmplan {day}",
    "live": "Live",
    "stats.stream": "Stream",
    "stats.nowPlaying": "Jetzt läuft",
    "stats.time": "Uhrzeit",
    "player.connecting": "Verbinde",
    "player.connected": "Verbunden",
    "player.ready": "Bereit",
    "player.pause": "Pause",
    "player.start": "Start",
    "community.kicker": "Community",
    "community.title": "Sag kurz, was dich erreicht",
    "community.copy": "Ein Satz reicht. Wer eine E-Mail hinterlässt, kann Rückmeldungen und besondere Radio-Updates bekommen.",
    "form.name": "Name",
    "form.guest": "Gast",
    "form.email": "E-Mail für Updates",
    "form.comment": "Kommentar",
    "form.commentPlaceholder": "Was soll im Radio mehr passieren?",
    "form.consent": "Ich bin mit der Verarbeitung meiner Angaben einverstanden. Details stehen in der",
    "form.privacy": "Datenschutzerklärung",
    "form.initialStatus": "Noch nicht gesendet.",
    "form.submit": "Eintragen",
    "entries.show": "Einträge anzeigen",
    "entries.hide": "Einträge ausblenden",
    "entries.notLoaded": "Einträge noch nicht geladen.",
    "entries.loading": "Lade Einträge ...",
    "entries.loaded": "{count} Einträge geladen.",
    "entries.none": "Noch keine Einträge vorhanden.",
    "entries.localUnavailable": "Lokale Vorschau: Die Pi-API ist hier nicht aktiv.",
    "entries.error": "Einträge konnten gerade nicht geladen werden.",
    "entries.empty": "Keine Einträge zu zeigen.",
    "legal.aria": "Rechtliches",
    "legal.imprint": "Impressum",
    "legal.privacy": "Datenschutz",
    "legal.dispute": "Streitbeilegung",
    "comment.needText": "Bitte erst einen kurzen Kommentar schreiben.",
    "comment.needConsent": "Bitte die kurze Einwilligung bestätigen.",
    "comment.localPreview": "Lokaler Prototyp: nichts wurde an den Pi gesendet.",
    "comment.localEntry": "Lokaler Prototyp: Beispiel-Eintrag nur hier angezeigt.",
    "comment.sending": "Sende ...",
    "comment.thanksEmail": "Danke. Bitte prüfe die Bestätigungs-E-Mail.",
    "comment.thanks": "Danke. Dein Kommentar ist gespeichert.",
    "comment.failed": "Senden fehlgeschlagen: {message}",
    "day.monday.short": "Mo",
    "day.tuesday.short": "Di",
    "day.wednesday.short": "Mi",
    "day.thursday.short": "Do",
    "day.friday.short": "Fr",
    "day.saturday.short": "Sa",
    "day.sunday.short": "So",
    "day.monday.long": "Montag",
    "day.tuesday.long": "Dienstag",
    "day.wednesday.long": "Mittwoch",
    "day.thursday.long": "Donnerstag",
    "day.friday.long": "Freitag",
    "day.saturday.long": "Samstag",
    "day.sunday.long": "Sonntag"
  },
  en: {
    "nav.program": "Schedule",
    "nav.community": "Community",
    "nav.podcast": "Podcast",
    "theme.light": "Light",
    "theme.dark": "Dark",
    "language.aria": "Select language",
    "hero.kicker": "Live from Mike's AI Radio",
    "hero.lead": "A direct entry into new AI music: the current show, upcoming slots, and community on one page.",
    "hero.playerAria": "Web radio player",
    "hero.now": "Live now",
    "hero.next": "Next show",
    "hero.nextAria": "Next show",
    "hero.mediaAria": "Podcast and textbooks",
    "hero.podcastText": "Listen to past shows",
    "hero.textbooksText": "Read companion texts",
    "hero.sphereAria": "Current show artwork as a rotating sphere",
    "program.kicker": "Schedule Preview",
    "program.title": "The next hours at a glance",
    "program.showCarousel": "Show carousel",
    "program.showTable": "Schedule",
    "program.weekdaysAria": "Weekdays",
    "program.prev": "Previous show",
    "program.next": "Next show",
    "program.carouselAria": "Show carousel",
    "program.scheduleTitle": "Schedule {day}",
    "live": "Live",
    "stats.stream": "Stream",
    "stats.nowPlaying": "Now playing",
    "stats.time": "Time",
    "player.connecting": "Connecting",
    "player.connected": "Connected",
    "player.ready": "Ready",
    "player.pause": "Pause",
    "player.start": "Start",
    "community.kicker": "Community",
    "community.title": "Tell us what reached you",
    "community.copy": "One sentence is enough. Leave an email address to receive replies and special radio updates.",
    "form.name": "Name",
    "form.guest": "Guest",
    "form.email": "Email for updates",
    "form.comment": "Comment",
    "form.commentPlaceholder": "What should happen more often on the radio?",
    "form.consent": "I consent to the processing of my details. Details are in the",
    "form.privacy": "privacy policy",
    "form.initialStatus": "Not sent yet.",
    "form.submit": "Submit",
    "entries.show": "Show entries",
    "entries.hide": "Hide entries",
    "entries.notLoaded": "Entries not loaded yet.",
    "entries.loading": "Loading entries ...",
    "entries.loaded": "{count} entries loaded.",
    "entries.none": "No entries yet.",
    "entries.localUnavailable": "Local preview: the Pi API is not active here.",
    "entries.error": "Entries cannot be loaded right now.",
    "entries.empty": "No entries to show.",
    "legal.aria": "Legal",
    "legal.imprint": "Imprint",
    "legal.privacy": "Privacy",
    "legal.dispute": "Dispute resolution",
    "comment.needText": "Please write a short comment first.",
    "comment.needConsent": "Please confirm the short consent first.",
    "comment.localPreview": "Local prototype: nothing was sent to the Pi.",
    "comment.localEntry": "Local prototype: sample entry shown only here.",
    "comment.sending": "Sending ...",
    "comment.thanksEmail": "Thanks. Please check the confirmation email.",
    "comment.thanks": "Thanks. Your comment has been saved.",
    "comment.failed": "Sending failed: {message}",
    "day.monday.short": "Mon",
    "day.tuesday.short": "Tue",
    "day.wednesday.short": "Wed",
    "day.thursday.short": "Thu",
    "day.friday.short": "Fri",
    "day.saturday.short": "Sat",
    "day.sunday.short": "Sun",
    "day.monday.long": "Monday",
    "day.tuesday.long": "Tuesday",
    "day.wednesday.long": "Wednesday",
    "day.thursday.long": "Thursday",
    "day.friday.long": "Friday",
    "day.saturday.long": "Saturday",
    "day.sunday.long": "Sunday"
  },
  fr: {
    "nav.program": "Programme",
    "nav.community": "Communauté",
    "nav.podcast": "Podcast",
    "theme.light": "Clair",
    "theme.dark": "Sombre",
    "language.aria": "Choisir la langue",
    "hero.kicker": "En direct de Mike's AI Radio",
    "hero.lead": "Une entrée directe dans la nouvelle musique IA : émission en cours, prochains rendez-vous et communauté sur une seule page.",
    "hero.playerAria": "Lecteur webradio",
    "hero.now": "En direct",
    "hero.next": "Prochaine émission",
    "hero.nextAria": "Prochaine émission",
    "hero.mediaAria": "Podcast et textbooks",
    "hero.podcastText": "Réécouter les émissions",
    "hero.textbooksText": "Lire les textes d'accompagnement",
    "hero.sphereAria": "Visuel de l'émission en sphère rotative",
    "program.kicker": "Aperçu du programme",
    "program.title": "Les prochaines heures en un coup d'oeil",
    "program.showCarousel": "Afficher le carrousel",
    "program.showTable": "Programme",
    "program.weekdaysAria": "Jours de la semaine",
    "program.prev": "Émission précédente",
    "program.next": "Émission suivante",
    "program.carouselAria": "Carrousel des émissions",
    "program.scheduleTitle": "Programme {day}",
    "live": "Live",
    "stats.stream": "Stream",
    "stats.nowPlaying": "À l'antenne",
    "stats.time": "Heure",
    "player.connecting": "Connexion",
    "player.connected": "Connecté",
    "player.ready": "Prêt",
    "player.pause": "Pause",
    "player.start": "Démarrer",
    "community.kicker": "Communauté",
    "community.title": "Dis brièvement ce qui t'a touché",
    "community.copy": "Une phrase suffit. Avec une adresse e-mail, tu peux recevoir des réponses et des mises à jour spéciales.",
    "form.name": "Nom",
    "form.guest": "Invité",
    "form.email": "E-mail pour les mises à jour",
    "form.comment": "Commentaire",
    "form.commentPlaceholder": "Que devrait-on entendre plus souvent à la radio ?",
    "form.consent": "J'accepte le traitement de mes données. Les détails figurent dans la",
    "form.privacy": "politique de confidentialité",
    "form.initialStatus": "Pas encore envoyé.",
    "form.submit": "Envoyer",
    "entries.show": "Afficher les entrées",
    "entries.hide": "Masquer les entrées",
    "entries.notLoaded": "Entrées pas encore chargées.",
    "entries.loading": "Chargement des entrées ...",
    "entries.loaded": "{count} entrées chargées.",
    "entries.none": "Aucune entrée pour le moment.",
    "entries.localUnavailable": "Aperçu local : l'API Pi n'est pas active ici.",
    "entries.error": "Les entrées ne peuvent pas être chargées pour le moment.",
    "entries.empty": "Aucune entrée à afficher.",
    "legal.aria": "Mentions légales",
    "legal.imprint": "Mentions légales",
    "legal.privacy": "Confidentialité",
    "legal.dispute": "Règlement des litiges",
    "comment.needText": "Écris d'abord un court commentaire.",
    "comment.needConsent": "Confirme d'abord le consentement.",
    "comment.localPreview": "Prototype local : rien n'a été envoyé au Pi.",
    "comment.localEntry": "Prototype local : exemple affiché seulement ici.",
    "comment.sending": "Envoi ...",
    "comment.thanksEmail": "Merci. Vérifie l'e-mail de confirmation.",
    "comment.thanks": "Merci. Ton commentaire est enregistré.",
    "comment.failed": "Échec de l'envoi : {message}",
    "day.monday.short": "Lu",
    "day.tuesday.short": "Ma",
    "day.wednesday.short": "Me",
    "day.thursday.short": "Je",
    "day.friday.short": "Ve",
    "day.saturday.short": "Sa",
    "day.sunday.short": "Di",
    "day.monday.long": "Lundi",
    "day.tuesday.long": "Mardi",
    "day.wednesday.long": "Mercredi",
    "day.thursday.long": "Jeudi",
    "day.friday.long": "Vendredi",
    "day.saturday.long": "Samedi",
    "day.sunday.long": "Dimanche"
  }
};

Object.assign(I18N, {
  es: {
    ...I18N.en,
    "nav.program": "Programa",
    "theme.light": "Claro",
    "theme.dark": "Oscuro",
    "language.aria": "Seleccionar idioma",
    "hero.kicker": "En directo desde Mike's AI Radio",
    "hero.lead": "Una entrada directa a nueva música con IA: emisión actual, próximos programas y comunidad en una sola página.",
    "hero.playerAria": "Reproductor de radio web",
    "hero.now": "En directo",
    "hero.next": "Próximo programa",
    "hero.nextAria": "Próximo programa",
    "hero.mediaAria": "Podcast y textos",
    "hero.podcastText": "Escuchar programas anteriores",
    "hero.textbooksText": "Leer textos complementarios",
    "hero.sphereAria": "Imagen del programa actual como esfera giratoria",
    "program.kicker": "Vista previa del programa",
    "program.title": "Las próximas horas de un vistazo",
    "program.showCarousel": "Mostrar carrusel",
    "program.showTable": "Programación",
    "program.weekdaysAria": "Días de la semana",
    "program.prev": "Programa anterior",
    "program.next": "Siguiente programa",
    "program.carouselAria": "Carrusel de programas",
    "program.scheduleTitle": "Programación {day}",
    "stats.nowPlaying": "Ahora suena",
    "stats.time": "Hora",
    "player.connecting": "Conectando",
    "player.connected": "Conectado",
    "player.ready": "Listo",
    "player.start": "Iniciar",
    "community.title": "Cuéntanos qué te llegó",
    "community.copy": "Una frase basta. Si dejas tu email, puedes recibir respuestas y actualizaciones especiales.",
    "form.guest": "Invitado",
    "form.email": "Email para actualizaciones",
    "form.comment": "Comentario",
    "form.commentPlaceholder": "¿Qué debería pasar más a menudo en la radio?",
    "form.consent": "Acepto el tratamiento de mis datos. Los detalles están en la",
    "form.privacy": "política de privacidad",
    "form.initialStatus": "Aún no enviado.",
    "form.submit": "Enviar",
    "entries.show": "Mostrar entradas",
    "entries.hide": "Ocultar entradas",
    "entries.notLoaded": "Entradas aún no cargadas.",
    "entries.loading": "Cargando entradas ...",
    "entries.loaded": "{count} entradas cargadas.",
    "entries.none": "Aún no hay entradas.",
    "entries.empty": "No hay entradas que mostrar.",
    "legal.aria": "Legal",
    "legal.imprint": "Aviso legal",
    "legal.privacy": "Privacidad",
    "legal.dispute": "Resolución de conflictos",
    "comment.needText": "Escribe primero un comentario breve.",
    "comment.needConsent": "Confirma primero el consentimiento.",
    "comment.sending": "Enviando ...",
    "comment.thanksEmail": "Gracias. Revisa el email de confirmación.",
    "comment.thanks": "Gracias. Tu comentario se ha guardado.",
    "comment.failed": "Error al enviar: {message}",
    "day.monday.short": "Lu",
    "day.tuesday.short": "Ma",
    "day.wednesday.short": "Mi",
    "day.thursday.short": "Ju",
    "day.friday.short": "Vi",
    "day.saturday.short": "Sa",
    "day.sunday.short": "Do",
    "day.monday.long": "Lunes",
    "day.tuesday.long": "Martes",
    "day.wednesday.long": "Miércoles",
    "day.thursday.long": "Jueves",
    "day.friday.long": "Viernes",
    "day.saturday.long": "Sábado",
    "day.sunday.long": "Domingo"
  },
  it: {
    ...I18N.en,
    "nav.program": "Programma",
    "theme.light": "Chiaro",
    "theme.dark": "Scuro",
    "language.aria": "Seleziona lingua",
    "hero.kicker": "In diretta da Mike's AI Radio",
    "hero.lead": "Un accesso diretto alla nuova musica AI: programma in onda, prossime trasmissioni e community in una pagina.",
    "hero.playerAria": "Player web radio",
    "hero.now": "Ora in diretta",
    "hero.next": "Prossima trasmissione",
    "hero.nextAria": "Prossima trasmissione",
    "hero.mediaAria": "Podcast e testi",
    "hero.podcastText": "Riascolta le trasmissioni",
    "hero.textbooksText": "Leggi i testi di accompagnamento",
    "program.kicker": "Anteprima programma",
    "program.title": "Le prossime ore a colpo d'occhio",
    "program.showCarousel": "Mostra carosello",
    "program.showTable": "Palinsesto",
    "program.weekdaysAria": "Giorni della settimana",
    "program.prev": "Trasmissione precedente",
    "program.next": "Trasmissione successiva",
    "program.scheduleTitle": "Palinsesto {day}",
    "stats.nowPlaying": "In onda",
    "stats.time": "Ora",
    "player.connecting": "Connessione",
    "player.connected": "Connesso",
    "player.ready": "Pronto",
    "player.start": "Avvia",
    "community.title": "Racconta cosa ti ha raggiunto",
    "community.copy": "Basta una frase. Lascia un'email per ricevere risposte e aggiornamenti speciali.",
    "form.guest": "Ospite",
    "form.email": "Email per aggiornamenti",
    "form.comment": "Commento",
    "form.commentPlaceholder": "Cosa dovrebbe succedere più spesso alla radio?",
    "form.consent": "Accetto il trattamento dei miei dati. I dettagli sono nella",
    "form.privacy": "privacy policy",
    "form.initialStatus": "Non ancora inviato.",
    "form.submit": "Invia",
    "entries.show": "Mostra voci",
    "entries.hide": "Nascondi voci",
    "entries.notLoaded": "Voci non ancora caricate.",
    "entries.loading": "Caricamento voci ...",
    "entries.loaded": "{count} voci caricate.",
    "entries.none": "Ancora nessuna voce.",
    "entries.empty": "Nessuna voce da mostrare.",
    "legal.imprint": "Note legali",
    "legal.privacy": "Privacy",
    "legal.dispute": "Risoluzione controversie",
    "comment.needText": "Scrivi prima un breve commento.",
    "comment.needConsent": "Conferma prima il consenso.",
    "comment.sending": "Invio ...",
    "comment.thanksEmail": "Grazie. Controlla l'email di conferma.",
    "comment.thanks": "Grazie. Il tuo commento è stato salvato.",
    "comment.failed": "Invio non riuscito: {message}",
    "day.monday.short": "Lu",
    "day.tuesday.short": "Ma",
    "day.wednesday.short": "Me",
    "day.thursday.short": "Gi",
    "day.friday.short": "Ve",
    "day.saturday.short": "Sa",
    "day.sunday.short": "Do",
    "day.monday.long": "Lunedì",
    "day.tuesday.long": "Martedì",
    "day.wednesday.long": "Mercoledì",
    "day.thursday.long": "Giovedì",
    "day.friday.long": "Venerdì",
    "day.saturday.long": "Sabato",
    "day.sunday.long": "Domenica"
  },
  nl: {
    ...I18N.en,
    "nav.program": "Programma",
    "theme.light": "Licht",
    "theme.dark": "Donker",
    "language.aria": "Taal kiezen",
    "hero.kicker": "Live vanuit Mike's AI Radio",
    "hero.lead": "Een directe start met nieuwe AI-muziek: huidige uitzending, komende shows en community op één pagina.",
    "hero.now": "Nu live",
    "hero.next": "Volgende uitzending",
    "hero.nextAria": "Volgende uitzending",
    "hero.podcastText": "Uitzendingen terugluisteren",
    "hero.textbooksText": "Begeleidende teksten lezen",
    "program.kicker": "Programma vooruitblik",
    "program.title": "De komende uren in beeld",
    "program.showCarousel": "Carrousel tonen",
    "program.showTable": "Programma",
    "program.weekdaysAria": "Weekdagen",
    "program.prev": "Vorige uitzending",
    "program.next": "Volgende uitzending",
    "program.scheduleTitle": "Programma {day}",
    "stats.nowPlaying": "Nu speelt",
    "stats.time": "Tijd",
    "player.connecting": "Verbinden",
    "player.connected": "Verbonden",
    "player.ready": "Klaar",
    "player.start": "Start",
    "community.title": "Vertel kort wat je raakte",
    "community.copy": "Eén zin is genoeg. Laat een e-mailadres achter voor reacties en speciale updates.",
    "form.guest": "Gast",
    "form.email": "E-mail voor updates",
    "form.comment": "Reactie",
    "form.commentPlaceholder": "Wat mag er vaker op de radio gebeuren?",
    "form.consent": "Ik ga akkoord met de verwerking van mijn gegevens. Details staan in het",
    "form.privacy": "privacybeleid",
    "form.initialStatus": "Nog niet verzonden.",
    "form.submit": "Verzenden",
    "entries.show": "Berichten tonen",
    "entries.hide": "Berichten verbergen",
    "entries.notLoaded": "Berichten nog niet geladen.",
    "entries.loading": "Berichten laden ...",
    "entries.loaded": "{count} berichten geladen.",
    "entries.none": "Nog geen berichten.",
    "entries.empty": "Geen berichten om te tonen.",
    "legal.imprint": "Colofon",
    "legal.privacy": "Privacy",
    "legal.dispute": "Geschillenregeling",
    "day.monday.short": "Ma",
    "day.tuesday.short": "Di",
    "day.wednesday.short": "Wo",
    "day.thursday.short": "Do",
    "day.friday.short": "Vr",
    "day.saturday.short": "Za",
    "day.sunday.short": "Zo",
    "day.monday.long": "Maandag",
    "day.tuesday.long": "Dinsdag",
    "day.wednesday.long": "Woensdag",
    "day.thursday.long": "Donderdag",
    "day.friday.long": "Vrijdag",
    "day.saturday.long": "Zaterdag",
    "day.sunday.long": "Zondag"
  },
  pl: {
    ...I18N.en,
    "nav.program": "Program",
    "theme.light": "Jasny",
    "theme.dark": "Ciemny",
    "language.aria": "Wybierz język",
    "hero.kicker": "Na żywo z Mike's AI Radio",
    "hero.lead": "Szybki start z nową muzyką AI: aktualna audycja, kolejne programy i społeczność na jednej stronie.",
    "hero.now": "Teraz na żywo",
    "hero.next": "Następna audycja",
    "hero.nextAria": "Następna audycja",
    "hero.podcastText": "Posłuchaj poprzednich audycji",
    "hero.textbooksText": "Czytaj teksty towarzyszące",
    "program.kicker": "Podgląd programu",
    "program.title": "Najbliższe godziny w skrócie",
    "program.showCarousel": "Pokaż karuzelę",
    "program.showTable": "Ramówka",
    "program.weekdaysAria": "Dni tygodnia",
    "program.prev": "Poprzednia audycja",
    "program.next": "Następna audycja",
    "program.scheduleTitle": "Ramówka {day}",
    "stats.nowPlaying": "Teraz gra",
    "stats.time": "Czas",
    "player.connecting": "Łączenie",
    "player.connected": "Połączono",
    "player.ready": "Gotowe",
    "player.start": "Start",
    "community.title": "Napisz krótko, co do Ciebie trafiło",
    "community.copy": "Wystarczy jedno zdanie. Zostaw e-mail, aby otrzymywać odpowiedzi i specjalne aktualizacje.",
    "form.guest": "Gość",
    "form.email": "E-mail do aktualizacji",
    "form.comment": "Komentarz",
    "form.commentPlaceholder": "Czego powinno być więcej w radiu?",
    "form.consent": "Zgadzam się na przetwarzanie moich danych. Szczegóły są w",
    "form.privacy": "polityce prywatności",
    "form.initialStatus": "Jeszcze nie wysłano.",
    "form.submit": "Wyślij",
    "entries.show": "Pokaż wpisy",
    "entries.hide": "Ukryj wpisy",
    "entries.notLoaded": "Wpisy nie zostały jeszcze załadowane.",
    "entries.loading": "Ładowanie wpisów ...",
    "entries.loaded": "Załadowano {count} wpisów.",
    "entries.none": "Brak wpisów.",
    "entries.empty": "Brak wpisów do pokazania.",
    "legal.imprint": "Impressum",
    "legal.privacy": "Prywatność",
    "legal.dispute": "Rozstrzyganie sporów",
    "day.monday.short": "Pn",
    "day.tuesday.short": "Wt",
    "day.wednesday.short": "Śr",
    "day.thursday.short": "Cz",
    "day.friday.short": "Pt",
    "day.saturday.short": "Sb",
    "day.sunday.short": "Nd",
    "day.monday.long": "Poniedziałek",
    "day.tuesday.long": "Wtorek",
    "day.wednesday.long": "Środa",
    "day.thursday.long": "Czwartek",
    "day.friday.long": "Piątek",
    "day.saturday.long": "Sobota",
    "day.sunday.long": "Niedziela"
  },
  pt: {
    ...I18N.en,
    "nav.program": "Programa",
    "theme.light": "Claro",
    "theme.dark": "Escuro",
    "language.aria": "Selecionar idioma",
    "hero.kicker": "Ao vivo da Mike's AI Radio",
    "hero.lead": "Uma entrada direta na nova música AI: emissão atual, próximos programas e comunidade numa só página.",
    "hero.now": "Ao vivo agora",
    "hero.next": "Próximo programa",
    "hero.nextAria": "Próximo programa",
    "hero.podcastText": "Ouvir programas anteriores",
    "hero.textbooksText": "Ler textos de apoio",
    "program.kicker": "Prévia do programa",
    "program.title": "As próximas horas em resumo",
    "program.showCarousel": "Mostrar carrossel",
    "program.showTable": "Programação",
    "program.weekdaysAria": "Dias da semana",
    "program.prev": "Programa anterior",
    "program.next": "Próximo programa",
    "program.scheduleTitle": "Programação {day}",
    "stats.nowPlaying": "A tocar agora",
    "stats.time": "Hora",
    "player.connecting": "A ligar",
    "player.connected": "Ligado",
    "player.ready": "Pronto",
    "player.start": "Iniciar",
    "community.title": "Diz brevemente o que te marcou",
    "community.copy": "Uma frase basta. Deixa um e-mail para receber respostas e atualizações especiais.",
    "form.guest": "Visitante",
    "form.email": "E-mail para atualizações",
    "form.comment": "Comentário",
    "form.commentPlaceholder": "O que deveria acontecer mais vezes na rádio?",
    "form.consent": "Aceito o tratamento dos meus dados. Os detalhes estão na",
    "form.privacy": "política de privacidade",
    "form.initialStatus": "Ainda não enviado.",
    "form.submit": "Enviar",
    "entries.show": "Mostrar entradas",
    "entries.hide": "Ocultar entradas",
    "entries.notLoaded": "Entradas ainda não carregadas.",
    "entries.loading": "A carregar entradas ...",
    "entries.loaded": "{count} entradas carregadas.",
    "entries.none": "Ainda não há entradas.",
    "entries.empty": "Não há entradas para mostrar.",
    "legal.imprint": "Aviso legal",
    "legal.privacy": "Privacidade",
    "legal.dispute": "Resolução de litígios",
    "day.monday.short": "Seg",
    "day.tuesday.short": "Ter",
    "day.wednesday.short": "Qua",
    "day.thursday.short": "Qui",
    "day.friday.short": "Sex",
    "day.saturday.short": "Sáb",
    "day.sunday.short": "Dom",
    "day.monday.long": "Segunda-feira",
    "day.tuesday.long": "Terça-feira",
    "day.wednesday.long": "Quarta-feira",
    "day.thursday.long": "Quinta-feira",
    "day.friday.long": "Sexta-feira",
    "day.saturday.long": "Sábado",
    "day.sunday.long": "Domingo"
  },
  sv: {
    ...I18N.en,
    "nav.program": "Program",
    "theme.light": "Ljust",
    "theme.dark": "Mörkt",
    "language.aria": "Välj språk",
    "hero.kicker": "Live från Mike's AI Radio",
    "hero.lead": "En direkt ingång till ny AI-musik: aktuell sändning, kommande program och community på en sida.",
    "hero.now": "Live nu",
    "hero.next": "Nästa program",
    "hero.nextAria": "Nästa program",
    "hero.podcastText": "Lyssna på tidigare program",
    "hero.textbooksText": "Läs följtexter",
    "program.kicker": "Programöversikt",
    "program.title": "De kommande timmarna i blick",
    "program.showCarousel": "Visa karusell",
    "program.showTable": "Programtablå",
    "program.weekdaysAria": "Veckodagar",
    "program.prev": "Föregående program",
    "program.next": "Nästa program",
    "program.scheduleTitle": "Programtablå {day}",
    "stats.nowPlaying": "Spelas nu",
    "stats.time": "Tid",
    "player.connecting": "Ansluter",
    "player.connected": "Ansluten",
    "player.ready": "Redo",
    "player.start": "Starta",
    "community.title": "Berätta kort vad som nådde dig",
    "community.copy": "En mening räcker. Lämna en e-postadress för svar och särskilda uppdateringar.",
    "form.guest": "Gäst",
    "form.email": "E-post för uppdateringar",
    "form.comment": "Kommentar",
    "form.commentPlaceholder": "Vad borde hända oftare i radion?",
    "form.consent": "Jag samtycker till behandling av mina uppgifter. Detaljer finns i",
    "form.privacy": "integritetspolicyn",
    "form.initialStatus": "Inte skickat ännu.",
    "form.submit": "Skicka",
    "entries.show": "Visa inlägg",
    "entries.hide": "Dölj inlägg",
    "entries.notLoaded": "Inlägg ännu inte laddade.",
    "entries.loading": "Laddar inlägg ...",
    "entries.loaded": "{count} inlägg laddade.",
    "entries.none": "Inga inlägg ännu.",
    "entries.empty": "Inga inlägg att visa.",
    "legal.imprint": "Impressum",
    "legal.privacy": "Integritet",
    "legal.dispute": "Tvistlösning",
    "day.monday.short": "Mån",
    "day.tuesday.short": "Tis",
    "day.wednesday.short": "Ons",
    "day.thursday.short": "Tor",
    "day.friday.short": "Fre",
    "day.saturday.short": "Lör",
    "day.sunday.short": "Sön",
    "day.monday.long": "Måndag",
    "day.tuesday.long": "Tisdag",
    "day.wednesday.long": "Onsdag",
    "day.thursday.long": "Torsdag",
    "day.friday.long": "Fredag",
    "day.saturday.long": "Lördag",
    "day.sunday.long": "Söndag"
  },
  da: {
    ...I18N.en,
    "nav.program": "Program",
    "theme.light": "Lys",
    "theme.dark": "Mørk",
    "language.aria": "Vælg sprog",
    "hero.kicker": "Live fra Mike's AI Radio",
    "hero.lead": "En direkte indgang til ny AI-musik: aktuel udsendelse, næste shows og community på én side.",
    "hero.now": "Live nu",
    "hero.next": "Næste udsendelse",
    "hero.nextAria": "Næste udsendelse",
    "hero.podcastText": "Lyt til tidligere udsendelser",
    "hero.textbooksText": "Læs ledsagende tekster",
    "program.kicker": "Programoversigt",
    "program.title": "De næste timer i overblik",
    "program.showCarousel": "Vis karrusel",
    "program.showTable": "Programplan",
    "program.weekdaysAria": "Ugedage",
    "program.prev": "Forrige udsendelse",
    "program.next": "Næste udsendelse",
    "program.scheduleTitle": "Programplan {day}",
    "stats.nowPlaying": "Spiller nu",
    "stats.time": "Tid",
    "player.connecting": "Forbinder",
    "player.connected": "Forbundet",
    "player.ready": "Klar",
    "player.start": "Start",
    "community.title": "Fortæl kort, hvad der ramte dig",
    "community.copy": "Én sætning er nok. Efterlad en e-mail for svar og særlige radioopdateringer.",
    "form.guest": "Gæst",
    "form.email": "E-mail til opdateringer",
    "form.comment": "Kommentar",
    "form.commentPlaceholder": "Hvad bør ske oftere i radioen?",
    "form.consent": "Jeg accepterer behandlingen af mine oplysninger. Detaljer står i",
    "form.privacy": "privatlivspolitikken",
    "form.initialStatus": "Ikke sendt endnu.",
    "form.submit": "Send",
    "entries.show": "Vis indlæg",
    "entries.hide": "Skjul indlæg",
    "entries.notLoaded": "Indlæg er ikke indlæst endnu.",
    "entries.loading": "Indlæser indlæg ...",
    "entries.loaded": "{count} indlæg indlæst.",
    "entries.none": "Ingen indlæg endnu.",
    "entries.empty": "Ingen indlæg at vise.",
    "legal.imprint": "Impressum",
    "legal.privacy": "Privatliv",
    "legal.dispute": "Tvistbilæggelse",
    "day.monday.short": "Man",
    "day.tuesday.short": "Tir",
    "day.wednesday.short": "Ons",
    "day.thursday.short": "Tor",
    "day.friday.short": "Fre",
    "day.saturday.short": "Lør",
    "day.sunday.short": "Søn",
    "day.monday.long": "Mandag",
    "day.tuesday.long": "Tirsdag",
    "day.wednesday.long": "Onsdag",
    "day.thursday.long": "Torsdag",
    "day.friday.long": "Fredag",
    "day.saturday.long": "Lørdag",
    "day.sunday.long": "Søndag"
  },
  hr: {
    ...I18N.en,
    "nav.program": "Program",
    "nav.community": "Zajednica",
    "nav.podcast": "Podcast",
    "theme.light": "Svijetlo",
    "theme.dark": "Tamno",
    "language.aria": "Odaberi jezik",
    "hero.kicker": "Uživo iz Mike's AI Radio",
    "hero.lead": "Izravan ulaz u novu AI glazbu: trenutna emisija, sljedeći termini i zajednica na jednoj stranici.",
    "hero.playerAria": "Web radio player",
    "hero.now": "Uživo sada",
    "hero.next": "Sljedeća emisija",
    "hero.nextAria": "Sljedeća emisija",
    "hero.mediaAria": "Podcast i tekstovi",
    "hero.podcastText": "Preslušaj prethodne emisije",
    "hero.textbooksText": "Čitaj popratne tekstove",
    "hero.sphereAria": "Slika aktualne emisije kao rotirajuća sfera",
    "program.kicker": "Pregled programa",
    "program.title": "Sljedeći sati na jednom mjestu",
    "program.showCarousel": "Prikaži vrtuljak",
    "program.showTable": "Program",
    "program.weekdaysAria": "Dani u tjednu",
    "program.prev": "Prethodna emisija",
    "program.next": "Sljedeća emisija",
    "program.carouselAria": "Vrtuljak emisija",
    "program.scheduleTitle": "Program {day}",
    "live": "Uživo",
    "stats.stream": "Stream",
    "stats.nowPlaying": "Trenutno svira",
    "stats.time": "Vrijeme",
    "player.connecting": "Povezivanje",
    "player.connected": "Povezano",
    "player.ready": "Spremno",
    "player.pause": "Pauza",
    "player.start": "Start",
    "community.kicker": "Zajednica",
    "community.title": "Ukratko reci što te dotaknulo",
    "community.copy": "Dovoljna je jedna rečenica. Ako ostaviš e-mail, možeš primati odgovore i posebne radio novosti.",
    "form.name": "Ime",
    "form.guest": "Gost",
    "form.email": "E-mail za novosti",
    "form.comment": "Komentar",
    "form.commentPlaceholder": "Čega bi na radiju trebalo biti više?",
    "form.consent": "Slažem se s obradom svojih podataka. Detalji su u",
    "form.privacy": "pravilima privatnosti",
    "form.initialStatus": "Još nije poslano.",
    "form.submit": "Pošalji",
    "entries.show": "Prikaži unose",
    "entries.hide": "Sakrij unose",
    "entries.notLoaded": "Unosi još nisu učitani.",
    "entries.loading": "Učitavam unose ...",
    "entries.loaded": "Učitano unosa: {count}.",
    "entries.none": "Još nema unosa.",
    "entries.localUnavailable": "Lokalni pregled: Pi API ovdje nije aktivan.",
    "entries.error": "Unosi se trenutno ne mogu učitati.",
    "entries.empty": "Nema unosa za prikaz.",
    "legal.aria": "Pravno",
    "legal.imprint": "Impressum",
    "legal.privacy": "Privatnost",
    "legal.dispute": "Rješavanje sporova",
    "comment.needText": "Najprije napiši kratak komentar.",
    "comment.needConsent": "Najprije potvrdi privolu.",
    "comment.localPreview": "Lokalni prototip: ništa nije poslano na Pi.",
    "comment.localEntry": "Lokalni prototip: primjer unosa prikazan je samo ovdje.",
    "comment.sending": "Šaljem ...",
    "comment.thanksEmail": "Hvala. Provjeri e-mail za potvrdu.",
    "comment.thanks": "Hvala. Tvoj komentar je spremljen.",
    "comment.failed": "Slanje nije uspjelo: {message}",
    "day.monday.short": "Pon",
    "day.tuesday.short": "Uto",
    "day.wednesday.short": "Sri",
    "day.thursday.short": "Čet",
    "day.friday.short": "Pet",
    "day.saturday.short": "Sub",
    "day.sunday.short": "Ned",
    "day.monday.long": "Ponedjeljak",
    "day.tuesday.long": "Utorak",
    "day.wednesday.long": "Srijeda",
    "day.thursday.long": "Četvrtak",
    "day.friday.long": "Petak",
    "day.saturday.long": "Subota",
    "day.sunday.long": "Nedjelja"
  }
});

const SHOW_DESCRIPTION_I18N = {
  en: {
    "13_global_noon": "A colorful midday block with rhythmic variety, international influences, and a constant sense of musical motion.",
    "pure_metal": "Different facets of metal at their finest: direct, powerful, and built for full-volume listening.",
    "11_open_road_country": "Earthy songs, clear melodies, and close storytelling. Country fits perfectly into an open, bright morning.",
    "01_electronic_depths": "Ten electronic pieces between depth, restraint, and wide sonic space, made for listeners who want to listen closely.",
    "14_northern_skies": "Guitars, attitude, and lightness. An afternoon indie block that lifts rather than weighs down.",
    "08_morning_soul": "Warmth, groove, and voice: an elegant start to the morning with classic and modern soul energy.",
    "18_granuaile_the_sea_and_the_crown": "A musical story about Grace O'Malley, seafarer, power broker, and strategist in 16th-century Ireland.",
    "20_blue_structures_eine_reise_durch_den_jazz": "One hour of jazz beyond clichés, moving from cool night spaces through rhythmic energy to experimental edges and clear forms.",
    "17_blues_at_five": "A journey through many faces of the blues, from dusty Delta roots and electric Chicago sound to soul, swamp, and modern noir.",
    "07_kingston_skies_reggae": "Kingston Skies moves through warm roots, spiritual depth, lovers rock, dub, and urban reggae fusion.",
    "golden_days_neon_nights": "A musical trip through the shine, freedom, romance, and future fever of the 70s and 80s, newly shaped in that pop spirit.",
    "rap_no_peace_in_the_signal": "Ten political rap tracks about war, fear, power, rent, borders, propaganda, and resistance.",
    "balkan_disco": "Croatian hooks, racing brass, and club beats until dawn. AI Radio dances like there is no closing time.",
    "r_b_velvet_after_midnight": "An elegant nocturnal R&B journey through neon light, rain, late conversations, and urban melancholy.",
    "saxophone_tunes": "An instrumental journey through the many faces of the saxophone, from classical elegance to jazz, funk, Balkan brass, and electronic spaces.",
    "chanson_lectrique": "French songs between tenderness, attitude, and shadow."
  },
  fr: {
    "13_global_noon": "Un bloc de midi coloré, avec diversité rythmique, influences internationales et mouvement musical constant.",
    "pure_metal": "Différentes facettes du metal au meilleur niveau : directes, puissantes et faites pour être écoutées fort.",
    "11_open_road_country": "Des chansons terriennes, des mélodies claires et une narration proche. La country ouvre parfaitement la matinée.",
    "01_electronic_depths": "Dix pièces électroniques entre profondeur, retenue et vastes espaces sonores, pour une écoute attentive.",
    "14_northern_skies": "Guitares, attitude et légèreté. Un bloc indie d'après-midi qui porte au lieu d'alourdir.",
    "08_morning_soul": "Chaleur, groove et voix : un début de matinée élégant entre soul classique et énergie moderne.",
    "18_granuaile_the_sea_and_the_crown": "Une histoire musicale autour de Grace O'Malley, navigatrice, figure de pouvoir et stratège dans l'Irlande du XVIe siècle.",
    "20_blue_structures_eine_reise_durch_den_jazz": "Une heure de jazz au-delà des clichés, entre espaces nocturnes, énergie rythmique, zones expérimentales et formes claires.",
    "17_blues_at_five": "Un voyage à travers les visages du blues, du Delta poussiéreux au son électrique de Chicago, jusqu'à la soul, au swamp et au noir moderne.",
    "07_kingston_skies_reggae": "Kingston Skies traverse roots chaleureux, profondeur spirituelle, lovers rock, dub et reggae fusion urbain.",
    "golden_days_neon_nights": "Un voyage musical dans l'éclat, la liberté, la romance et l'élan futuriste des années 70 et 80.",
    "rap_no_peace_in_the_signal": "Dix titres de rap politique sur la guerre, la peur, le pouvoir, les loyers, les frontières, la propagande et la résistance.",
    "balkan_disco": "Hooks croates, cuivres lancés à pleine vitesse et beats de club jusqu'à l'aube. AI Radio danse sans couvre-feu.",
    "r_b_velvet_after_midnight": "Un élégant voyage R&B nocturne entre néons, pluie, conversations tardives et mélancolie urbaine.",
    "saxophone_tunes": "Un voyage instrumental à travers les visages du saxophone, de l'élégance classique au jazz, au funk, aux cuivres balkaniques et aux espaces électroniques.",
    "chanson_lectrique": "Des chansons françaises entre tendresse, attitude et ombre."
  },
  es: {
    "13_global_noon": "Un bloque de mediodía colorido con variedad rítmica, influencias internacionales y movimiento musical constante.",
    "pure_metal": "Distintas facetas del metal en estado puro: directas, potentes y pensadas para escucharse fuerte.",
    "11_open_road_country": "Canciones terrenales, melodías claras y cercanía narrativa. El country encaja perfectamente en una mañana abierta y luminosa.",
    "01_electronic_depths": "Diez piezas electrónicas entre profundidad, contención y amplitud sonora, para oyentes que quieren escuchar de verdad.",
    "14_northern_skies": "Guitarras, actitud y ligereza. Un bloque indie de tarde que sostiene sin pesar.",
    "08_morning_soul": "Calidez, groove y voz: un comienzo elegante de la mañana con energía soul clásica y moderna.",
    "18_granuaile_the_sea_and_the_crown": "Una historia musical sobre Grace O'Malley, navegante, figura de poder y estratega en la Irlanda del siglo XVI.",
    "20_blue_structures_eine_reise_durch_den_jazz": "Una hora de jazz más allá de los clichés, entre espacios nocturnos, energía rítmica, bordes experimentales y formas claras.",
    "17_blues_at_five": "Un viaje por muchas caras del blues, del Delta polvoriento al sonido eléctrico de Chicago, soul, swamp y noir moderno.",
    "07_kingston_skies_reggae": "Kingston Skies recorre roots cálido, profundidad espiritual, lovers rock, dub y reggae fusion urbano.",
    "golden_days_neon_nights": "Un viaje musical por el brillo, la libertad, el romance y el futuro de los años 70 y 80.",
    "rap_no_peace_in_the_signal": "Diez tracks de rap político sobre guerra, miedo, poder, alquileres, fronteras, propaganda y resistencia.",
    "balkan_disco": "Hooks croatas, metales veloces y beats de club hasta el amanecer. AI Radio baila como si no hubiera cierre.",
    "r_b_velvet_after_midnight": "Un elegante viaje nocturno de R&B entre neón, lluvia, conversaciones tardías y melancolía urbana.",
    "saxophone_tunes": "Un viaje instrumental por los muchos rostros del saxofón, de la elegancia clásica al jazz, funk, brass balcánico y espacios electrónicos.",
    "chanson_lectrique": "Canciones francesas entre ternura, actitud y sombra."
  },
  it: {
    "13_global_noon": "Un blocco di mezzogiorno colorato, con varietà ritmica, influenze internazionali e movimento musicale continuo.",
    "pure_metal": "Diverse facce del metal al meglio: dirette, potenti e pensate per l'ascolto ad alto volume.",
    "11_open_road_country": "Brani terreni, melodie limpide e narrazione vicina. Il country apre la mattina con luce e spazio.",
    "01_electronic_depths": "Dieci brani elettronici tra profondità, riduzione e ampiezza sonora, per chi vuole ascoltare davvero.",
    "14_northern_skies": "Chitarre, carattere e leggerezza. Un blocco indie pomeridiano che sostiene senza appesantire.",
    "08_morning_soul": "Calore, groove e voce: un inizio elegante di mattina con energia soul classica e moderna.",
    "18_granuaile_the_sea_and_the_crown": "Una storia musicale su Grace O'Malley, navigatrice, figura di potere e stratega nell'Irlanda del XVI secolo.",
    "20_blue_structures_eine_reise_durch_den_jazz": "Un'ora di jazz oltre i cliché, tra spazi notturni, energia ritmica, confini sperimentali e forme nitide.",
    "17_blues_at_five": "Un viaggio tra molte facce del blues, dal Delta polveroso al suono elettrico di Chicago, soul, swamp e noir moderno.",
    "07_kingston_skies_reggae": "Kingston Skies attraversa roots caldo, profondità spirituale, lovers rock, dub e reggae fusion urbano.",
    "golden_days_neon_nights": "Un viaggio musicale nello splendore, nella libertà, nel romanticismo e nella voglia di futuro degli anni 70 e 80.",
    "rap_no_peace_in_the_signal": "Dieci tracce rap politiche su guerra, paura, potere, affitti, confini, propaganda e resistenza.",
    "balkan_disco": "Hook croati, ottoni in corsa e beat da club fino all'alba. AI Radio balla come se non esistesse chiusura.",
    "r_b_velvet_after_midnight": "Un elegante viaggio R&B notturno tra neon, pioggia, conversazioni tarde e malinconia urbana.",
    "saxophone_tunes": "Un viaggio strumentale tra i molti volti del saxofono, dall'eleganza classica a jazz, funk, brass balcanico e spazi elettronici.",
    "chanson_lectrique": "Canzoni francesi tra tenerezza, carattere e ombra."
  },
  nl: {
    "13_global_noon": "Een kleurrijk middagblok met ritmische variatie, internationale invloeden en voortdurende muzikale beweging.",
    "pure_metal": "Verschillende facetten van metal op hun best: direct, krachtig en gemaakt voor vol volume.",
    "11_open_road_country": "Aardse songs, heldere melodieën en verhalende nabijheid. Country past perfect in een open, lichte ochtend.",
    "01_electronic_depths": "Tien elektronische stukken tussen diepte, reductie en ruim geluid, voor luisteraars die echt willen luisteren.",
    "14_northern_skies": "Gitaren, houding en lichtheid. Een indieblok voor de middag dat draagt zonder zwaar te worden.",
    "08_morning_soul": "Warmte, groove en stem: een elegante ochtendstart met klassieke en moderne soulenergie.",
    "18_granuaile_the_sea_and_the_crown": "Een muzikaal verhaal over Grace O'Malley, zeevaarder, machtsfiguur en strateeg in het Ierland van de zestiende eeuw.",
    "20_blue_structures_eine_reise_durch_den_jazz": "Een uur jazz voorbij clichés, van koele nachtruimtes via ritmische energie naar experimentele randen en heldere vormen.",
    "17_blues_at_five": "Een reis door vele gezichten van de blues, van stoffige Delta-roots en elektrische Chicago-sound tot soul, swamp en modern noir.",
    "07_kingston_skies_reggae": "Kingston Skies beweegt door warme roots, spirituele diepte, lovers rock, dub en urban reggae fusion.",
    "golden_days_neon_nights": "Een muzikale reis door glans, vrijheid, romantiek en toekomstdrang van de jaren 70 en 80.",
    "rap_no_peace_in_the_signal": "Tien politieke raptracks over oorlog, angst, macht, huur, grenzen, propaganda en verzet.",
    "balkan_disco": "Kroatische hooks, razende blazers en clubbeats tot de ochtend. AI Radio danst alsof er geen sluitingstijd is.",
    "r_b_velvet_after_midnight": "Een elegante nachtelijke R&B-reis door neonlicht, regen, late gesprekken en stedelijke melancholie.",
    "saxophone_tunes": "Een instrumentale reis door de vele gezichten van de saxofoon, van klassieke elegantie tot jazz, funk, Balkan-brass en elektronische ruimtes.",
    "chanson_lectrique": "Franse liederen tussen tederheid, houding en schaduw."
  },
  pl: {
    "13_global_noon": "Kolorowy blok południowy z rytmiczną różnorodnością, międzynarodowymi wpływami i muzycznym ruchem.",
    "pure_metal": "Różne oblicza metalu w najlepszym wydaniu: bezpośrednie, mocne i stworzone do głośnego słuchania.",
    "11_open_road_country": "Ziemiste piosenki, jasne melodie i bliska narracja. Country świetnie pasuje do otwartego, jasnego poranka.",
    "01_electronic_depths": "Dziesięć elektronicznych utworów między głębią, redukcją i szeroką przestrzenią dźwięku.",
    "14_northern_skies": "Gitary, postawa i lekkość. Popołudniowy blok indie, który niesie, zamiast przygniatać.",
    "08_morning_soul": "Ciepło, groove i głos: elegancki początek poranka z klasyczną i nowoczesną energią soulu.",
    "18_granuaile_the_sea_and_the_crown": "Muzyczna opowieść o Grace O'Malley, żeglarce, figurze władzy i strategini w Irlandii XVI wieku.",
    "20_blue_structures_eine_reise_durch_den_jazz": "Godzina jazzu poza kliszami, od chłodnych nocnych przestrzeni po rytmiczną energię, eksperyment i klarowne formy.",
    "17_blues_at_five": "Podróż przez wiele twarzy bluesa, od zakurzonego Delta bluesa i elektrycznego Chicago po soul, swamp i nowoczesny noir.",
    "07_kingston_skies_reggae": "Kingston Skies prowadzi przez ciepłe roots, duchową głębię, lovers rock, dub i miejską reggae fusion.",
    "golden_days_neon_nights": "Muzyczna podróż przez blask, wolność, romantyzm i przyszłościowy zapał lat 70. i 80.",
    "rap_no_peace_in_the_signal": "Dziesięć politycznych utworów rapowych o wojnie, strachu, władzy, czynszach, granicach, propagandzie i oporze.",
    "balkan_disco": "Chorwackie hooki, pędzące dęciaki i klubowe beaty do świtu. AI Radio tańczy, jakby nie było zamknięcia.",
    "r_b_velvet_after_midnight": "Elegancka nocna podróż R&B przez neon, deszcz, późne rozmowy i miejską melancholię.",
    "saxophone_tunes": "Instrumentalna podróż przez wiele twarzy saksofonu, od klasycznej elegancji po jazz, funk, bałkańskie dęciaki i elektronikę.",
    "chanson_lectrique": "Francuskie piosenki między czułością, postawą i cieniem."
  },
  pt: {
    "13_global_noon": "Um bloco colorido ao meio-dia com variedade rítmica, influências internacionais e movimento musical constante.",
    "pure_metal": "Diferentes faces do metal no seu melhor: diretas, fortes e feitas para ouvir alto.",
    "11_open_road_country": "Canções terrosas, melodias claras e narrativa próxima. O country encaixa perfeitamente numa manhã aberta e luminosa.",
    "01_electronic_depths": "Dez peças eletrónicas entre profundidade, contenção e espaço sonoro amplo.",
    "14_northern_skies": "Guitarras, atitude e leveza. Um bloco indie de tarde que sustenta sem pesar.",
    "08_morning_soul": "Calor, groove e voz: um começo elegante de manhã com energia soul clássica e moderna.",
    "18_granuaile_the_sea_and_the_crown": "Uma história musical sobre Grace O'Malley, navegadora, figura de poder e estratega na Irlanda do século XVI.",
    "20_blue_structures_eine_reise_durch_den_jazz": "Uma hora de jazz para lá dos clichés, entre espaços noturnos, energia rítmica, margens experimentais e formas claras.",
    "17_blues_at_five": "Uma viagem por muitas faces do blues, do Delta poeirento e do som elétrico de Chicago ao soul, swamp e noir moderno.",
    "07_kingston_skies_reggae": "Kingston Skies passa por roots quente, profundidade espiritual, lovers rock, dub e reggae fusion urbano.",
    "golden_days_neon_nights": "Uma viagem musical pelo brilho, liberdade, romance e desejo de futuro dos anos 70 e 80.",
    "rap_no_peace_in_the_signal": "Dez faixas de rap político sobre guerra, medo, poder, rendas, fronteiras, propaganda e resistência.",
    "balkan_disco": "Hooks croatas, sopros acelerados e batidas de clube até ao amanhecer. AI Radio dança como se não houvesse hora de fechar.",
    "r_b_velvet_after_midnight": "Uma elegante viagem R&B noturna por néon, chuva, conversas tardias e melancolia urbana.",
    "saxophone_tunes": "Uma viagem instrumental pelas muitas faces do saxofone, da elegância clássica ao jazz, funk, metais balcânicos e espaços eletrónicos.",
    "chanson_lectrique": "Canções francesas entre ternura, atitude e sombra."
  },
  sv: {
    "13_global_noon": "Ett färgstarkt middagsblock med rytmisk bredd, internationella influenser och ständig musikalisk rörelse.",
    "pure_metal": "Olika sidor av metal när den är som bäst: direkt, kraftfull och gjord för hög volym.",
    "11_open_road_country": "Jordnära sånger, tydliga melodier och nära berättande. Country passar perfekt i en öppen, ljus morgon.",
    "01_electronic_depths": "Tio elektroniska stycken mellan djup, reduktion och vidsträckta ljudrum.",
    "14_northern_skies": "Gitarrer, attityd och lätthet. Ett indieblock för eftermiddagen som lyfter utan att tynga.",
    "08_morning_soul": "Värme, groove och röst: en elegant morgonstart med klassisk och modern soulenergi.",
    "18_granuaile_the_sea_and_the_crown": "En musikalisk berättelse om Grace O'Malley, sjöfarare, maktfigur och strateg i 1500-talets Irland.",
    "20_blue_structures_eine_reise_durch_den_jazz": "En timme jazz bortom klichéer, från svala nattliga rum via rytmisk energi till experimentella kanter och klara former.",
    "17_blues_at_five": "En resa genom bluesens många ansikten, från dammig Delta och elektriskt Chicago-sound till soul, swamp och modern noir.",
    "07_kingston_skies_reggae": "Kingston Skies rör sig genom varma roots, andligt djup, lovers rock, dub och urban reggae fusion.",
    "golden_days_neon_nights": "En musikalisk resa genom glans, frihet, romantik och framtidslust från 70- och 80-talet.",
    "rap_no_peace_in_the_signal": "Tio politiska rapspår om krig, rädsla, makt, hyror, gränser, propaganda och motstånd.",
    "balkan_disco": "Kroatiska hooks, rusande blås och klubbbeats till gryningen. AI Radio dansar som om stängningstid inte fanns.",
    "r_b_velvet_after_midnight": "En elegant nattlig R&B-resa genom neonljus, regn, sena samtal och urban melankoli.",
    "saxophone_tunes": "En instrumental resa genom saxofonens många ansikten, från klassisk elegans till jazz, funk, Balkan-brass och elektroniska rum.",
    "chanson_lectrique": "Franska sånger mellan ömhet, attityd och skugga."
  },
  da: {
    "13_global_noon": "Et farverigt middagsblok med rytmisk variation, internationale påvirkninger og konstant musikalsk bevægelse.",
    "pure_metal": "Forskellige facetter af metal, når det er bedst: direkte, kraftfuldt og skabt til høj volumen.",
    "11_open_road_country": "Jordnære sange, klare melodier og tæt fortælling. Country passer perfekt til en åben, lys formiddag.",
    "01_electronic_depths": "Ti elektroniske stykker mellem dybde, reduktion og brede klangrum.",
    "14_northern_skies": "Guitarer, attitude og lethed. Et indieblok til eftermiddagen, der løfter uden at tynge.",
    "08_morning_soul": "Varme, groove og stemme: en elegant start på morgenen med klassisk og moderne soulenergi.",
    "18_granuaile_the_sea_and_the_crown": "En musikalsk historie om Grace O'Malley, søfarer, magtfigur og strateg i 1500-tallets Irland.",
    "20_blue_structures_eine_reise_durch_den_jazz": "En time jazz uden klichéer, fra kølige natrum via rytmisk energi til eksperimentelle kanter og klare former.",
    "17_blues_at_five": "En rejse gennem bluesens mange ansigter, fra støvet Delta og elektrisk Chicago-lyd til soul, swamp og moderne noir.",
    "07_kingston_skies_reggae": "Kingston Skies bevæger sig gennem varme roots, åndelig dybde, lovers rock, dub og urban reggae fusion.",
    "golden_days_neon_nights": "En musikalsk rejse gennem glans, frihed, romantik og fremtidstrang fra 70'erne og 80'erne.",
    "rap_no_peace_in_the_signal": "Ti politiske rapnumre om krig, frygt, magt, husleje, grænser, propaganda og modstand.",
    "balkan_disco": "Kroatiske hooks, rasende blæsere og clubbeats til daggry. AI Radio danser, som om lukketid ikke findes.",
    "r_b_velvet_after_midnight": "En elegant natlig R&B-rejse gennem neonlys, regn, sene samtaler og urban melankoli.",
    "saxophone_tunes": "En instrumental rejse gennem saxofonens mange ansigter, fra klassisk elegance til jazz, funk, Balkan-brass og elektroniske rum.",
    "chanson_lectrique": "Franske sange mellem ømhed, attitude og skygge."
  },
  hr: {
    "13_global_noon": "Šareni podnevni blok s ritmičkom raznolikošću, međunarodnim utjecajima i stalnim glazbenim pokretom.",
    "pure_metal": "Različita lica metala u najboljem izdanju: izravna, snažna i stvorena za glasno slušanje.",
    "11_open_road_country": "Zemljane pjesme, jasne melodije i blisko pripovijedanje. Country savršeno pristaje otvorenom, svijetlom jutru.",
    "01_electronic_depths": "Deset elektroničkih skladbi između dubine, redukcije i širokog zvučnog prostora.",
    "14_northern_skies": "Gitare, stav i lakoća. Poslijepodnevni indie blok koji nosi, umjesto da opterećuje.",
    "08_morning_soul": "Toplina, groove i glas: elegantan početak jutra s klasičnom i modernom soul energijom.",
    "18_granuaile_the_sea_and_the_crown": "Glazbena priča o Grace O'Malley, pomorkinji, figuri moći i strateginji u Irskoj 16. stoljeća.",
    "20_blue_structures_eine_reise_durch_den_jazz": "Sat jazza izvan klišeja, od hladnih noćnih prostora preko ritmičke energije do eksperimentalnih rubova i jasnih formi.",
    "17_blues_at_five": "Putovanje kroz mnoga lica bluesa, od prašnjavog Delte i električnog Chicaga do soula, swampa i modernog noira.",
    "07_kingston_skies_reggae": "Kingston Skies vodi kroz topli roots, duhovnu dubinu, lovers rock, dub i urbani reggae fusion.",
    "golden_days_neon_nights": "Glazbeno putovanje kroz sjaj, slobodu, romantiku i budućnosni zanos 70-ih i 80-ih.",
    "rap_no_peace_in_the_signal": "Deset političkih rap pjesama o ratu, strahu, moći, najamnini, granicama, propagandi i otporu.",
    "balkan_disco": "Hrvatski hookovi, jureći limeni puhači i club beatovi do zore. AI Radio pleše kao da nema fajrunta.",
    "r_b_velvet_after_midnight": "Elegantno noćno R&B putovanje kroz neon, kišu, kasne razgovore i urbanu melankoliju.",
    "saxophone_tunes": "Instrumentalno putovanje kroz mnoga lica saksofona, od klasične elegancije do jazza, funka, balkanskih puhača i elektronike.",
    "chanson_lectrique": "Francuske pjesme između nježnosti, stava i sjene."
  }
};

const app = document.querySelector("#app");
const state = {
  config: null,
  selectedDayId: null,
  selectedIndex: 0,
  showTable: false,
  isPlaying: false,
  volume: 0.82,
  comments: [],
  commentsLoaded: false,
  commentsVisible: false,
  commentsStatus: "",
  locale: getInitialLocale(),
  theme: getInitialTheme(),
  carouselDragProgress: 0,
  carouselAnimationFrame: 0,
  carouselReturnTimer: 0,
  carouselIsSpinning: false,
  carouselQueuedStep: 0,
  carouselQueuedScheduleReturn: false,
  playbackStarting: false,
  playbackRequested: false,
  playerLockedByOther: false,
  playerLockTimer: 0,
  playerLockWatchTimer: 0,
  tabId: createStreamSessionId(),
  streamRetryCount: 0,
  streamRetryTimer: 0,
  streamSessionId: "",
  nowPlaying: null,
  nowPlayingTimer: 0,
  lastPlaybackStartAttemptAt: 0,
  lastStreamRestartAt: 0,
  audioHandlersBound: false,
  mediaSessionKey: "",
  audio: new Audio(),
  sphere: null
};

const weekdayOrder = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
const PLAYER_LOCK_KEY = "ai-radio-active-player";
const PLAYER_LOCK_TTL_MS = 12000;
const PLAYER_LOCK_HEARTBEAT_MS = 3000;
const CAROUSEL_MIN_DRAG_PX = 52;
const CAROUSEL_DIRECTION_DRAG_UNITS = 0.24;
const CAROUSEL_VELOCITY_STEP_UNITS = 0.34;
const CAROUSEL_FAST_VELOCITY_UNITS = 0.72;
const CAROUSEL_MAX_THROW_STEPS = 3;
const TEXTBOOK_SHOW_BY_PROGRAM_SHOW = {
  "pure_metal": "02-a-chronicles-of-fire-and-steel",
  "11_open_road_country": "03-a-ai-radio-country-roads-collection",
  "14_northern_skies": "05-a-indie-reflections",
  "08_morning_soul": "06-a-soul-between-light-and-shadow",
  "18_granuaile_the_sea_and_the_crown": "07-a-granuaile-the-sea-and-the-crown",
  "20_blue_structures_eine_reise_durch_den_jazz": "08-a-blue-structures-eine-reise-durch-den-jazz",
  "17_blues_at_five": "09-a-blues-at-five",
  "07_kingston_skies_reggae": "11-a-kingston-skies",
  "golden_days_neon_nights": "12-a-golden-days-neon-nights",
  "rap_no_peace_in_the_signal": "13-a-political-rap-special",
  "balkan_disco": "14-a-balkan-disco-de",
  "r_b_velvet_after_midnight": "15-a-velvet-after-midnight",
  "saxophone_tunes": "16-a-saxophone-tunes",
  "chanson_lectrique": "17-a-chanson-lectrique",
  "13_global_noon": "01-b-weltklang"
};

function getInitialLocale() {
  const saved = window.localStorage.getItem("ai-radio-locale");
  if (I18N[saved]) return saved;
  const browserLocale = (navigator.language || "de").slice(0, 2);
  return I18N[browserLocale] ? browserLocale : "de";
}

function t(key, params = {}) {
  const dictionary = I18N[state.locale] || I18N.de;
  const template = dictionary[key] || I18N.de[key] || key;
  return template.replace(/\{(\w+)\}/g, (_, name) => params[name] ?? "");
}

function getDayName(dayId) {
  return t(`day.${dayId}.long`);
}

function getDayShort(dayId) {
  return t(`day.${dayId}.short`);
}

function getShowDescription(slot) {
  if (!slot?.show) return "";
  return SHOW_DESCRIPTION_I18N[state.locale]?.[slot.showId] || slot.show.description || "";
}

init();

async function init() {
  const response = await fetch("/data/program.json", { cache: "no-store" });
  state.config = await response.json();
  state.commentsStatus = t("entries.notLoaded");
  state.selectedDayId = weekdayOrder[new Date().getDay()];
  state.selectedIndex = getCurrentSlotIndex();
  state.streamSessionId = createStreamSessionId();
  setupAudioEventHandlers();
  setupPlayerLock();
  applyTheme();
  render();
  refreshNowPlaying();
  startTicks();
}

function render() {
  document.documentElement.lang = state.locale;
  const { station } = state.config;
  const activeSlot = getActiveSlot();
  const nextSlot = getNextSlot();
  const selectedDay = getSelectedDay();
  const selectedSlots = getSlotsForDay(selectedDay.id);
  const selectedSlot = selectedSlots[state.selectedIndex] ?? activeSlot;
  const selectedShow = selectedSlot.show;

  app.innerHTML = `
    <header class="site-header">
      <a class="brand" href="#top" aria-label="${station.name}">
        <img src="/assets/img/ai-radio-icon.webp" alt="" decoding="async" />
        <span>${station.name}</span>
      </a>
      <nav class="nav-links" aria-label="Main navigation">
        <a href="#programm">${t("nav.program")}</a>
        <a href="#community">${t("nav.community")}</a>
        <a href="${station.podcastUrl}">${t("nav.podcast")}</a>
      </nav>
      <div class="header-actions">
        ${renderLanguageSwitcher()}
        <button class="theme-action" id="themeToggle" type="button" aria-pressed="${state.theme === "light"}">
          <i data-lucide="${state.theme === "light" ? "moon" : "sun"}"></i>
          <span>${state.theme === "light" ? t("theme.dark") : t("theme.light")}</span>
        </button>
      </div>
    </header>

    <main id="top">
      <section class="hero-band">
        <div class="hero-inner">
          <div class="hero-copy">
            <p class="kicker"><i data-lucide="radio"></i> ${t("hero.kicker")}</p>
            <h1>Mike's AI Radio</h1>
            <p class="lead">${t("hero.lead")}</p>

            <div class="player-panel" aria-label="${t("hero.playerAria")}">
              <img class="now-show-thumb" id="heroNowCover" src="${activeSlot.show.cover}" alt="" decoding="async" />
              <div>
                <span class="panel-label">${t("hero.now")}</span>
                <strong id="heroNowTitle">${escapeHtml(activeSlot.show.shortTitle)}</strong>
                <small id="heroNowMeta">${formatHourRange(activeSlot.hour)} · ${escapeHtml(activeSlot.show.subtitle)}</small>
                <small class="now-track" id="heroNowTrack">${escapeHtml(getNowPlayingText())}</small>
              </div>
              <div class="player-actions">
                <button class="primary-action" id="playToggle" type="button" ${state.playbackStarting ? "disabled" : ""}>
                  <i data-lucide="${state.isPlaying ? "pause" : "play"}"></i>
                  <span>${getPlaybackButtonText()}</span>
                </button>
              </div>
            </div>

            <div class="next-show-strip" aria-label="${t("hero.nextAria")}">
              <img id="nextShowCover" src="${nextSlot.show.cover}" alt="" loading="lazy" decoding="async" />
              <div>
                <span>${t("hero.next")}</span>
                <strong id="nextShowTitle">${escapeHtml(nextSlot.show.shortTitle)}</strong>
                <small id="nextShowTime">${formatHourRange(nextSlot.hour)} · ${escapeHtml(nextSlot.show.subtitle)}</small>
              </div>
            </div>
            <div class="media-links" aria-label="${t("hero.mediaAria")}">
              <a class="media-link podcast-link" href="${station.podcastUrl}">
                <i data-lucide="headphones"></i>
                <span>
                  <strong>${t("nav.podcast")}</strong>
                  <small>${t("hero.podcastText")}</small>
                </span>
              </a>
              <a class="media-link textbook-link" id="textbookLink" href="${getTextbookUrl(activeSlot)}" target="_blank" rel="noopener">
                <i data-lucide="book-open"></i>
                <span>
                  <strong>Textbooks</strong>
                  <small>${t("hero.textbooksText")}</small>
                </span>
              </a>
            </div>
          </div>

          <div class="hero-stage" aria-label="${t("hero.sphereAria")}">
            <div id="sphereMount" class="sphere-mount"></div>
          </div>
        </div>
      </section>

      <section class="program-band" id="programm">
        <div class="section-heading">
          <div>
            <p class="kicker"><i data-lucide="calendar-days"></i> ${t("program.kicker")}</p>
            <h2>${t("program.title")}</h2>
          </div>
          <button class="secondary-action" id="tableToggle" type="button">
            <i data-lucide="${state.showTable ? "images" : "table-2"}"></i>
            <span>${state.showTable ? t("program.showCarousel") : t("program.showTable")}</span>
          </button>
        </div>

        <div class="day-tabs" role="tablist" aria-label="${t("program.weekdaysAria")}">
          ${state.config.weekdays.map((day) => `
            <button class="day-tab ${day.id === state.selectedDayId ? "is-active" : ""}" type="button" data-day="${day.id}" role="tab" aria-selected="${day.id === state.selectedDayId}">
              <span>${escapeHtml(getDayShort(day.id))}</span>
              <small>${escapeHtml(getDayName(day.id))}</small>
            </button>
          `).join("")}
        </div>

        <div class="program-focus">
          <button class="icon-action carousel-nav" id="prevShow" type="button" aria-label="${t("program.prev")}">
            <i data-lucide="chevron-left"></i>
          </button>
          <div class="carousel-shell" id="carouselShell" tabindex="0" aria-label="${t("program.carouselAria")}">
            ${renderCarousel()}
          </div>
          <button class="icon-action carousel-nav" id="nextShow" type="button" aria-label="${t("program.next")}">
            <i data-lucide="chevron-right"></i>
          </button>
        </div>

        <div class="selected-show">
          <img src="${selectedShow.cover}" alt="" loading="lazy" decoding="async" />
          <div>
            <span>${escapeHtml(getDayName(selectedDay.id))} · ${formatHourRange(selectedSlots[state.selectedIndex]?.hour ?? activeSlot.hour)}</span>
            <h3>${escapeHtml(selectedShow.title)}</h3>
            <p>${escapeHtml(getShowDescription(selectedSlot))}</p>
          </div>
        </div>

        <div class="schedule-wrap ${state.showTable ? "is-visible" : ""}" id="scheduleWrap">
          <div class="schedule-header">
            <h3>${escapeHtml(t("program.scheduleTitle", { day: getDayName(state.selectedDayId) }))}</h3>
          </div>
          <div class="schedule-grid">
            ${selectedSlots.map((slot, index) => `
              <button class="schedule-row ${isActiveSlot(slot) ? "is-live" : ""}" type="button" data-index="${index}">
                <time>${String(slot.hour).padStart(2, "0")}:00</time>
                <img src="${slot.show.cover}" alt="" loading="lazy" decoding="async" />
                <span>${escapeHtml(slot.show.shortTitle)}</span>
                ${isActiveSlot(slot) ? `<strong>${t("live")}</strong>` : ""}
              </button>
            `).join("")}
          </div>
        </div>
      </section>

      <section class="listen-band">
        <div class="listen-grid">
          <article class="stat-tile">
            <span>${t("stats.stream")}</span>
            <strong id="streamStatus">${getStreamStatusText()}</strong>
          </article>
          <article class="stat-tile">
            <span>${t("stats.nowPlaying")}</span>
            <strong id="nowPlayingTitle">${escapeHtml(getNowPlayingText())}</strong>
          </article>
          <article class="stat-tile">
            <span>${t("stats.time")}</span>
            <strong id="clockValue">--:--:--</strong>
          </article>
        </div>
      </section>

      <section class="community-band" id="community">
        <div class="community-layout">
          <div class="community-copy">
            <p class="kicker"><i data-lucide="message-circle"></i> ${t("community.kicker")}</p>
            <h2>${t("community.title")}</h2>
            <p>${t("community.copy")}</p>
          </div>
          <form class="comment-form" id="commentForm">
            <div class="form-row">
              <label for="commentAuthor">${t("form.name")}</label>
              <input id="commentAuthor" name="author" maxlength="24" placeholder="${t("form.guest")}" autocomplete="name" />
            </div>
            <div class="form-row">
              <label for="commentEmail">${t("form.email")}</label>
              <input id="commentEmail" name="email" type="email" maxlength="254" placeholder="name@example.com" autocomplete="email" />
            </div>
            <div class="form-row">
              <label for="commentText">${t("form.comment")}</label>
              <textarea id="commentText" name="comment" maxlength="280" placeholder="${t("form.commentPlaceholder")}"></textarea>
            </div>
            <label class="consent-line" for="privacyConsent">
              <input id="privacyConsent" type="checkbox" />
              <span>${t("form.consent")} <a href="/datenschutz.html" target="_blank" rel="noopener">${t("form.privacy")}</a>.</span>
            </label>
            <div class="form-footer">
              <span id="commentStatus">${t("form.initialStatus")}</span>
              <button class="primary-action" id="postComment" type="submit">
                <i data-lucide="mail"></i>
                <span>${t("form.submit")}</span>
              </button>
            </div>
          </form>
          <div class="entry-panel">
            <button class="secondary-action entry-toggle" id="entryListToggle" type="button" aria-expanded="${state.commentsVisible}">
              <i data-lucide="message-circle"></i>
              <span>${state.commentsVisible ? t("entries.hide") : t("entries.show")}</span>
            </button>
            <div class="entry-list-wrap ${state.commentsVisible ? "is-visible" : ""}" id="entryListWrap">
              <p class="entry-status" id="entryListStatus">${escapeHtml(state.commentsStatus)}</p>
              <ul class="entry-list" id="entryList">
                ${renderCommentEntries()}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>

    <footer class="site-footer">
      <span>Mike's AI Radio ${new Date().getFullYear()}</span>
      <nav aria-label="${t("legal.aria")}">
        <a href="/impressum.html">${t("legal.imprint")}</a>
        <a href="/datenschutz.html">${t("legal.privacy")}</a>
        <a href="/verbraucherstreitbeilegung.html">${t("legal.dispute")}</a>
      </nav>
    </footer>
  `;

  createIcons({ icons: iconSet });
  bindEvents();
  syncAudioElement();
  updateMediaSession();
  updateClock();
  state.sphere?.dispose?.();
  state.sphere = initHeroSphere(document.querySelector("#sphereMount"), getActiveSlot().show.cover);
}

function renderLanguageSwitcher() {
  const languages = [
    ["de", "Deutsch", "flag-de"],
    ["en", "English", "flag-en"],
    ["fr", "Français", "flag-fr"],
    ["es", "Español", "flag-es"],
    ["it", "Italiano", "flag-it"],
    ["nl", "Nederlands", "flag-nl"],
    ["pl", "Polski", "flag-pl"],
    ["pt", "Português", "flag-pt"],
    ["sv", "Svenska", "flag-sv"],
    ["da", "Dansk", "flag-da"],
    ["hr", "Hrvatski", "flag-hr"]
  ];

  return `
    <nav class="language-switcher" aria-label="${t("language.aria")}">
      ${languages.map(([locale, label, flagClass]) => `
        <button
          class="language-btn ${state.locale === locale ? "is-active" : ""}"
          type="button"
          data-locale="${locale}"
          aria-label="${label}"
          aria-pressed="${state.locale === locale}"
          title="${label}"
        >
          <span class="flag ${flagClass}" aria-hidden="true"></span>
        </button>
      `).join("")}
    </nav>
  `;
}

function renderCarousel() {
  const entries = getCarouselEntries();
  const selectedGlobalIndex = getSelectedCarouselGlobalIndex();
  return entries.map((entry) => {
    const { slot } = entry;
    const relative = getRelativePosition(entry.globalIndex, selectedGlobalIndex, entries.length) + state.carouselDragProgress;
    const isSelected = entry.dayId === state.selectedDayId && entry.index === state.selectedIndex;
    const isLive = isActiveDaySlot(entry.dayId, slot);
    const shouldLoadImage = Math.abs(relative) <= 3.4 || isSelected || isLive;
    const pose = getCarouselPose(relative);
    const style = [
      `--x:${pose.x}`,
      `--y:${pose.y}`,
      `--z-offset:${pose.zOffset}`,
      `--rotate-y:${pose.rotateY}`,
      `--scale:${pose.scale}`,
      `--opacity:${pose.opacity}`,
      `--saturation:${pose.saturation}`,
      `--z:${pose.zIndex}`
    ].join(";");

    return `
      <button class="show-card ${isSelected ? "is-selected" : ""} ${isLive ? "is-live" : ""}" type="button" data-day="${entry.dayId}" data-index="${entry.index}" data-global="${entry.globalIndex}" style="${style}">
        ${shouldLoadImage ? `<img src="${slot.show.cover}" alt="" draggable="false" loading="lazy" decoding="async" />` : ""}
        <span class="show-time">${String(slot.hour).padStart(2, "0")}:00</span>
        ${isLive ? `<span class="live-chip">${t("live")}</span>` : ""}
        <span class="show-text">
          <strong>${escapeHtml(slot.show.shortTitle)}</strong>
          <small>${escapeHtml(slot.show.subtitle)}</small>
        </span>
      </button>
    `;
  }).join("");
}

function bindEvents() {
  document.querySelector("#playToggle")?.addEventListener("click", togglePlayback);
  document.querySelector("#themeToggle")?.addEventListener("click", toggleTheme);
  document.querySelectorAll("[data-locale]").forEach((button) => {
    button.addEventListener("click", () => {
      const locale = button.dataset.locale;
      if (!I18N[locale] || locale === state.locale) return;
      const commentsWereNotLoaded = Object.values(I18N).some((dictionary) => state.commentsStatus === dictionary["entries.notLoaded"]);
      state.locale = locale;
      window.localStorage.setItem("ai-radio-locale", locale);
      if (commentsWereNotLoaded) {
        state.commentsStatus = t("entries.notLoaded");
      }
      render();
    });
  });

  document.querySelector("#tableToggle")?.addEventListener("click", () => {
    state.showTable = !state.showTable;
    render();
  });

  document.querySelectorAll(".day-tab[data-day]").forEach((button) => {
    button.addEventListener("click", () => {
      clearCarouselReturnTimer();
      state.carouselQueuedStep = 0;
      state.carouselQueuedScheduleReturn = false;
      state.selectedDayId = button.dataset.day;
      state.selectedIndex = state.selectedDayId === weekdayOrder[new Date().getDay()] ? getCurrentSlotIndex() : 0;
      render();
    });
  });

  document.querySelector("#prevShow")?.addEventListener("click", () => spinCarouselBy(-1, { scheduleReturn: true }));
  document.querySelector("#nextShow")?.addEventListener("click", () => spinCarouselBy(1, { scheduleReturn: true }));
  const carouselShell = document.querySelector("#carouselShell");
  carouselShell?.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") spinCarouselBy(-1, { scheduleReturn: true });
    if (event.key === "ArrowRight") spinCarouselBy(1, { scheduleReturn: true });
  });

  let dragStart = null;
  let dragCurrent = 0;
  let dragStartTime = 0;
  let lastDragX = 0;
  let lastDragTime = 0;
  let dragVelocity = 0;
  let didDrag = false;
  let dragFrame = 0;
  const paintCarousel = (progress) => {
    if (!carouselShell) return;
    const entries = getCarouselEntries();
    const selectedGlobalIndex = getSelectedCarouselGlobalIndex();
    for (const card of carouselShell.querySelectorAll(".show-card")) {
      const globalIndex = Number(card.dataset.global);
      const relative = getRelativePosition(globalIndex, selectedGlobalIndex, entries.length) + progress;
      const pose = getCarouselPose(relative);
      card.style.setProperty("--x", pose.x);
      card.style.setProperty("--y", pose.y);
      card.style.setProperty("--z-offset", pose.zOffset);
      card.style.setProperty("--rotate-y", pose.rotateY);
      card.style.setProperty("--scale", pose.scale);
      card.style.setProperty("--opacity", pose.opacity);
      card.style.setProperty("--saturation", pose.saturation);
      card.style.setProperty("--z", String(pose.zIndex));
      card.style.pointerEvents = Math.abs(relative) > 2.65 ? "none" : "";
    }
  };
  const applyCarouselDrag = (progress) => {
    window.cancelAnimationFrame(dragFrame);
    dragFrame = window.requestAnimationFrame(() => {
      paintCarousel(progress);
    });
  };
  carouselShell?.addEventListener("pointerdown", (event) => {
    window.cancelAnimationFrame(state.carouselAnimationFrame);
    clearCarouselReturnTimer();
    state.carouselIsSpinning = false;
    state.carouselQueuedStep = 0;
    state.carouselQueuedScheduleReturn = false;
    dragStart = event.clientX;
    dragCurrent = event.clientX;
    dragStartTime = event.timeStamp;
    lastDragX = event.clientX;
    lastDragTime = event.timeStamp;
    dragVelocity = 0;
    didDrag = false;
    state.carouselDragProgress = 0;
    carouselShell.classList.add("is-dragging");
    carouselShell.classList.remove("is-coasting", "is-spinning");
    carouselShell.setPointerCapture(event.pointerId);
  });
  carouselShell?.addEventListener("pointermove", (event) => {
    if (dragStart === null) return;
    dragCurrent = event.clientX;
    const delta = dragCurrent - dragStart;
    const elapsed = Math.max(1, event.timeStamp - lastDragTime);
    const instantVelocity = (event.clientX - lastDragX) / elapsed;
    dragVelocity = dragVelocity * 0.72 + instantVelocity * 0.28;
    lastDragX = event.clientX;
    lastDragTime = event.timeStamp;
    didDrag = didDrag || Math.abs(delta) > 8;
    const cardStep = Math.max(190, Math.min(260, carouselShell.clientWidth * 0.22));
    const progress = Math.max(-1.15, Math.min(1.15, delta / cardStep));
    state.carouselDragProgress = progress;
    applyCarouselDrag(progress);
  });
  carouselShell?.addEventListener("pointerup", (event) => {
    if (dragStart === null) return;
    const delta = event.clientX - dragStart;
    carouselShell.classList.remove("is-dragging");
    dragStart = null;
    const elapsed = Math.max(1, event.timeStamp - dragStartTime);
    const releaseVelocity = Math.abs(dragVelocity) > 0.01 ? dragVelocity : delta / elapsed;
    const cardStep = Math.max(190, Math.min(260, carouselShell.clientWidth * 0.22));
    const dragUnits = delta / cardStep;
    const velocityUnits = releaseVelocity * 170 / cardStep;
    const hasDirectionalDrag = Math.abs(dragUnits) >= CAROUSEL_DIRECTION_DRAG_UNITS || Math.abs(delta) >= CAROUSEL_MIN_DRAG_PX;
    const hasDirectionalVelocity = Math.abs(velocityUnits) >= CAROUSEL_VELOCITY_STEP_UNITS;
    const directionUnits = hasDirectionalDrag ? dragUnits : velocityUnits;
    const projectedUnits = hasDirectionalDrag
      ? dragUnits + Math.sign(dragUnits) * Math.max(0, Math.sign(dragUnits) * velocityUnits) * 0.9
      : velocityUnits;
    const rawStep = Math.round(Math.abs(projectedUnits));
    const velocityStep = Math.abs(velocityUnits) >= CAROUSEL_FAST_VELOCITY_UNITS ? 2 : 1;
    const stepCount = Math.max(hasDirectionalDrag ? 1 : 0, rawStep, hasDirectionalVelocity ? velocityStep : 0);
    if (stepCount > 0) {
      spinCarouselBy((directionUnits < 0 ? 1 : -1) * Math.min(CAROUSEL_MAX_THROW_STEPS, stepCount), {
        fromProgress: state.carouselDragProgress,
        velocity: releaseVelocity,
        scheduleReturn: true
      });
    } else {
      state.carouselDragProgress = 0;
      applyCarouselDrag(0);
      scheduleCarouselReturn();
    }
  });
  carouselShell?.addEventListener("pointercancel", () => {
    dragStart = null;
    state.carouselDragProgress = 0;
    carouselShell.classList.remove("is-dragging");
    applyCarouselDrag(0);
  });

  document.querySelectorAll(".show-card").forEach((button) => {
    button.addEventListener("click", (event) => {
      if (didDrag) {
        event.preventDefault();
        didDrag = false;
        return;
      }
      const nextIndex = Number(button.dataset.index);
      const nextDayId = button.dataset.day || state.selectedDayId;
      const step = nextDayId === state.selectedDayId
        ? getShortestCarouselStep(state.selectedIndex, nextIndex, getSlotsForDay(state.selectedDayId).length)
        : getShortestCarouselStepToSelection(nextDayId, nextIndex);
      spinCarouselBy(step, {
        maxStep: getTotalCarouselSlotCount(),
        scheduleReturn: true
      });
    });
  });
  bindScheduleRowEvents();

  document.querySelector("#commentForm")?.addEventListener("submit", submitComment);
  document.querySelector("#entryListToggle")?.addEventListener("click", toggleEntryList);
}

function bindScheduleRowEvents() {
  document.querySelectorAll(".schedule-row").forEach((button) => {
    button.addEventListener("click", () => {
      clearCarouselReturnTimer();
      state.selectedIndex = Number(button.dataset.index);
      render();
    });
  });
}

function moveSelection(step) {
  const nextSelection = resolveCarouselSelection(step);
  state.selectedDayId = nextSelection.dayId;
  state.selectedIndex = nextSelection.index;
  render();
}

function spinCarouselBy(step, options = {}) {
  const slots = getSlotsForDay(state.selectedDayId);
  if (!slots.length || step === 0) {
    return;
  }

  const carouselShell = document.querySelector("#carouselShell");
  if (!carouselShell) {
    moveSelection(step);
    return;
  }

  if (state.carouselIsSpinning && options.queue !== false) {
    const maxQueuedStep = Number.isFinite(options.maxQueuedStep) ? Math.max(1, options.maxQueuedStep) : 12;
    state.carouselQueuedStep = Math.max(-maxQueuedStep, Math.min(maxQueuedStep, state.carouselQueuedStep + Math.round(step)));
    state.carouselQueuedScheduleReturn = state.carouselQueuedScheduleReturn || Boolean(options.scheduleReturn);
    clearCarouselReturnTimer();
    return;
  }

  window.cancelAnimationFrame(state.carouselAnimationFrame);
  const maxStep = Number.isFinite(options.maxStep) ? Math.max(1, options.maxStep) : 3;
  const boundedStep = Math.max(-maxStep, Math.min(maxStep, Math.round(step)));
  const nextSelection = resolveCarouselSelection(boundedStep);
  const startProgress = Number.isFinite(options.fromProgress) ? options.fromProgress : state.carouselDragProgress;
  const targetProgress = -boundedStep;
  const distance = Math.abs(targetProgress - startProgress);
  const speed = Math.min(1.6, Math.abs(options.velocity ?? 0));
  const duration = Number.isFinite(options.duration)
    ? Math.max(240, options.duration)
    : Math.max(520, Math.min(1120, 620 + distance * 190 - speed * 120));
  const startTime = performance.now();

  state.carouselDragProgress = startProgress;
  state.carouselIsSpinning = true;
  carouselShell.classList.add("is-spinning");
  carouselShell.classList.remove("is-coasting", "is-dragging");
  paintCarouselFrame(startProgress);

  const tick = (now) => {
    const t = Math.min(1, (now - startTime) / duration);
    const eased = easeOutQuint(t);
    const progress = startProgress + (targetProgress - startProgress) * eased;
    state.carouselDragProgress = progress;
    paintCarouselFrame(progress);

    if (t < 1) {
      state.carouselAnimationFrame = window.requestAnimationFrame(tick);
      return;
    }

    const dayChanged = nextSelection.dayId !== state.selectedDayId;
    state.selectedDayId = nextSelection.dayId;
    state.selectedIndex = nextSelection.index;
    state.carouselDragProgress = 0;
    state.carouselIsSpinning = false;
    carouselShell.classList.remove("is-spinning");
    paintCarouselFrame(0);
    updateCarouselSelectionUi();
    updateSelectedShowSummary();
    if (dayChanged) {
      updateDayTabsUi();
      updateScheduleUi();
    }
    if (typeof options.onComplete === "function") {
      options.onComplete();
    }
    if (state.carouselQueuedStep !== 0) {
      continueQueuedCarouselSpin(options);
      return;
    }
    if (options.scheduleReturn) {
      scheduleCarouselReturn();
    }
  };

  state.carouselAnimationFrame = window.requestAnimationFrame(tick);
}

function continueQueuedCarouselSpin(previousOptions = {}) {
  if (state.carouselIsSpinning || state.carouselQueuedStep === 0) return;

  const step = Math.sign(state.carouselQueuedStep);
  state.carouselQueuedStep -= step;
  const shouldScheduleReturn = Boolean(previousOptions.scheduleReturn || state.carouselQueuedScheduleReturn);
  const isFinalQueuedStep = state.carouselQueuedStep === 0;
  if (isFinalQueuedStep) {
    state.carouselQueuedScheduleReturn = false;
  }
  spinCarouselBy(step, {
    ...previousOptions,
    queue: false,
    fromProgress: 0,
    maxStep: 1,
    duration: 280,
    velocity: 0.18,
    scheduleReturn: isFinalQueuedStep && shouldScheduleReturn
  });
}

function scheduleCarouselReturn() {
  clearCarouselReturnTimer();

  state.carouselReturnTimer = window.setTimeout(() => {
    const todayId = weekdayOrder[new Date().getDay()];
    const currentIndex = getCurrentSlotIndex();
    if (currentIndex < 0 || (state.selectedDayId === todayId && currentIndex === state.selectedIndex)) {
      return;
    }
    spinCarouselToSelection(todayId, currentIndex, { returning: true });
  }, 5000);
}

function clearCarouselReturnTimer() {
  if (state.carouselReturnTimer) {
    window.clearTimeout(state.carouselReturnTimer);
    state.carouselReturnTimer = 0;
  }
}

function spinCarouselToIndex(targetIndex, options = {}) {
  spinCarouselToSelection(state.selectedDayId, targetIndex, options);
}

function spinCarouselToSelection(targetDayId, targetIndex, options = {}) {
  const slots = getSlotsForDay(state.selectedDayId);
  const targetSlots = getSlotsForDay(targetDayId);
  if (!slots.length || !targetSlots.length || targetIndex < 0 || targetIndex >= targetSlots.length) {
    return;
  }
  const step = targetDayId === state.selectedDayId
    ? getShortestCarouselStep(state.selectedIndex, targetIndex, slots.length, options.returning ? slots.length : 3)
    : getShortestCarouselStepToSelection(targetDayId, targetIndex);
  if (step !== 0) {
    if (options.returning && Math.abs(step) > 1) {
      spinCarouselBy(Math.sign(step), {
        maxStep: 1,
        duration: 340,
        velocity: 0.12,
        scheduleReturn: false,
        onComplete: () => {
          clearCarouselReturnTimer();
          state.carouselReturnTimer = window.setTimeout(() => {
            spinCarouselToSelection(targetDayId, targetIndex, options);
          }, 45);
        }
      });
      return;
    }

    spinCarouselBy(step, {
      maxStep: options.returning ? 1 : 3,
      duration: options.returning ? 340 : undefined,
      velocity: options.returning ? 0.12 : 0.28,
      scheduleReturn: false
    });
  }
}

function paintCarouselFrame(progress) {
  const carouselShell = document.querySelector("#carouselShell");
  if (!carouselShell) return;
  const entries = getCarouselEntries();
  const selectedGlobalIndex = getSelectedCarouselGlobalIndex();
  for (const card of carouselShell.querySelectorAll(".show-card")) {
    const globalIndex = Number(card.dataset.global);
    const entry = entries[globalIndex];
    const relative = getRelativePosition(globalIndex, selectedGlobalIndex, entries.length) + progress;
    const pose = getCarouselPose(relative);
    card.style.setProperty("--x", pose.x);
    card.style.setProperty("--y", pose.y);
    card.style.setProperty("--z-offset", pose.zOffset);
    card.style.setProperty("--rotate-y", pose.rotateY);
    card.style.setProperty("--scale", pose.scale);
    card.style.setProperty("--opacity", pose.opacity);
    card.style.setProperty("--saturation", pose.saturation);
    card.style.setProperty("--z", String(pose.zIndex));
    card.style.pointerEvents = Math.abs(relative) > 2.65 ? "none" : "";
    if (Math.abs(relative) <= 3.4 && entry) {
      ensureCardImage(card, entry.slot.show.cover);
    }
  }
}

function ensureCardImage(card, cover) {
  if (!cover || card.querySelector("img")) return;
  const image = document.createElement("img");
  image.src = cover;
  image.alt = "";
  image.draggable = false;
  image.loading = "lazy";
  image.decoding = "async";
  card.prepend(image);
}

function updateCarouselSelectionUi() {
  const entries = getCarouselEntries();
  for (const card of document.querySelectorAll(".show-card")) {
    const dayId = card.dataset.day;
    const index = Number(card.dataset.index);
    const globalIndex = Number(card.dataset.global);
    const entry = entries[globalIndex];
    card.classList.toggle("is-selected", dayId === state.selectedDayId && index === state.selectedIndex);
    card.classList.toggle("is-live", Boolean(entry && isActiveDaySlot(entry.dayId, entry.slot)));
  }
}

function updateSelectedShowSummary() {
  const selectedDay = getSelectedDay();
  const selectedSlots = getSlotsForDay(selectedDay.id);
  const slot = selectedSlots[state.selectedIndex];
  if (!slot) return;

  const image = document.querySelector(".selected-show img");
  const meta = document.querySelector(".selected-show span");
  const title = document.querySelector(".selected-show h3");
  const description = document.querySelector(".selected-show p");
  if (image) image.src = slot.show.cover;
  if (meta) meta.textContent = `${getDayName(selectedDay.id)} · ${formatHourRange(slot.hour)}`;
  if (title) title.textContent = slot.show.title;
  if (description) description.textContent = getShowDescription(slot);
}

function updateDayTabsUi() {
  for (const button of document.querySelectorAll(".day-tab[data-day]")) {
    const isActive = button.dataset.day === state.selectedDayId;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-selected", String(isActive));
  }
}

function updateScheduleUi() {
  const wrap = document.querySelector("#scheduleWrap");
  if (!wrap?.classList.contains("is-visible")) return;

  const selectedSlots = getSlotsForDay(state.selectedDayId);
  const header = wrap.querySelector(".schedule-header h3");
  const grid = wrap.querySelector(".schedule-grid");
  if (header) {
    header.textContent = t("program.scheduleTitle", { day: getDayName(state.selectedDayId) });
  }
  if (grid) {
    grid.innerHTML = selectedSlots.map((slot, index) => `
      <button class="schedule-row ${isActiveSlot(slot) ? "is-live" : ""}" type="button" data-index="${index}">
        <time>${String(slot.hour).padStart(2, "0")}:00</time>
        <img src="${slot.show.cover}" alt="" loading="lazy" decoding="async" />
        <span>${escapeHtml(slot.show.shortTitle)}</span>
        ${isActiveSlot(slot) ? `<strong>${t("live")}</strong>` : ""}
      </button>
    `).join("");
    bindScheduleRowEvents();
  }
}

function getShortestCarouselStep(fromIndex, toIndex, total, maxStep = 3) {
  let step = toIndex - fromIndex;
  if (step > total / 2) step -= total;
  if (step < -total / 2) step += total;
  return Math.max(-maxStep, Math.min(maxStep, step));
}

function getCarouselEntries() {
  let globalIndex = 0;
  return weekdayOrder.flatMap((dayId) => getSlotsForDay(dayId).map((slot, index) => ({
    dayId,
    index,
    slot,
    globalIndex: globalIndex++
  })));
}

function getTotalCarouselSlotCount() {
  return weekdayOrder.reduce((total, dayId) => total + getSlotsForDay(dayId).length, 0);
}

function getSelectedCarouselGlobalIndex() {
  return getCarouselGlobalIndex(state.selectedDayId, state.selectedIndex);
}

function getCarouselGlobalIndex(dayId, slotIndex) {
  let total = 0;
  for (const currentDayId of weekdayOrder) {
    if (currentDayId === dayId) {
      return total + slotIndex;
    }
    total += getSlotsForDay(currentDayId).length;
  }
  return slotIndex;
}

function getShortestCarouselStepToSelection(targetDayId, targetIndex) {
  const total = getTotalCarouselSlotCount();
  if (!total) return 0;

  const fromGlobal = getCarouselGlobalIndex(state.selectedDayId, state.selectedIndex);
  const toGlobal = getCarouselGlobalIndex(targetDayId, targetIndex);
  let step = toGlobal - fromGlobal;
  if (step > total / 2) step -= total;
  if (step < -total / 2) step += total;
  return step;
}

function getAdjacentDayId(dayId, direction) {
  const index = weekdayOrder.indexOf(dayId);
  if (index < 0) return dayId;
  const offset = direction >= 0 ? 1 : -1;
  return weekdayOrder[(index + offset + weekdayOrder.length) % weekdayOrder.length];
}

function resolveCarouselSelection(step) {
  let dayId = state.selectedDayId;
  let index = state.selectedIndex + Math.round(step);
  let guard = 0;

  while (guard < weekdayOrder.length * 2) {
    const slots = getSlotsForDay(dayId);
    if (!slots.length) {
      return { dayId: state.selectedDayId, index: state.selectedIndex };
    }
    if (index >= 0 && index < slots.length) {
      return { dayId, index };
    }
    if (index >= slots.length) {
      index -= slots.length;
      dayId = getAdjacentDayId(dayId, 1);
    } else {
      dayId = getAdjacentDayId(dayId, -1);
      const previousSlots = getSlotsForDay(dayId);
      index += previousSlots.length;
    }
    guard += 1;
  }

  return { dayId: state.selectedDayId, index: state.selectedIndex };
}

function easeOutQuint(value) {
  return 1 - Math.pow(1 - value, 5);
}

function getCarouselPose(relative) {
  const rawDistance = Math.abs(relative);
  const clampedRelative = Math.max(-3.35, Math.min(3.35, relative));
  const distance = Math.abs(clampedRelative);
  const angle = clampedRelative * 36;
  const radians = angle * Math.PI / 180;
  const x = Math.sin(radians) * 17.4;
  const z = (Math.cos(radians) - 1) * 14.2;
  const y = distance * 0.85;
  const visibility = rawDistance > 3.35 ? 0 : 1;

  return {
    x: `${x.toFixed(3)}rem`,
    y: `${y.toFixed(3)}rem`,
    zOffset: `${z.toFixed(3)}rem`,
    rotateY: `${(-angle * 0.96).toFixed(3)}deg`,
    scale: Math.max(0.56, 1 - distance * 0.145).toFixed(3),
    opacity: (visibility * Math.max(0, 1 - rawDistance * 0.3)).toFixed(3),
    saturation: Math.max(0.42, 1 - distance * 0.18).toFixed(3),
    zIndex: Math.round(100 - distance * 10)
  };
}

async function togglePlayback() {
  if (state.playbackStarting) {
    return;
  }

  if (state.isPlaying) {
    state.playbackStarting = false;
    state.playbackRequested = false;
    clearStreamRetryTimer();
    stopCurrentAudioStream();
    state.isPlaying = false;
    releasePlayerLock();
    updateMediaSession();
    render();
    return;
  }

  const now = Date.now();
  if (now - state.lastPlaybackStartAttemptAt < 5000) {
    return;
  }
  state.lastPlaybackStartAttemptAt = now;

  acquirePlayerLock();

  try {
    state.playbackStarting = true;
    state.playbackRequested = true;
    state.streamRetryCount = 0;
    clearStreamRetryTimer();
    updatePlaybackUi();
    logPlayerEvent("play-attempt", { reason: "play" });
    setAudioStreamSource("play", { force: true });
    await state.audio.play();
    state.isPlaying = true;
  } catch {
    logPlayerEvent("play-failed", { reason: "play" });
    state.playbackRequested = false;
    state.isPlaying = false;
    releasePlayerLock();
  } finally {
    state.playbackStarting = false;
  }
  updateMediaSession();
  render();
}

function toggleTheme() {
  state.theme = state.theme === "light" ? "dark" : "light";
  window.localStorage.setItem("ai-radio-theme", state.theme);
  applyTheme();
  render();
}

function getInitialTheme() {
  const saved = window.localStorage.getItem("ai-radio-theme");
  if (saved === "light" || saved === "dark") {
    return saved;
  }
  return window.matchMedia?.("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

function applyTheme() {
  document.documentElement.dataset.theme = state.theme;
}

async function submitComment(event) {
  event.preventDefault();
  const status = document.querySelector("#commentStatus");
  const form = event.currentTarget;
  const text = form.querySelector("#commentText").value.trim();
  const consent = form.querySelector("#privacyConsent").checked;

  if (!text) {
    status.textContent = t("comment.needText");
    return;
  }
  if (!consent) {
    status.textContent = t("comment.needConsent");
    return;
  }

  const payload = {
    author: form.querySelector("#commentAuthor").value.trim().slice(0, 24),
    email: form.querySelector("#commentEmail").value.trim().slice(0, 254),
    comment: text.slice(0, 280)
  };

  if (isLocalPreview()) {
    status.textContent = t("comment.localPreview");
    state.comments.unshift({
      author: payload.author || t("form.guest"),
      text: payload.comment,
      ts: Date.now()
    });
    state.commentsStatus = t("comment.localEntry");
    state.commentsLoaded = true;
    state.commentsVisible = true;
    updateEntryListUi();
    form.reset();
    return;
  }

  status.textContent = t("comment.sending");
  try {
    const response = await fetch("/api/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload)
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    status.textContent = payload.email
      ? t("comment.thanksEmail")
      : t("comment.thanks");
    state.commentsLoaded = false;
    state.commentsVisible = true;
    await loadCommentEntries();
    updateEntryListUi();
    form.reset();
  } catch (error) {
    status.textContent = t("comment.failed", { message: error.message });
  }
}

async function toggleEntryList() {
  state.commentsVisible = !state.commentsVisible;
  if (state.commentsVisible && !state.commentsLoaded) {
    state.commentsStatus = t("entries.loading");
    updateEntryListUi();
    await loadCommentEntries();
  }
  updateEntryListUi();
}

async function loadCommentEntries() {
  try {
    const response = await fetch("/api/comments", {
      method: "GET",
      headers: { Accept: "application/json" },
      cache: "no-store"
    });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const payload = await response.json();
    state.comments = sanitizeCommentEntries(payload.comments);
    state.commentsLoaded = true;
    state.commentsStatus = state.comments.length
      ? t("entries.loaded", { count: state.comments.length })
      : t("entries.none");
  } catch {
    state.comments = [];
    state.commentsLoaded = true;
    state.commentsStatus = isLocalPreview()
      ? t("entries.localUnavailable")
      : t("entries.error");
  }
}

function sanitizeCommentEntries(items) {
  if (!Array.isArray(items)) {
    return [];
  }
  return items
    .filter((item) => item && typeof item === "object")
    .map((item) => ({
      author: typeof item.author === "string" && item.author.trim() ? item.author.trim().slice(0, 24) : t("form.guest"),
      text: typeof item.text === "string" ? item.text.trim().slice(0, 280) : "",
      ts: Number.isFinite(item.ts) ? item.ts : Date.now()
    }))
    .filter((item) => item.text)
    .slice(0, 30);
}

function renderCommentEntries() {
  if (!state.comments.length) {
    return `<li class="entry-empty">${t("entries.empty")}</li>`;
  }
  return state.comments.map((entry) => `
    <li class="entry-item">
      <div>
        <strong>${escapeHtml(entry.author)}</strong>
        <time>${escapeHtml(formatEntryTime(entry.ts))}</time>
      </div>
      <p>${escapeHtml(entry.text)}</p>
    </li>
  `).join("");
}

function updateEntryListUi() {
  const toggle = document.querySelector("#entryListToggle");
  const wrap = document.querySelector("#entryListWrap");
  const status = document.querySelector("#entryListStatus");
  const list = document.querySelector("#entryList");

  toggle?.setAttribute("aria-expanded", String(state.commentsVisible));
  const toggleText = toggle?.querySelector("span");
  if (toggleText) {
    toggleText.textContent = state.commentsVisible ? t("entries.hide") : t("entries.show");
  }
  wrap?.classList.toggle("is-visible", state.commentsVisible);
  if (status) {
    status.textContent = state.commentsStatus;
  }
  if (list) {
    list.innerHTML = renderCommentEntries();
  }
}

function formatEntryTime(value) {
  try {
    const localeMap = {
      de: "de-DE",
      en: "en-US",
      fr: "fr-FR",
      hr: "hr-HR"
    };
    return new Intl.DateTimeFormat(localeMap[state.locale] || "de-DE", {
      day: "2-digit",
      month: "2-digit",
      hour: "2-digit",
      minute: "2-digit"
    }).format(new Date(value));
  } catch {
    return "";
  }
}

function getSlotsForDay(dayId) {
  const day = state.config.weekdays.find((item) => item.id === dayId) ?? state.config.weekdays[0];
  const rawSlots = day.slots === "default" ? state.config.defaultSlots : day.slots;
  return rawSlots.map((slot) => ({
    ...slot,
    showId: slot.show,
    show: state.config.shows[slot.show]
  })).filter((slot) => slot.show);
}

function getSelectedDay() {
  return state.config.weekdays.find((item) => item.id === state.selectedDayId) ?? state.config.weekdays[0];
}

function getActiveSlot(date = new Date()) {
  const dayId = weekdayOrder[date.getDay()];
  const slots = getSlotsForDay(dayId);
  const hour = date.getHours();
  return slots.find((slot) => slot.hour === hour) ?? slots[0];
}

function getNextSlot(date = new Date()) {
  const dayId = weekdayOrder[date.getDay()];
  const slots = getSlotsForDay(dayId);
  if (!slots.length) {
    return getActiveSlot(date);
  }
  const currentIndex = Math.max(0, slots.findIndex((slot) => slot.hour === date.getHours()));
  return slots[(currentIndex + 1) % slots.length];
}

function getCurrentSlotIndex(date = new Date()) {
  const slots = getSlotsForDay(weekdayOrder[date.getDay()]);
  const hour = date.getHours();
  return Math.max(0, slots.findIndex((slot) => slot.hour === hour));
}

function isActiveSlot(slot) {
  const now = new Date();
  return isActiveDaySlot(state.selectedDayId, slot, now);
}

function isActiveDaySlot(dayId, slot, date = new Date()) {
  return dayId === weekdayOrder[date.getDay()] && slot.hour === date.getHours();
}

function formatHourRange(hour) {
  return `${String(hour).padStart(2, "0")}:00-${String((hour + 1) % 24).padStart(2, "0")}:00`;
}

function getRelativePosition(index, selectedIndex, total) {
  let distance = index - selectedIndex;
  if (distance > total / 2) distance -= total;
  if (distance < -total / 2) distance += total;
  return distance;
}

function getStreamUrl(streamUrl) {
  return isLocalPreview() ? "https://ai-radio.cc/stream.mp3" : streamUrl;
}

function isLocalPreview() {
  return ["localhost", "127.0.0.1", ""].includes(window.location.hostname);
}

function setupPlayerLock() {
  refreshPlayerLockState();
  state.playerLockWatchTimer = window.setInterval(refreshPlayerLockState, PLAYER_LOCK_HEARTBEAT_MS);
  window.addEventListener("storage", (event) => {
    if (event.key === PLAYER_LOCK_KEY) {
      refreshPlayerLockState();
    }
  });
  window.addEventListener("pagehide", releasePlayerLock);
  window.addEventListener("beforeunload", releasePlayerLock);
}

function getPlayerLock() {
  try {
    const raw = window.localStorage.getItem(PLAYER_LOCK_KEY);
    if (!raw) return null;
    const lock = JSON.parse(raw);
    if (!lock || typeof lock !== "object") return null;
    if (Number(lock.expiresAt) <= Date.now()) {
      try {
        window.localStorage.removeItem(PLAYER_LOCK_KEY);
      } catch {
        // Ignore storage errors while clearing an expired lock.
      }
      return null;
    }
    return lock;
  } catch {
    try {
      window.localStorage.removeItem(PLAYER_LOCK_KEY);
    } catch {
      // Ignore storage errors while clearing a malformed lock.
    }
    return null;
  }
}

function isLockedByOther(lock = getPlayerLock()) {
  return Boolean(lock && lock.tabId && lock.tabId !== state.tabId);
}

function acquirePlayerLock() {
  const lock = getPlayerLock();
  if (isLockedByOther(lock)) {
    logPlayerEvent("takeover-other-tab", { reason: "other-tab" });
  }

  if (!writePlayerLock()) {
    return true;
  }
  startPlayerLockHeartbeat();
  state.playerLockedByOther = false;
  return true;
}

function writePlayerLock() {
  const now = Date.now();
  try {
    window.localStorage.setItem(PLAYER_LOCK_KEY, JSON.stringify({
      tabId: state.tabId,
      sessionId: state.streamSessionId,
      updatedAt: now,
      expiresAt: now + PLAYER_LOCK_TTL_MS
    }));
    return true;
  } catch {
    return false;
  }
}

function startPlayerLockHeartbeat() {
  if (state.playerLockTimer) return;
  state.playerLockTimer = window.setInterval(() => {
    if (!state.playbackRequested && !state.playbackStarting && !state.isPlaying) {
      releasePlayerLock();
      return;
    }
    writePlayerLock();
  }, PLAYER_LOCK_HEARTBEAT_MS);
}

function releasePlayerLock() {
  const lock = getPlayerLock();
  if (lock && lock.tabId === state.tabId) {
    try {
      window.localStorage.removeItem(PLAYER_LOCK_KEY);
    } catch {
      // Ignore storage errors while closing the tab.
    }
  }
  if (state.playerLockTimer) {
    window.clearInterval(state.playerLockTimer);
    state.playerLockTimer = 0;
  }
  state.playerLockedByOther = false;
}

function refreshPlayerLockState() {
  const nextLocked = isLockedByOther();
  if (nextLocked && (state.isPlaying || state.playbackRequested || state.playbackStarting)) {
    stopPlaybackForOtherTab();
  }
  if (state.playerLockedByOther === nextLocked) return;
  state.playerLockedByOther = nextLocked;
  updatePlaybackUi();
}

function stopPlaybackForOtherTab() {
  state.playbackStarting = false;
  state.playbackRequested = false;
  state.isPlaying = false;
  clearStreamRetryTimer();
  stopCurrentAudioStream();
  logPlayerEvent("stopped-for-other-tab", { reason: "other-tab" });
  updatePlaybackUi();
  updateMediaSession();
}

function syncAudioElement() {
  state.audio.preload = "none";
  state.audio.volume = state.volume;
  state.audio.muted = false;
}

function setupAudioEventHandlers() {
  if (state.audioHandlersBound) return;
  state.audioHandlersBound = true;
  state.audio.preload = "none";

  state.audio.addEventListener("playing", () => {
    clearStreamRetryTimer();
    state.playbackStarting = false;
    state.isPlaying = true;
    logPlayerEvent("playing");
    updatePlaybackUi();
    updateMediaSession();
  });
  state.audio.addEventListener("canplay", clearStreamRetryTimer);
  state.audio.addEventListener("canplaythrough", clearStreamRetryTimer);

  state.audio.addEventListener("pause", () => {
    if (!state.playbackRequested) {
      clearStreamRetryTimer();
      state.isPlaying = false;
      logPlayerEvent("pause");
      updatePlaybackUi();
      updateMediaSession();
    }
  });

  state.audio.addEventListener("waiting", () => scheduleStreamReconnect("waiting", 2500));
  state.audio.addEventListener("stalled", () => scheduleStreamReconnect("stalled", 1200));
  state.audio.addEventListener("error", () => scheduleStreamReconnect("error", 400));
  state.audio.addEventListener("ended", () => scheduleStreamReconnect("ended", 400));
}

function scheduleStreamReconnect(reason, delayMs) {
  if (!state.playbackRequested) return;
  if (state.streamRetryTimer) return;
  logPlayerEvent(`audio-${reason}`, { reason });
  state.streamRetryTimer = window.setTimeout(() => {
    state.streamRetryTimer = 0;
    restartStream(reason);
  }, delayMs);
}

function clearStreamRetryTimer() {
  if (!state.streamRetryTimer) return;
  window.clearTimeout(state.streamRetryTimer);
  state.streamRetryTimer = 0;
}

async function restartStream(reason) {
  if (!state.playbackRequested || state.playbackStarting) return;

  const now = Date.now();
  const minGapMs = 3500;
  if (now - state.lastStreamRestartAt < minGapMs) {
    scheduleStreamReconnect(reason, minGapMs - (now - state.lastStreamRestartAt));
    return;
  }

  state.lastStreamRestartAt = now;
  state.playbackStarting = true;
  state.streamRetryCount += 1;
  updatePlaybackUi();
  logPlayerEvent("reconnect-attempt", { reason });
  setAudioStreamSource(`retry-${reason}-${state.streamRetryCount}`, { force: true });

  try {
    await state.audio.play();
    state.isPlaying = true;
  } catch {
    state.isPlaying = false;
    logPlayerEvent("reconnect-failed", { reason });
    scheduleStreamReconnect("play-failed", 3500);
  } finally {
    state.playbackStarting = false;
  }
  updatePlaybackUi();
  updateMediaSession();
}

function setAudioStreamSource(reason, options = {}) {
  const baseUrl = new URL(getStreamUrl(state.config.station.streamUrl), window.location.href);
  baseUrl.searchParams.set("ts", String(Date.now()));
  baseUrl.searchParams.set("sid", state.streamSessionId || createStreamSessionId());
  baseUrl.searchParams.set("rv", String(state.streamRetryCount + 1));
  baseUrl.searchParams.set("reason", reason);
  const nextSrc = baseUrl.href;

  if (!options.force && state.audio.src === nextSrc) return;
  if (options.force) {
    stopCurrentAudioStream();
  }
  state.audio.src = nextSrc;
  state.audio.preload = "none";
  state.audio.volume = state.volume;
  state.audio.muted = false;
}

function stopCurrentAudioStream() {
  state.audio.pause();
  state.audio.removeAttribute("src");
  state.audio.load();
}

function logPlayerEvent(event, details = {}) {
  if (isLocalPreview()) return;
  const payload = {
    event,
    session_id: state.streamSessionId,
    retry_count: state.streamRetryCount,
    is_playing: state.isPlaying,
    playback_starting: state.playbackStarting,
    ready_state: state.audio.readyState,
    network_state: state.audio.networkState,
    reason: details.reason || ""
  };
  const body = JSON.stringify(payload);
  if (navigator.sendBeacon) {
    navigator.sendBeacon("/api/player-event", new Blob([body], { type: "application/json" }));
    return;
  }
  fetch("/api/player-event", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
    keepalive: true
  }).catch(() => {});
}

function createStreamSessionId() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

function updatePlaybackUi() {
  const button = document.querySelector("#playToggle");
  const status = document.querySelector("#streamStatus");
  if (status) {
    status.textContent = getStreamStatusText();
  }
  if (!button) return;
  button.disabled = state.playbackStarting;
  button.innerHTML = `
    <i data-lucide="${state.isPlaying ? "pause" : "play"}"></i>
    <span>${getPlaybackButtonText()}</span>
  `;
  createIcons({ icons: iconSet });
}

function getPlaybackButtonText() {
  if (state.playbackStarting) return t("player.connecting");
  return state.isPlaying ? t("player.pause") : t("player.start");
}

function getStreamStatusText() {
  if (state.playbackStarting) return t("player.connecting");
  return state.isPlaying ? t("player.connected") : t("player.ready");
}

function getTextbookUrl(slot = getActiveSlot()) {
  const baseUrl = state.config?.station?.textbookUrl || "/podcast/ai-radio/textbooks/";
  const showId = String(slot?.showId || slot?.showKey || "").trim();
  const textbookShowId = TEXTBOOK_SHOW_BY_PROGRAM_SHOW[showId];
  if (!textbookShowId) return baseUrl;
  try {
    const url = new URL(baseUrl, window.location.href);
    url.searchParams.set("show", textbookShowId);
    return url.href;
  } catch {
    const separator = baseUrl.includes("?") ? "&" : "?";
    return `${baseUrl}${separator}show=${encodeURIComponent(textbookShowId)}`;
  }
}

function getNowPlayingText() {
  const track = String(state.nowPlaying?.track || "").trim();
  return track || getActiveSlot().show.shortTitle;
}

function isNowPlayingFresh(payload) {
  const updatedTs = Number(payload?.updated_ts || 0);
  const serverTs = Number(payload?.server_ts || Date.now());
  return Boolean(updatedTs > 0 && serverTs - updatedTs < 8 * 60 * 1000);
}

async function refreshNowPlaying() {
  if (isLocalPreview()) return;
  try {
    const response = await fetch("/api/now-playing", { cache: "no-store" });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const payload = await response.json();
    state.nowPlaying = payload.status === "playing" && isNowPlayingFresh(payload) ? payload : null;
  } catch {
    state.nowPlaying = null;
  }
  updateNowPlayingUi();
  updateMediaSession();
}

function updateNowPlayingUi() {
  const text = getNowPlayingText();
  const heroTrack = document.querySelector("#heroNowTrack");
  if (heroTrack) heroTrack.textContent = text;
  const nowPlayingTitle = document.querySelector("#nowPlayingTitle");
  if (nowPlayingTitle) nowPlayingTitle.textContent = text;
}

function updateMediaSession() {
  if (!state.config) return;
  const station = state.config.station;
  const active = getActiveSlot();
  const track = String(state.nowPlaying?.track || "").trim();
  const showTitle = active.show.shortTitle || active.show.title || station.name;
  const title = track || showTitle;
  const artist = track ? showTitle : `${formatHourRange(active.hour)} · ${active.show.subtitle}`;
  const album = station.name;
  const coverUrl = new URL(active.show.cover, window.location.href).href;
  const jpegFallbackUrl = coverUrl.replace(/-512\.webp$/, "-512.jpg");
  const key = `${title}|${artist}|${coverUrl}|${state.isPlaying}`;

  document.title = state.isPlaying ? `${title} · ${station.name}` : station.name;

  if (!("mediaSession" in navigator) || typeof MediaMetadata === "undefined") return;
  navigator.mediaSession.playbackState = state.isPlaying ? "playing" : "paused";
  if (state.mediaSessionKey === key) return;
  state.mediaSessionKey = key;

  navigator.mediaSession.metadata = new MediaMetadata({
    title,
    artist,
    album,
    artwork: [
      { src: coverUrl, sizes: "512x512", type: "image/webp" },
      { src: jpegFallbackUrl, sizes: "512x512", type: "image/jpeg" }
    ]
  });

  navigator.mediaSession.setActionHandler?.("play", () => {
    if (!state.isPlaying) togglePlayback();
  });
  navigator.mediaSession.setActionHandler?.("pause", () => {
    if (state.isPlaying) togglePlayback();
  });
}

function startTicks() {
  window.setInterval(() => {
    const active = getActiveSlot();
    const next = getNextSlot();
    document.querySelector("#heroNowTitle") && (document.querySelector("#heroNowTitle").textContent = active.show.shortTitle);
    document.querySelector("#heroNowMeta") && (document.querySelector("#heroNowMeta").textContent = `${formatHourRange(active.hour)} · ${active.show.subtitle}`);
    const nowCover = document.querySelector("#heroNowCover");
    if (nowCover && nowCover.getAttribute("src") !== active.show.cover) {
      nowCover.setAttribute("src", active.show.cover);
    }
    document.querySelector("#nextShowTitle") && (document.querySelector("#nextShowTitle").textContent = next.show.shortTitle);
    document.querySelector("#nextShowTime") && (document.querySelector("#nextShowTime").textContent = `${formatHourRange(next.hour)} · ${next.show.subtitle}`);
    const nextCover = document.querySelector("#nextShowCover");
    if (nextCover && nextCover.getAttribute("src") !== next.show.cover) {
      nextCover.setAttribute("src", next.show.cover);
    }
    const textbookLink = document.querySelector("#textbookLink");
    if (textbookLink) {
      textbookLink.setAttribute("href", getTextbookUrl(active));
    }
    updateNowPlayingUi();
    state.sphere?.setImage(active.show.cover);
    updateMediaSession();
    updateClock();
  }, 1000);
  state.nowPlayingTimer = window.setInterval(refreshNowPlaying, 5000);
}

function updateClock() {
  const clock = document.querySelector("#clockValue");
  if (!clock) return;
  clock.textContent = new Intl.DateTimeFormat("de-DE", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  }).format(new Date());
}

function initHeroSphere(container, imageUrl) {
  if (!container) return null;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
  camera.position.set(0, 0, 5.1);

  const geometry = new THREE.SphereGeometry(1.3, 96, 64);
  const material = new THREE.MeshStandardMaterial({
    color: 0x181512,
    roughness: 0.42,
    metalness: 0.02,
    emissive: new THREE.Color(0x101010),
    emissiveIntensity: 0.18
  });
  const sphere = new THREE.Mesh(geometry, material);
  sphere.rotation.y = -0.55;
  scene.add(sphere);

  const rimLight = new THREE.PointLight(0xff8a54, 4.2, 10);
  rimLight.position.set(-3.2, 2.1, 3.5);
  scene.add(rimLight);

  const keyLight = new THREE.DirectionalLight(0xffffff, 3.4);
  keyLight.position.set(2.8, 2.6, 4.2);
  scene.add(keyLight);
  scene.add(new THREE.AmbientLight(0x7bd7cf, 1.1));

  const loader = new THREE.TextureLoader();
  let activeImage = "";
  function setImage(nextImage) {
    if (!nextImage || nextImage === activeImage) return;
    activeImage = nextImage;
    loader.load(nextImage, (texture) => {
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
      const oldMap = material.map;
      material.map = texture;
      material.color.set(0xffffff);
      material.emissive.set(0x2a2520);
      material.emissiveIntensity = 0.38;
      material.needsUpdate = true;
      oldMap?.dispose();
    });
  }

  function resize() {
    const { width, height } = container.getBoundingClientRect();
    const side = Math.max(280, Math.min(width, height || width));
    renderer.setSize(side, side, false);
    camera.aspect = 1;
    camera.updateProjectionMatrix();
  }

  let frameId = 0;
  function animate() {
    sphere.rotation.y += 0.0042;
    sphere.rotation.x = Math.sin(performance.now() * 0.00045) * 0.08;
    renderer.render(scene, camera);
    frameId = window.requestAnimationFrame(animate);
  }

  setImage(imageUrl);
  resize();
  animate();
  window.addEventListener("resize", resize);

  function dispose() {
    window.cancelAnimationFrame(frameId);
    window.removeEventListener("resize", resize);
    material.map?.dispose();
    material.dispose();
    geometry.dispose();
    renderer.dispose();
    renderer.domElement.remove();
  }

  return { setImage, dispose };
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
