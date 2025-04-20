# Move pages
#mkdir -p assets/app
#mv src/app/page.tsx assets/app/
#mv src/app/layout.tsx assets/app/

# Move global styles
mv app/globals.css assets/

# Remove redundant files
rm tailwind.config.ts
rm login*

# Optional: remove now-empty folders if you're not using them
rm -rf src/app
rm -rf app
