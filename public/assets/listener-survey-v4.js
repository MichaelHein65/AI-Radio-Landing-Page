(() => {
  'use strict';
  const key = 'ai-radio-survey-v1';
  const laterKey = 'ai-radio-survey-later-v2';
  const cooldown = 30 * 60 * 1000;
  const germanQuestions = [
    ['Wie vertraut bist du mit AI-Musik?', ['Heute zum ersten Mal gehört', 'Ab und zu gehört', 'Ich höre regelmäßig AI-Musik', 'Ich mache selbst AI-Musik']],
    ['Welche Musikrichtung möchtest du bei uns häufiger hören?', ['Pop', 'Rock / Metal', 'Electronic / Dance', 'Hip-Hop / Rap', 'Ruhige Musik / Ambient', 'Eine bunte Mischung', 'Etwas anderes']],
    ['Was interessiert dich an unseren Sendungen am meisten?', ['Die Musik', 'Moderation und Geschichten', 'Wissen über AI-Musik', 'Neuigkeiten und Nachrichten', 'Die Mischung aus allem']],
    ['Wie wünschst du dir das Verhältnis von Musik und gesprochenen Beiträgen?', ['Viel mehr Musik', 'Etwas mehr Musik', 'So wie bisher', 'Mehr gesprochene Beiträge', 'Kann ich noch nicht beurteilen']],
    ['Was können wir an unseren Sendungen verbessern?', null]
  ];
  const englishQuestions = [
    ['How familiar are you with AI music?', ['This is my first time hearing it', 'I hear it occasionally', 'I listen to AI music regularly', 'I make AI music myself']],
    ['Which music genre would you like to hear more often?', ['Pop', 'Rock / Metal', 'Electronic / Dance', 'Hip-Hop / Rap', 'Calm music / Ambient', 'A varied mix', 'Something else']],
    ['What interests you most about our shows?', ['The music', 'Presenting and stories', 'Learning about AI music', 'News and updates', 'The mix of everything']],
    ['How would you like the balance between music and spoken content?', ['Much more music', 'A little more music', 'Just as it is', 'More spoken content', 'I cannot judge that yet']],
    ['What could we improve about our shows?', null]
  ];
  const english = {
    inviteTitle: 'Would you help us improve the station?', inviteCopy: 'Five short questions about AI music and our shows. Your programme keeps playing. You can stop at any time.',
    privacyCopy: 'We only save your answers when you submit them, without your name or email address. Please do not enter personal data in the free-text field.', privacy: 'Privacy information',
    accept: 'Yes, gladly', later: 'Maybe later', thanksTitle: 'Thank you for taking part!', thanksCopy: 'Your answers have been saved. Enjoy listening!', continue: 'Keep listening',
    question: 'Question {n} of 5 · The programme keeps playing', select: 'Please select one answer', freeText: 'Your suggestion (optional, maximum 500 characters)', submit: 'Submit answers', next: 'Next', back: 'Back', cancel: 'Cancel', saving: 'Saving …', error: 'Saving was not confirmed. You can try again or cancel.', launch: 'Help shape the station'
  };
  const localizedCopy = {
    fr: { inviteTitle:'Voulez-vous nous aider à améliorer la radio ?', inviteCopy:'Cinq courtes questions sur la musique IA et nos émissions. La radio continue de jouer. Vous pouvez arrêter à tout moment.', privacyCopy:'Nous n’enregistrons vos réponses qu’à l’envoi, sans nom ni adresse e-mail. N’indiquez pas de données personnelles dans le champ libre.', privacy:'Informations de confidentialité', accept:'Oui, volontiers', later:'Peut-être plus tard', thanksTitle:'Merci de votre participation !', thanksCopy:'Vos réponses ont été enregistrées. Bonne écoute !', continue:'Continuer à écouter', question:'Question {n} sur 5 · La radio continue de jouer', select:'Choisissez une réponse', freeText:'Votre suggestion (facultatif, 500 caractères maximum)', submit:'Envoyer les réponses', next:'Suivant', back:'Retour', cancel:'Annuler', saving:'Enregistrement …', error:'Enregistrement non confirmé. Réessayez ou annulez.', launch:'Participer à la radio' },
    es: { inviteTitle:'¿Nos ayudas a mejorar la radio?', inviteCopy:'Cinco preguntas breves sobre música con IA y nuestros programas. La radio sigue sonando. Puedes cancelar en cualquier momento.', privacyCopy:'Solo guardamos las respuestas al enviarlas, sin nombre ni correo electrónico. No incluyas datos personales en el campo libre.', privacy:'Información de privacidad', accept:'Sí, claro', later:'Quizá más tarde', thanksTitle:'¡Gracias por participar!', thanksCopy:'Tus respuestas se han guardado. ¡Disfruta de la radio!', continue:'Seguir escuchando', question:'Pregunta {n} de 5 · La radio sigue sonando', select:'Elige una respuesta', freeText:'Tu sugerencia (opcional, máximo 500 caracteres)', submit:'Enviar respuestas', next:'Siguiente', back:'Atrás', cancel:'Cancelar', saving:'Guardando …', error:'No se confirmó el guardado. Puedes intentarlo de nuevo o cancelar.', launch:'Mejorar la radio' },
    it: { inviteTitle:'Ci aiuti a migliorare la radio?', inviteCopy:'Cinque brevi domande sulla musica AI e sui nostri programmi. La radio continua a suonare. Puoi interrompere in qualsiasi momento.', privacyCopy:'Salviamo le risposte solo quando le invii, senza nome o e-mail. Non inserire dati personali nel campo libero.', privacy:'Informazioni sulla privacy', accept:'Sì, volentieri', later:'Forse più tardi', thanksTitle:'Grazie per aver partecipato!', thanksCopy:'Le tue risposte sono state salvate. Buon ascolto!', continue:'Continua ad ascoltare', question:'Domanda {n} di 5 · La radio continua a suonare', select:'Scegli una risposta', freeText:'Il tuo suggerimento (facoltativo, massimo 500 caratteri)', submit:'Invia risposte', next:'Avanti', back:'Indietro', cancel:'Annulla', saving:'Salvataggio …', error:'Salvataggio non confermato. Puoi riprovare o annullare.', launch:'Contribuisci alla radio' },
    nl: { inviteTitle:'Help je ons de radio te verbeteren?', inviteCopy:'Vijf korte vragen over AI-muziek en onze programma’s. De radio blijft spelen. Je kunt altijd stoppen.', privacyCopy:'We slaan je antwoorden pas op wanneer je ze verstuurt, zonder naam of e-mailadres. Vul geen persoonsgegevens in het vrije tekstveld.', privacy:'Privacyinformatie', accept:'Ja, graag', later:'Misschien later', thanksTitle:'Bedankt voor je deelname!', thanksCopy:'Je antwoorden zijn opgeslagen. Veel luisterplezier!', continue:'Blijf luisteren', question:'Vraag {n} van 5 · De radio blijft spelen', select:'Kies één antwoord', freeText:'Jouw suggestie (optioneel, maximaal 500 tekens)', submit:'Antwoorden versturen', next:'Volgende', back:'Terug', cancel:'Annuleren', saving:'Opslaan …', error:'Opslaan niet bevestigd. Probeer opnieuw of annuleer.', launch:'Help de radio vormgeven' },
    pl: { inviteTitle:'Pomożesz nam ulepszyć radio?', inviteCopy:'Pięć krótkich pytań o muzykę AI i nasze audycje. Radio nadal gra. Możesz przerwać w każdej chwili.', privacyCopy:'Zapisujemy odpowiedzi dopiero po wysłaniu, bez imienia i e-maila. Nie wpisuj danych osobowych w polu tekstowym.', privacy:'Informacje o prywatności', accept:'Tak, chętnie', later:'Może później', thanksTitle:'Dziękujemy za udział!', thanksCopy:'Twoje odpowiedzi zostały zapisane. Miłego słuchania!', continue:'Słuchaj dalej', question:'Pytanie {n} z 5 · Radio nadal gra', select:'Wybierz jedną odpowiedź', freeText:'Twoja sugestia (opcjonalnie, maksymalnie 500 znaków)', submit:'Wyślij odpowiedzi', next:'Dalej', back:'Wstecz', cancel:'Anuluj', saving:'Zapisywanie …', error:'Zapis nie został potwierdzony. Spróbuj ponownie lub anuluj.', launch:'Współtwórz radio' },
    pt: { inviteTitle:'Ajuda-nos a melhorar a rádio?', inviteCopy:'Cinco perguntas breves sobre música de IA e os nossos programas. A rádio continua a tocar. Pode cancelar a qualquer momento.', privacyCopy:'Só guardamos as respostas quando as enviar, sem nome nem e-mail. Não inclua dados pessoais no campo de texto livre.', privacy:'Informações de privacidade', accept:'Sim, com prazer', later:'Talvez mais tarde', thanksTitle:'Obrigado pela participação!', thanksCopy:'As suas respostas foram guardadas. Boa audição!', continue:'Continuar a ouvir', question:'Pergunta {n} de 5 · A rádio continua a tocar', select:'Escolha uma resposta', freeText:'A sua sugestão (opcional, máximo 500 caracteres)', submit:'Enviar respostas', next:'Seguinte', back:'Voltar', cancel:'Cancelar', saving:'A guardar …', error:'A gravação não foi confirmada. Tente novamente ou cancele.', launch:'Ajude a criar a rádio' },
    sv: { inviteTitle:'Hjälper du oss att förbättra radion?', inviteCopy:'Fem korta frågor om AI-musik och våra program. Radion fortsätter spela. Du kan avbryta när som helst.', privacyCopy:'Vi sparar svaren först när du skickar dem, utan namn eller e-post. Skriv inga personuppgifter i fritextfältet.', privacy:'Integritetsinformation', accept:'Ja, gärna', later:'Kanske senare', thanksTitle:'Tack för din medverkan!', thanksCopy:'Dina svar har sparats. Trevlig lyssning!', continue:'Fortsätt lyssna', question:'Fråga {n} av 5 · Radion fortsätter spela', select:'Välj ett svar', freeText:'Ditt förslag (valfritt, högst 500 tecken)', submit:'Skicka svar', next:'Nästa', back:'Tillbaka', cancel:'Avbryt', saving:'Sparar …', error:'Sparandet bekräftades inte. Försök igen eller avbryt.', launch:'Hjälp till att forma radion' },
    da: { inviteTitle:'Vil du hjælpe os med at forbedre radioen?', inviteCopy:'Fem korte spørgsmål om AI-musik og vores udsendelser. Radioen spiller videre. Du kan afbryde når som helst.', privacyCopy:'Vi gemmer først svarene, når du sender dem, uden navn eller e-mail. Skriv ikke personoplysninger i fritekstfeltet.', privacy:'Oplysninger om privatliv', accept:'Ja, gerne', later:'Måske senere', thanksTitle:'Tak for din deltagelse!', thanksCopy:'Dine svar er gemt. God fornøjelse med lytningen!', continue:'Lyt videre', question:'Spørgsmål {n} af 5 · Radioen spiller videre', select:'Vælg ét svar', freeText:'Dit forslag (valgfrit, højst 500 tegn)', submit:'Send svar', next:'Næste', back:'Tilbage', cancel:'Annuller', saving:'Gemmer …', error:'Gemning ikke bekræftet. Prøv igen eller annuller.', launch:'Vær med til at forme radioen' },
    hr: { inviteTitle:'Hoćete li nam pomoći poboljšati radio?', inviteCopy:'Pet kratkih pitanja o AI glazbi i našim emisijama. Radio nastavlja svirati. Možete prekinuti u bilo kojem trenutku.', privacyCopy:'Odgovore spremamo tek kada ih pošaljete, bez imena ili e-pošte. Ne unosite osobne podatke u slobodno polje.', privacy:'Informacije o privatnosti', accept:'Da, rado', later:'Možda kasnije', thanksTitle:'Hvala na sudjelovanju!', thanksCopy:'Vaši odgovori su spremljeni. Ugodno slušanje!', continue:'Nastavi slušati', question:'Pitanje {n} od 5 · Radio nastavlja svirati', select:'Odaberite jedan odgovor', freeText:'Vaš prijedlog (neobavezno, najviše 500 znakova)', submit:'Pošalji odgovore', next:'Dalje', back:'Natrag', cancel:'Odustani', saving:'Spremanje …', error:'Spremanje nije potvrđeno. Pokušajte ponovno ili odustanite.', launch:'Pomozite oblikovati radio' }
  };
  const german = {
    inviteTitle: 'Hilfst du uns, die Sendung zu verbessern?', inviteCopy: 'Fünf kurze Fragen zu AI-Musik und unseren Sendungen. Deine Sendung läuft weiter. Du kannst jederzeit abbrechen.',
    privacyCopy: 'Wir speichern erst beim Absenden deine Antworten ohne Namen oder E-Mail auf unserem Server. Bitte nenne im Freitext keine persönlichen Daten.', privacy: 'Hinweise zum Datenschutz',
    accept: 'Ja, gerne', later: 'Vielleicht später', thanksTitle: 'Danke fürs Mitmachen!', thanksCopy: 'Deine Antworten wurden gespeichert. Viel Spaß beim Weiterhören!', continue: 'Weiterhören',
    question: 'Frage {n} von 5 · Die Sendung läuft weiter', select: 'Bitte eine Antwort auswählen', freeText: 'Dein Wunsch (freiwillig, maximal 500 Zeichen)', submit: 'Antworten absenden', next: 'Weiter', back: 'Zurück', cancel: 'Abbrechen', saving: 'Wird gespeichert …', error: 'Speichern nicht bestätigt. Du kannst erneut absenden oder abbrechen.', launch: 'Sendung mitgestalten'
  };
  let invited = false, step = -1, answers = [], requestId, dialog, previousFocus, pending = false;
  const read = (storage, k) => { try { return window[storage].getItem(k); } catch { return null; } };
  const write = (storage, k, value = '1') => { try { window[storage].setItem(k, value); } catch {} };
  const locale = () => read('localStorage', 'ai-radio-locale') || 'de';
  const copy = () => locale() === 'de' ? german : (localizedCopy[locale()] || english);
  const surveyQuestions = () => locale() === 'de' ? germanQuestions : englishQuestions;
  const el = (tag, text) => { const node = document.createElement(tag); if (text) node.textContent = text; return node; };
  function close() { dialog.close(); dialog.remove(); answers = []; previousFocus?.focus(); }
  function button(text, action) { const b = el('button', text); b.type = 'button'; b.addEventListener('click', action); return b; }
  function render() {
    const strings = copy();
    const questions = surveyQuestions();
    dialog.replaceChildren();
    const cancel = button(step === -1 ? strings.later : strings.cancel, close);
    const title = el('h2', step === -1 ? strings.inviteTitle : step === 5 ? strings.thanksTitle : questions[step][0]);
    title.id = 'listener-survey-title';
    dialog.append(title);
    if (step === -1) {
      dialog.append(el('p', strings.inviteCopy));
      dialog.append(el('p', strings.privacyCopy));
      const privacy = el('a', strings.privacy); privacy.href = '/datenschutz.html'; privacy.target = '_blank'; privacy.rel = 'noopener'; dialog.append(privacy);
      dialog.append(button(strings.accept, () => { step = 0; render(); }), cancel);
    } else if (step === 5) {
      dialog.append(el('p', strings.thanksCopy), button(strings.continue, close));
    } else {
      dialog.append(el('p', strings.question.replace('{n}', step + 1)));
      const form = el('form');
      let input;
      if (questions[step][1]) {
        const group = el('fieldset'); const legend = el('legend', strings.select); group.append(legend);
        questions[step][1].forEach((text, index) => {
          const label = el('label'); const radio = el('input'); radio.type = 'radio'; radio.name = 'answer'; radio.value = index; radio.required = true; radio.checked = answers[step] === index;
          label.append(radio, document.createTextNode(text)); group.append(label);
        }); form.append(group);
      } else {
        const label = el('label', strings.freeText);
        input = el('textarea'); input.maxLength = 500; input.rows = 4; input.value = answers[step] || ''; label.append(input); form.append(label);
      }
      const error = el('p'); error.setAttribute('role', 'alert');
      const next = el('button', step === 4 ? strings.submit : strings.next); next.type = 'submit';
      if (step > 0) form.append(button(strings.back, () => { if (pending) return; if (input) answers[step] = input.value; step--; render(); }));
      form.append(next, cancel, error); dialog.append(form);
      form.addEventListener('submit', async event => {
        event.preventDefault(); if (pending) return;
        answers[step] = input ? input.value.trim() : Number(new FormData(form).get('answer'));
        if (step < 4) { step++; render(); return; }
        pending = true; next.disabled = true; next.textContent = strings.saving;
        const controller = new AbortController(); const timeout = setTimeout(() => controller.abort(), 15000);
        try {
          const response = await fetch('/api/survey', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({id: requestId, version: 1, answers}), signal: controller.signal});
          if (!response.ok) throw new Error('Speichern nicht möglich. Bitte versuche es erneut.');
          write('localStorage', key); step = 5; if (dialog.isConnected) render();
        } catch { error.textContent = strings.error; }
        finally { clearTimeout(timeout); pending = false; next.disabled = false; next.textContent = strings.submit; }
      });
    }
    (dialog.querySelector('input, textarea, button'))?.focus();
  }
  function invite(manual = false) {
    if (dialog?.isConnected || pending) return;
    const lastInvite = Number(read('sessionStorage', laterKey));
    if (!manual && (invited || read('localStorage', key) || (lastInvite > 0 && Date.now() - lastInvite < cooldown))) return;
    step = -1; answers = [];
    requestId = Array.from(crypto.getRandomValues(new Uint8Array(16)), b => b.toString(16).padStart(2, '0')).join('');
    previousFocus = document.activeElement;
    dialog = el('dialog'); dialog.className = 'listener-survey'; dialog.setAttribute('aria-labelledby', 'listener-survey-title');
    dialog.addEventListener('cancel', event => { event.preventDefault(); close(); });
    document.body.append(dialog); render(); dialog.showModal(); dialog.querySelector('button')?.focus();
    invited = true; write('sessionStorage', laterKey, String(Date.now()));
  }
  window.addEventListener('ai-radio:playing', () => invite());
  function init() {
    const launch = button(copy().launch, () => invite(true));
    launch.className = 'listener-survey-launch';
    document.body.append(launch);
    const refreshLaunchLabel = () => { launch.textContent = copy().launch; };
    window.addEventListener('storage', event => { if (event.key === 'ai-radio-locale') refreshLaunchLabel(); });
    document.addEventListener('click', () => window.setTimeout(refreshLaunchLabel, 0), true);
    if (window.aiRadioPlaybackStarted) invite();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, {once: true});
  else init();
})();
