# GitHub Setup and Genuine Contribution Plan

This project copy is prepared for a clean shared GitHub repository.

## Important

Do not invent, backdate, or re-author old commits. Each member should make and test a real change that matches their actual project role, then commit that change from their own Git identity.

## 1. Create the shared repository

One group member creates a GitHub repository, for example `voyago-cw2`, and adds the other group members as collaborators.

## 2. Initialise this folder

```bash
git init
git branch -M main
git add .
git commit -m "Import current Voyago coursework project"
git remote add origin <YOUR-GITHUB-REPOSITORY-URL>
git push -u origin main
```

The person who performs the import should use their real Git identity.

## 3. Check each member's identity before committing

```bash
git config user.name
git config user.email
```

If needed, set the member's own details:

```bash
git config user.name "REAL NAME"
git config user.email "EMAIL LINKED TO THEIR GITHUB ACCOUNT"
```

## 4. Genuine member work

Only use the examples below when the member actually performs and tests that change.

### Pawan Kumar Gupta — HTML / pages / navigation
Possible genuine final checks or improvements:
- Review semantic HTML landmarks and headings on `index.html` and `about.html`.
- Fix navigation consistency or accessibility labels across pages.
- Verify internal links and page titles.

Example commit after a real change:
```bash
git add index.html about.html
git commit -m "Improve semantic HTML and navigation consistency"
git push
```

### Gaurav Shrestha — CSS / responsive design
Possible genuine final checks or improvements:
- Test 360px, 575px, 767px, 991px and desktop widths.
- Fix any overflow, spacing or component alignment problems.
- Review reduced-motion and focus-visible styles.

Example commit after a real change:
```bash
git add assets/css/
git commit -m "Improve responsive layout and component styling"
git push
```

### Umesh BK — JavaScript / jQuery
Possible genuine final checks or improvements:
- Test slider keyboard controls and autoplay behaviour.
- Test gallery/lightbox and FAQ accordion interactions.
- Verify dark-mode persistence and event handling.

Example commit after a real change:
```bash
git add assets/js/ assets/jquery/custom.jquery.js
git commit -m "Improve interactive JavaScript and jQuery behaviour"
git push
```

### Samrajya Dangi — forms / validation / localStorage
Possible genuine final checks or improvements:
- Test required fields, invalid email/phone, past travel date and traveller limits.
- Test booking history and localStorage behaviour.
- Improve form error messages or accessibility where needed.

Example commit after a real change:
```bash
git add booking.html contact.html assets/js/booking.js assets/js/validation.js assets/js/storage.js
git commit -m "Improve form validation and booking storage"
git push
```

## 5. Add the final GitHub URL to README.md

Replace the submission checklist placeholder with the real shared repository URL before creating the final ZIP.

## 6. Verify history

```bash
git log --pretty=format:"%h | %an <%ae> | %ad | %s" --date=short
```

The names shown here should reflect the people who genuinely made the recorded changes.
