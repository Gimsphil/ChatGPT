$Root = 'D:\weekend-translation-mvp'

New-Item -ItemType Directory -Force -Path $Root | Out-Null
New-Item -ItemType Directory -Force -Path "$Root\server" | Out-Null
New-Item -ItemType Directory -Force -Path "$Root\client" | Out-Null
New-Item -ItemType Directory -Force -Path "$Root\docs" | Out-Null

Write-Host "Workspace prepared at $Root"
