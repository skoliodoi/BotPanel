# Panel Front-End Primebot

Aplikacja front-endowa React.

## Uruchomienie projektu w środowisku developerskim:

### Lokalnie/natywnie:

```sh
npm run dev
```

### Docker:


1. Na Linuxie:
```sh
- docker_run.sh
```
- ewentualnie z linii poleceń:
```sh
docker build -t panel_dwa_zero_front .
docker run -p 5988:5988 -v $(pwd)/src:/usr/src/app/src -v $(pwd)/public:/usr/src/app/public --name panelfront panel_dwa_zero_front
```

2. Na Windowsie:

Przez PowerShell:
```sh
docker build -t panel_dwa_zero_front .
docker run -p 5988:5988 -v ${pwd}/src:/usr/src/app/src -v ${pwd}/public:/usr/src/app/public --name panelfront panel_dwa_zero_front
```

Strona uruchamia się pod adresem http://localhost:5988 - port 5988 jest o tyle istotny że jest już dodany do whitelisty w API i inne porty wywalają CORS error.


## Wymagana konfiguracja:


1. W ścieżce src/helpers należy utworzyć plik siteConfig.js i wkleić do niego wartości [zawarte pod tym linkiem](https://console.cloud.google.com/security/secret-manager/secret/panel-config/versions?project=kluczbork-vcc)

2. W celu dodania nowej podsekcji do panelu należy ją również dodać do listy w polu "sections" w siteConfig.js (jeżeli chcemy żeby była chroniona autoryzacją przez login/hasło). Przykładowo chcąc stworzyć nowy adres "panel.primebot.ai/**config**" należy dodać do listy wartość config a następnie dodać nową wersję tego pliku do Secret Managera, żeby zapewnić dostęp do najnowszej wersji konfiguracji.
