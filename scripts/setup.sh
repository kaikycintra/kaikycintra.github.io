# Configures pre-push hook
echo 'Configuring pre-push hook...'
cp scripts/pre-push .git/hooks/pre-push
chmod ugo+x .git/hooks/pre-push
echo 'pre-push hook configured!'

echo 'Configuring Live Server...'
mkdir -p .vscode
touch .vscode/settings.json
echo '{
  "liveServer.settings.file": "index.html"
}' > .vscode/settings.json
echo 'Setup complete!'