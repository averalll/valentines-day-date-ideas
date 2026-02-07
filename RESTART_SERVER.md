# Server Restart Instructions

The dev server needs to be restarted with the new configuration.

**Please do the following:**

1. **Stop the current dev server** (if it's running)
   - Press Ctrl+C in the terminal where it's running
   - Or close that terminal window

2. **Start it again:**
   ```bash
   npm run dev
   ```

3. **Wait for it to say "Ready"** (should take a few seconds)

4. **Visit the URL it shows** (likely http://localhost:3000 or 3001)

The new configuration uses polling instead of native file watching, which should fix the EMFILE errors and allow Next.js to properly detect the app directory.

**Alternative: Use Production Build**
If dev server still doesn't work, you can use:
```bash
npm run build
npm start
```
Then visit http://localhost:3000
