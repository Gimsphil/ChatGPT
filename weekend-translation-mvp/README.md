# Weekend Translation MVP

This workspace is for the weekend MVP of a real-time translation app.

Primary objective: build only the minimum working flow.

MVP flow:
1. Capture voice input.
2. Detect spoken language.
3. Decide target reply language automatically.
4. Output translated text.

Do not aim for a complete production app during this phase.

## Server D drive target

When running on the server, create and use exactly this folder:

```powershell
D:\weekend-translation-mvp
```

Use `scripts/bootstrap-server.ps1` as the first setup command.
