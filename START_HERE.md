# How to Run the Valentine's Day Quiz

## Step 1: Open Terminal

**On Mac:**
- Press `Cmd + Space` (Command + Spacebar)
- Type "Terminal"
- Press Enter

You'll see a window with a command prompt that looks like:
```
your-name@your-computer ~ %
```

## Step 2: Navigate to Your Project

Copy and paste this command, then press Enter:

```bash
cd "/Users/averallourenco/Desktop/Valentines day"
```

You should see the prompt change to show you're in that directory.

## Step 3: Build and Start the App

Run these two commands **one at a time** (wait for each to finish):

**First command:**
```bash
npm run build
```
Wait for this to finish (you'll see "✓ Compiled successfully" and route information).

**Second command:**
```bash
npm start
```
Wait for it to say "Ready" and show a URL like `http://localhost:3000`

## Step 4: Open in Browser

Once you see "Ready", open your web browser and go to:
```
http://localhost:3000
```

## Troubleshooting

**If you get "command not found":**
- Make sure you're in the right directory (use `pwd` to check)
- Make sure Node.js is installed (run `node --version` to check)

**If port 3000 is in use:**
- The server will automatically try port 3001, 3002, etc.
- Check the terminal output for the actual URL

**To stop the server:**
- Press `Ctrl + C` in the terminal

**To start over:**
- Close the terminal and start from Step 1
