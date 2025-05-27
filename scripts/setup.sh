# Configures pre-push hook
echo 'Configuring pre-push hook...'
cp scripts/pre-push .git/hooks/pre-push
chmod ugo+x .git/hooks/pre-push
echo 'pre-push hook configured!'
echo 'Setup complete!'