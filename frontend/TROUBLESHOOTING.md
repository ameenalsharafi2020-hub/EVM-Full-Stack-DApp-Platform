# 🔧 Mobile Wallet Connection Troubleshooting

## Problem: Mobile wallet not connecting

### Solution 1: Get Your Own WalletConnect Project ID

**IMPORTANT**: The default Project ID may not work reliably!

1. Go to https://cloud.walletconnect.com
2. Sign up for free
3. Create a new project
4. Copy your Project ID
5. Update `.env.local`:
   ```
   NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_actual_project_id_here
   ```
6. Restart the dev server: `npm run dev`

### Solution 2: Check Network Connection

1. Make sure both devices are on the internet
2. Try using mobile hotspot
3. Check firewall settings

### Solution 3: Test Different Wallets

Try these wallets:
- ✅ MetaMask Mobile
- ✅ Trust Wallet
- ✅ Rainbow Wallet
- ✅ Coinbase Wallet

### Solution 4: Clear Cache

**On Computer:**
```javascript
// Open browser console (F12) and run:
localStorage.clear();
sessionStorage.clear();
location.reload();
```

**On Mobile:**
- Clear app cache in wallet settings
- Restart wallet app

### Solution 5: Check QR Code

1. Scan QR code within 5 minutes
2. Make sure QR code is not blurry
3. Try increasing screen brightness
4. Use wallet's built-in scanner

### Solution 6: Debug Mode

1. Click the 🔧 button at bottom-right
2. Check if Project ID shows correctly
3. Verify connectors are loaded
4. Take screenshot and check console

### Solution 7: Local Network Access

If testing on local network:

1. Find your local IP:
   ```powershell
   ipconfig
   # Look for IPv4 Address (e.g., 192.168.1.100)
   ```

2. Access from mobile:
   ```
   http://YOUR_IP:3000
   # Example: http://192.168.1.100:3000
   ```

3. Make sure firewall allows port 3000

### Solution 8: Use ngrok for Testing

```bash
# Install ngrok
npm install -g ngrok

# Run your app
npm run dev

# In another terminal
ngrok http 3000

# Use the https URL provided by ngrok on mobile
```

## Common Error Messages

### "User rejected methods"
- ✅ Normal - user cancelled connection
- Just try connecting again

### "No matching key"
- ❌ Stale session
- Clear cache on both devices
- Refresh page

### "QR code expired"
- ⏰ Timeout (5 minutes)
- Click "Connect" again

### "Network error"
- 🌐 Check internet connection
- Try different network

## Still Not Working?

1. Check browser console for errors
2. Check mobile wallet app logs
3. Try a different browser
4. Update wallet app to latest version
5. Use the debug component (🔧 button)

## Test Checklist

- [ ] Got my own WalletConnect Project ID
- [ ] Updated .env.local file
- [ ] Restarted dev server
- [ ] Both devices have internet
- [ ] Wallet app is updated
- [ ] QR code scans successfully
- [ ] No firewall blocking
- [ ] Correct network selected in wallet