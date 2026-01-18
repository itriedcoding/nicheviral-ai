# 🔑 GET YOUR FREE API KEYS - COPY & PASTE GUIDE

## You don't need to install anything. Just get 2 free accounts.

---

## 🤗 HuggingFace Token

### Click this link:
👉 **https://huggingface.co/join**

### Fill out:
- Email: [your email]
- Username: [any username]
- Password: [any password]
- Click "Sign Up"

### Verify email (check inbox)

### Click this link:
👉 **https://huggingface.co/settings/tokens**

### Click "Create new token"
- Name: `Neura AI`
- Type: Select **"Read"**
- Click "Create token"

### Copy the token:
```
hf_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### Paste it here and run:
```bash
npx convex env set HF_TOKEN "hf_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
```

✅ **HuggingFace Done!**

---

## 🚀 Groq API Key

### Click this link:
👉 **https://console.groq.com/signup**

### Fill out:
- Email: [your email]
- Password: [any password]
- Click "Sign Up"

### Verify email (check inbox)

### Click "API Keys" in sidebar

### Click "Create API Key"
- Name: `Neura AI`
- Click "Create"

### Copy the key:
```
gsk_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### Paste it here and run:
```bash
npx convex env set GROQ_API_KEY "gsk_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
```

✅ **Groq Done!**

---

## ✅ Verify It Works

Run this to check:
```bash
npx convex env list
```

You should see:
```
HF_TOKEN: hf_***************
GROQ_API_KEY: gsk_***************
```

---

## 🎉 You're Done!

Now when you generate videos:
- They'll use **FREE** HuggingFace CogVideoX
- Text will use **FREE** Groq Llama 3.3
- Images will use **FREE** HuggingFace Flux
- Audio will use **FREE** StreamElements

**All FREE. No credit card. No hardware. No installation.**

---

## Troubleshooting

### "HF_TOKEN not working"
- Make sure you selected "Read" type when creating token
- Make sure you copied the full token (starts with `hf_`)
- Try creating a new token

### "GROQ_API_KEY not working"
- Make sure you verified your email
- Wait 1-2 minutes after creating account
- Try creating a new API key

### "Rate limited"
- This is normal for free tier
- System automatically falls back to Pollinations AI
- Wait 5-10 minutes and try again
- You can generate 10-20 videos per day

---

**Any issues? The system has automatic fallbacks. It will ALWAYS work.**
