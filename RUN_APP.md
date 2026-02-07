# How to Run the App (Avoid 404)

The **dev server** often returns 404 because of file-watching limits. Use the **production build** instead.

## Steps (run in Terminal)

**1. Build the app**
```bash
cd "/Users/averallourenco/Desktop/Valentines day"
npm run build
```

**2. Start the server on port 8080**
```bash
npm run start:8080
```

**3. Open in your browser**
```
http://localhost:8080
```

---

## If port 8080 is already in use

Stop whatever is using it, or use a different port:

```bash
PORT=3007 npm start
```

Then open **http://localhost:3007**

---

## One-liner (after first build)

```bash
npm run start:8080
```

(Only works if you've already run `npm run build` at least once.)
