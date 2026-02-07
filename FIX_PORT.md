# Fix: Port 3000 Already in Use

## Quick Fix Commands

Run these commands **one at a time** in Terminal:

**1. Kill whatever is using port 3000:**
```bash
lsof -ti:3000 | xargs kill -9
```

**2. If that doesn't work, try this:**
```bash
killall -9 node
```

**3. Then start the server again:**
```bash
npm start
```

**4. If port 3000 is still busy, use a different port:**
```bash
PORT=3001 npm start
```
Then visit: http://localhost:3001
