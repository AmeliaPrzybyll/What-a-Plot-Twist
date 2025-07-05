# What a Plot Twist!

Wymagania funkcjonalne:
- Możliwość opcjonalnej rejestracji użytkownika (aby można było zachować pytania dodane do puli użytkownika + 10 ostatnich wyników gier)
- Dodatkowo: Możliwość odzyskiwania hasła
- Konto użytkownika - możliwość logowania, modyfikacji (zdjęcie z ograniczoną wagą, nazwa użytkownika, zmiana hasła), usunięcia
- Możliwość wyboru jednej z czterech gier (prawda czy wyzwanie, nigdy przenigdy, czółko, czy to fake news)
- Pobieranie danych z AI do gier (np. stwierdzeń)
- Ograniczenie liczby graczy na grę do 8

Prawda czy wyzwanie:
- Możliwość dodania nicków graczy
- Wybór pomiędzy prawda czy wyzwanie
- Generowanie pytania/wyzwania przez chat lub z puli pytań użytkownika (+ ulubione)
- Możliwośc dodanie ulubionego pytania do swojej listy pytań, możliwość dodania pytań własnych (max 10 pytań w puli)
- Możliwość wylosowania innego pytania/wyzwania (wszyscy w danej rundzie muszą dostać pytanie/wyzwanie)
- Dodatkowa funkcjonalność: losowanie przy nowej turze użytkownika, który opowiada
- Możliwość zaliczenia bądź niezaliczenia zadania. Przed turą gracze ustalają "karę" za niewykonanie zadania
- Zakończenie gry poprzez wyjście z niej

Nigdy przenigdy:
- Losowanie stwierdzenia
- Przed turą gracze ustalają "karę" za niewykonanie zadania
- Zakończenie gry poprzez wyjście z niej

Czółko: (może inna nazwa?)
- Przed grą wybór kategorii, ilość rund, dodanie nicków graczy, określenie czasu na zgadnięcie (30sek, 60sek, 90sek)
- min 1 znak max 15 na nick
- Dodatkowa funkcjonalność Odliczanie 
- Pojawia się nick osoby, później następuje odliczanie i dopiero potem pokazuje się tekst i zaczynamy odliczać czas na zgadnięcie (zostaje tylko przycisk "niezaliczone")
- Są zbierane punkty dla użytkowników za zgadnięcie (tylko za zaliczone)
- Po przejściu wszystkich tur wyświetlają się wyniki gry

Fake news:
- Generowanie trzech sformułowań z czego tylko jedno jest poprawne. Jest ono zaznaczone dla osoby losującej.
- Zakończenie gry poprzez wyjście z niej

Wymagania niefunkcjonalne:
Link do figmy: https://www.figma.com/design/D0gBALGhZ5LXOT8bRwNOQr/Untitled?node-id=0-1&t=Ta8o2oXM0iuKH9yS-1

Przed uruchomieniem projektu upewnij się, że masz zainstalowane:
Visual Studio 2022 lub nowsze
z zaznaczonymi workloadami:
-ASP.NET and web development
-Node.js development
1. Sklonuj repozytorium.
2. Otwórz plik .sln w Visual Studio
3. W ustawieniach projektu startowego wybierz opcje "wiele startowych projektów" i ustaw start dla każdego.
4. Kliknij na What-a-Plot-Twist.Server prawym przyciskiem i ustaw jako projekt startowy.
5. Uruchom program.
