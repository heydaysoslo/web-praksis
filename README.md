# ⚠ Legacy project ⚠

Upgrading to latest node and package versions is 💩. Would probably be quicker to migrate the project to Next/Sanity or similar.

# Get started
The rig runs smoothly on node 10.24.1.

You need to use a [node version manager](https://github.com/tj/n) to downgrade to node 10.24.1 before installing dependencies.

### Switch node version (example with n)
```
sudo n 10
```

### Install dependencies
```
yarn
```

### Run project
```
yarn start
```

### Make sure you switch back to the wanted node version after your work is done
```
sudo n latest
```

# Deploy
Auto-deploys on [Netlify](https://www.netlify.com/) when pushing to master