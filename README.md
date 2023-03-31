# Final Solution Instructions

## Requirements
- Docker
- Terminal

### Execution

Open two terminals and navigate to this directory on both.

### First Terminal

Run one of the following commands

```bash
(cd development-visualizer && docker build -t front-end .)
```
Sudo version:

```bash
(cd development-visualizer && sudo docker build -t front-end .)
```

Next, either run it in detached mode with -d or interactive terminal mode with -it
and specifiy a free port on your network mapped to the docker port 8080.

example: (cd development-visualizer && docker run [-d | -it] -p 5173:8080 front-end)

```bash
(cd development-visualizer && docker run [-d | -it] -p <Free port on your network>:8080 front-end)
```
Sudo version:
```bash
(cd development-visualizer && sudo docker run [-d | -it] -p <Free port on your network>:8080 front-end)
```


### Second Terminal

Run one of the following commands

```bash
(cd server && docker build -t back-end .)
```
Sudo version:

```bash
(cd server && sudo docker build -t back-end .)
```
Next, either run it in detached mode with -d or interactive terminal mode with -it\
\
**_NOTE:_**  This has to be 3000:3000 because the front-end checks `http://localhost:3000/api/products` for the data.

```bash
(cd server && docker run [-d | -it] -p 3000:3000 back-end)
```
Sudo version:
```bash
(cd server && sudo docker run [-d | -it] -p 3000:3000 back-end)
```

### Web Application Location
Go to this location to load the web application
```bash
http://localhost:<Your Specified Port>/
```

