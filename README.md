# Arsell Sangalang — portfolio

A static, dependency-free site. No build step.

## Edit the content
Everything (intro, experience, skills, certifications, links) lives in `assets/js/data.js`.

- **Photo** (optional): add `assets/img/arsell.jpg` and set `photo` in `data.js`.
- **Email** (optional): set `email` in `data.js` to show an email button in the contact section.

After editing, bump the `?v=` number on the script/style tags in `index.html` so browsers fetch the new files.

## Run locally
```
python3 -m http.server 8000
```
Then open http://localhost:8000.

## Deploy
Vercel → Add New → Project → import this repo → Framework Preset **Other** → Deploy.
