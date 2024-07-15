docker build -t panel_dwa_zero_front .
docker run -p 5988:5988 -v $(pwd)/src:/usr/src/app/src -v $(pwd)/public:/usr/src/app/public --name panelfront panel_dwa_zero_front