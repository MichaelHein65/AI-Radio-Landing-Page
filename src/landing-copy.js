// New landing-page copy follows the existing language switcher.
const keys = ['live', 'playlist', 'youtubeTitle', 'youtubeCopy', 'youtubeAction', 'newTab'];
const translations = {
  de: ['Jetzt live', 'Playlist', 'Dein Radio. Auch zum Anschauen.', 'Entdecke die Musikvideos von AI Radio in unserer YouTube-Playlist.', 'Playlist entdecken', 'Öffnet in einem neuen Tab'],
  en: ['Live now', 'Playlist', 'Your radio. Now in pictures.', 'Explore AI Radio music videos in our YouTube playlist.', 'Explore the playlist', 'Opens in a new tab'],
  fr: ['En direct', 'Playlist', 'Votre radio. Aussi en images.', 'Découvrez les clips de AI Radio dans notre playlist YouTube.', 'Découvrir la playlist', 'Ouvre un nouvel onglet'],
  es: ['En directo', 'Playlist', 'Tu radio. También en imágenes.', 'Descubre los vídeos musicales de AI Radio en nuestra playlist de YouTube.', 'Descubrir la playlist', 'Se abre en otra pestaña'],
  it: ['In diretta', 'Playlist', 'La tua radio. Anche da guardare.', 'Scopri i video musicali di AI Radio nella nostra playlist YouTube.', 'Scopri la playlist', 'Si apre in una nuova scheda'],
  nl: ['Nu live', 'Playlist', 'Je radio. Ook om naar te kijken.', 'Ontdek de muziekvideo’s van AI Radio in onze YouTube-playlist.', 'Ontdek de playlist', 'Opent in een nieuw tabblad'],
  pl: ['Na żywo', 'Playlista', 'Twoje radio. Także w obrazach.', 'Odkryj teledyski AI Radio na naszej playliście YouTube.', 'Odkryj playlistę', 'Otwiera nową kartę'],
  pt: ['Ao vivo', 'Playlist', 'A tua rádio. Também em imagens.', 'Descobre os vídeos musicais da AI Radio na nossa playlist do YouTube.', 'Explorar a playlist', 'Abre num novo separador'],
  sv: ['Live nu', 'Spellista', 'Din radio. Även i bild.', 'Upptäck AI Radios musikvideor i vår spellista på YouTube.', 'Utforska spellistan', 'Öppnas i en ny flik'],
  da: ['Live nu', 'Playliste', 'Din radio. Også i billeder.', 'Oplev AI Radios musikvideoer i vores YouTube-playliste.', 'Udforsk playlisten', 'Åbner i en ny fane'],
  hr: ['Uživo', 'Popis za reprodukciju', 'Tvoj radio. I u slikama.', 'Otkrij glazbene spotove AI Radija na našem YouTube popisu za reprodukciju.', 'Otkrij popis', 'Otvara se u novoj kartici']
};
export const LANDING_COPY = Object.fromEntries(Object.entries(translations).map(([locale, values]) => [locale,
  Object.fromEntries(keys.map((key, index) => [`landing.${key}`, values[index]]))
]));

const videoKeys = ['videoLoad', 'videoClose', 'videoPrivacy', 'videoExternal'];
const videoCopy = {
  de: ['Hier abspielen', 'Video schließen', 'Mit „Hier abspielen“ lädst du YouTube und stimmst der Übertragung von Daten (z. B. deiner IP-Adresse) an Google/YouTube zu. Das Radio pausiert.', 'Auf YouTube öffnen'],
  en: ['Play here', 'Close video', 'By choosing “Play here”, you load YouTube and agree to data (such as your IP address) being sent to Google/YouTube. The radio pauses.', 'Open on YouTube'],
  fr: ['Lire ici', 'Fermer la vidéo', 'En choisissant « Lire ici », vous chargez YouTube et acceptez la transmission de données (comme votre adresse IP) à Google/YouTube. La radio se met en pause.', 'Ouvrir sur YouTube'],
  es: ['Reproducir aquí', 'Cerrar vídeo', 'Al elegir « Reproducir aquí », cargas YouTube y aceptas enviar datos (como tu dirección IP) a Google/YouTube. La radio se pausa.', 'Abrir en YouTube'],
  it: ['Riproduci qui', 'Chiudi video', 'Scegliendo « Riproduci qui », carichi YouTube e accetti l’invio di dati (come il tuo indirizzo IP) a Google/YouTube. La radio va in pausa.', 'Apri su YouTube'],
  nl: ['Hier afspelen', 'Video sluiten', 'Met “Hier afspelen” laad je YouTube en ga je akkoord met het verzenden van gegevens (zoals je IP-adres) naar Google/YouTube. De radio pauzeert.', 'Openen op YouTube'],
  pl: ['Odtwórz tutaj', 'Zamknij wideo', 'Wybierając „Odtwórz tutaj”, ładujesz YouTube i zgadzasz się na przesłanie danych (np. adresu IP) do Google/YouTube. Radio zostaje wstrzymane.', 'Otwórz w YouTube'],
  pt: ['Reproduzir aqui', 'Fechar vídeo', 'Ao escolher « Reproduzir aqui », carregas o YouTube e aceitas enviar dados (como o teu endereço IP) à Google/YouTube. A rádio fica em pausa.', 'Abrir no YouTube'],
  sv: ['Spela här', 'Stäng videon', 'Med ”Spela här” laddar du YouTube och godkänner att data (som din IP-adress) skickas till Google/YouTube. Radion pausas.', 'Öppna på YouTube'],
  da: ['Afspil her', 'Luk video', 'Med “Afspil her” indlæser du YouTube og accepterer, at data (som din IP-adresse) sendes til Google/YouTube. Radioen sættes på pause.', 'Åbn på YouTube'],
  hr: ['Reproduciraj ovdje', 'Zatvori video', 'Odabirom „Reproduciraj ovdje” učitavaš YouTube i pristaješ na slanje podataka (poput IP adrese) Googleu/YouTubeu. Radio se pauzira.', 'Otvori na YouTubeu']
};
for (const [locale, values] of Object.entries(videoCopy)) {
  Object.assign(LANDING_COPY[locale], Object.fromEntries(videoKeys.map((key, index) => [`landing.${key}`, values[index]])));
}

const queueKeys = ['videoPrevious', 'videoNext', 'videoRetry', 'videoResume', 'video_loading', 'video_playing', 'video_paused', 'video_blocked', 'video_error', 'video_unavailable', 'video_ended'];
const queueCopy = {
  de: ['← Vorheriges Video', 'Nächstes Video →', 'Erneut versuchen', 'Wiedergabe starten', 'Video wird geladen …', 'Wird abgespielt · Das nächste Video startet automatisch.', 'Wiedergabe pausiert.', 'Bitte starte die Wiedergabe per Klick.', 'Das Video konnte nicht geladen werden. Versuche es erneut oder wähle einen anderen Titel.', 'Dieses Video ist hier nicht verfügbar. Die Wiedergabe geht mit dem nächsten verfügbaren Titel weiter.', 'Ende der Playlist. Wähle einen Titel, um weiterzuhören.'],
  en: ['← Previous video', 'Next video →', 'Try again', 'Start playback', 'Loading video …', 'Playing · The next video starts automatically.', 'Playback paused.', 'Please click to start playback.', 'The video could not be loaded. Try again or select another title.', 'This video is unavailable here. Continuing with the next available title.', 'End of playlist. Select a title to keep listening.'],
  fr: ['← Vidéo précédente', 'Vidéo suivante →', 'Réessayer', 'Lancer la lecture', 'Chargement de la vidéo …', 'Lecture en cours · La vidéo suivante démarre automatiquement.', 'Lecture en pause.', 'Cliquez pour lancer la lecture.', 'Impossible de charger la vidéo. Réessayez ou choisissez un autre titre.', 'Cette vidéo est indisponible ici. Passage au prochain titre disponible.', 'Fin de la playlist. Choisissez un titre pour continuer.'],
  es: ['← Vídeo anterior', 'Siguiente vídeo →', 'Reintentar', 'Iniciar reproducción', 'Cargando vídeo …', 'Reproduciendo · El siguiente vídeo comienza automáticamente.', 'Reproducción en pausa.', 'Haz clic para iniciar la reproducción.', 'No se pudo cargar el vídeo. Reintenta o elige otro título.', 'Este vídeo no está disponible aquí. Se reproducirá el siguiente título disponible.', 'Fin de la lista. Elige un título para continuar.'],
  it: ['← Video precedente', 'Video successivo →', 'Riprova', 'Avvia riproduzione', 'Caricamento video …', 'In riproduzione · Il prossimo video parte automaticamente.', 'Riproduzione in pausa.', 'Fai clic per avviare la riproduzione.', 'Impossibile caricare il video. Riprova o scegli un altro titolo.', 'Questo video non è disponibile qui. Si passa al prossimo titolo disponibile.', 'Fine della playlist. Scegli un titolo per continuare.'],
  nl: ['← Vorige video', 'Volgende video →', 'Opnieuw proberen', 'Afspelen starten', 'Video laden …', 'Wordt afgespeeld · De volgende video start automatisch.', 'Afspelen gepauzeerd.', 'Klik om het afspelen te starten.', 'De video kon niet worden geladen. Probeer opnieuw of kies een andere titel.', 'Deze video is hier niet beschikbaar. De volgende beschikbare titel wordt afgespeeld.', 'Einde van de afspeellijst. Kies een titel om verder te luisteren.'],
  pl: ['← Poprzedni film', 'Następny film →', 'Spróbuj ponownie', 'Rozpocznij odtwarzanie', 'Ładowanie filmu …', 'Odtwarzanie · Następny film uruchomi się automatycznie.', 'Odtwarzanie wstrzymane.', 'Kliknij, aby rozpocząć odtwarzanie.', 'Nie udało się załadować filmu. Spróbuj ponownie lub wybierz inny tytuł.', 'Ten film jest tu niedostępny. Odtwarzanie przejdzie do następnego dostępnego tytułu.', 'Koniec playlisty. Wybierz tytuł, aby słuchać dalej.'],
  pt: ['← Vídeo anterior', 'Próximo vídeo →', 'Tentar novamente', 'Iniciar reprodução', 'A carregar vídeo …', 'A reproduzir · O próximo vídeo começa automaticamente.', 'Reprodução em pausa.', 'Clica para iniciar a reprodução.', 'Não foi possível carregar o vídeo. Tenta novamente ou escolhe outro título.', 'Este vídeo não está disponível aqui. A reprodução continua com o próximo título disponível.', 'Fim da playlist. Escolhe um título para continuar.'],
  sv: ['← Föregående video', 'Nästa video →', 'Försök igen', 'Starta uppspelning', 'Laddar video …', 'Spelar · Nästa video startar automatiskt.', 'Uppspelningen är pausad.', 'Klicka för att starta uppspelningen.', 'Videon kunde inte laddas. Försök igen eller välj en annan titel.', 'Videon är inte tillgänglig här. Nästa tillgängliga titel spelas upp.', 'Slut på spellistan. Välj en titel för att fortsätta.'],
  da: ['← Forrige video', 'Næste video →', 'Prøv igen', 'Start afspilning', 'Indlæser video …', 'Afspiller · Næste video starter automatisk.', 'Afspilning sat på pause.', 'Klik for at starte afspilningen.', 'Videoen kunne ikke indlæses. Prøv igen eller vælg en anden titel.', 'Videoen er ikke tilgængelig her. Afspilningen fortsætter med næste tilgængelige titel.', 'Slut på playlisten. Vælg en titel for at fortsætte.'],
  hr: ['← Prethodni video', 'Sljedeći video →', 'Pokušaj ponovno', 'Pokreni reprodukciju', 'Učitavanje videa …', 'Reprodukcija · Sljedeći video počinje automatski.', 'Reprodukcija je pauzirana.', 'Klikni za početak reprodukcije.', 'Video se nije mogao učitati. Pokušaj ponovno ili odaberi drugi naslov.', 'Ovaj video ovdje nije dostupan. Nastavlja se sljedeći dostupan naslov.', 'Kraj popisa. Odaberi naslov za nastavak.']
};
for (const [locale, values] of Object.entries(queueCopy)) {
  Object.assign(LANDING_COPY[locale], Object.fromEntries(queueKeys.map((key, index) => [`landing.${key}`, values[index]])));
}

const syncKeys = ['playlistLoading', 'playlistCurrent', 'playlistEmpty', 'playlistFailed', 'playlistStale'];
const syncCopy = {
  de: ['Playlist wird aktualisiert …', 'Wird automatisch aktuell gehalten.', 'Diese Playlist enthält keine Videos.', 'Playlist konnte nicht geladen werden. Bitte erneut versuchen.', 'Aktualisierung fehlgeschlagen. Angezeigt wird der letzte geladene Stand.'],
  en: ['Updating playlist …', 'Kept up to date automatically.', 'This playlist has no videos.', 'Could not load the playlist. Please try again.', 'Update failed. Showing the last loaded version.'],
  fr: ['Actualisation de la playlist …', 'Mise à jour automatique.', 'Cette playlist ne contient aucune vidéo.', 'Impossible de charger la playlist. Réessayez.', 'Échec de la mise à jour. Dernière version chargée affichée.'],
  es: ['Actualizando lista …', 'Se actualiza automáticamente.', 'Esta lista no contiene vídeos.', 'No se pudo cargar la lista. Inténtalo de nuevo.', 'Error al actualizar. Se muestra la última versión cargada.'],
  it: ['Aggiornamento playlist …', 'Aggiornamento automatico.', 'Questa playlist non contiene video.', 'Impossibile caricare la playlist. Riprova.', 'Aggiornamento non riuscito. Viene mostrata l’ultima versione caricata.'],
  nl: ['Afspeellijst bijwerken …', 'Wordt automatisch bijgewerkt.', 'Deze afspeellijst bevat geen video’s.', 'De afspeellijst kon niet worden geladen. Probeer opnieuw.', 'Bijwerken mislukt. De laatst geladen versie wordt getoond.'],
  pl: ['Aktualizowanie playlisty …', 'Aktualizowana automatycznie.', 'Ta playlista nie zawiera filmów.', 'Nie udało się załadować playlisty. Spróbuj ponownie.', 'Aktualizacja nie powiodła się. Wyświetlana jest ostatnia załadowana wersja.'],
  pt: ['A atualizar playlist …', 'Atualizada automaticamente.', 'Esta playlist não contém vídeos.', 'Não foi possível carregar a playlist. Tenta novamente.', 'Falha na atualização. É apresentada a última versão carregada.'],
  sv: ['Uppdaterar spellistan …', 'Uppdateras automatiskt.', 'Spellistan innehåller inga videor.', 'Kunde inte ladda spellistan. Försök igen.', 'Uppdateringen misslyckades. Senast laddade version visas.'],
  da: ['Opdaterer playlisten …', 'Opdateres automatisk.', 'Denne playliste indeholder ingen videoer.', 'Playlisten kunne ikke indlæses. Prøv igen.', 'Opdatering mislykkedes. Den senest indlæste version vises.'],
  hr: ['Ažuriranje popisa …', 'Automatski se ažurira.', 'Ovaj popis nema videozapisa.', 'Popis se nije mogao učitati. Pokušaj ponovno.', 'Ažuriranje nije uspjelo. Prikazuje se posljednja učitana verzija.']
};
for (const [locale, values] of Object.entries(syncCopy)) {
  Object.assign(LANDING_COPY[locale], Object.fromEntries(syncKeys.map((key, index) => [`landing.${key}`, values[index]])));
}
