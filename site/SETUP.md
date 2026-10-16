# Setup guide – Scientific Python Lab, Unit 3

Everything is done in the browser. Allow about 20 minutes the first time.

---

## Part A – Create the new Firebase project (10 min)

1. Go to **console.firebase.google.com** and sign in with **poojan.shah@rru.ac.in**.
2. Click **Create a project** (or **Add project**). Name it, for example, `scp-unit3`. Turn **Google Analytics off**. Click **Create project**, then **Continue**.

**Turn on Google sign-in**

3. Left menu → **Build → Authentication** → **Get started**.
4. **Sign-in method** tab → **Google** → switch **Enable** on → choose your email as the support email → **Save**.
5. **Settings** tab → **Authorized domains** → **Add domain** → type `poojan14.github.io` → **Add**.

**Create the database**

6. Left menu → **Build → Firestore Database** → **Create database**.
7. Choose location **asia-south1 (Mumbai)** → **Next** → **Start in production mode** → **Create**.
8. Open the **Rules** tab. Select everything in the editor and delete it. Open `firestore.rules` from the zip, copy all of it, paste it in, and click **Publish**.

**Get the web config**

9. Click the **gear icon** (top left) → **Project settings** → scroll to **Your apps** → click the **`</>`** (Web) icon.
10. App nickname: `scp-unit3` → **Register app**. Firebase shows a block of code with `firebaseConfig = { apiKey: "...", ... }`.
11. Open `config.js` from the zip in Notepad. Replace each `PASTE_...` value with the matching value from that block (apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId). Keep the quotes. Save.

---

## Part B – Put the site on GitHub (5 min)

1. On **github.com** (account **poojan14**) click **+ → New repository**. Name: `scp-unit3`, **Public**, **Create repository**.
2. Click **uploading an existing file** and drag in these files from the `site` folder:
   `index.html`, `teacher.html`, `content.js`, `config.js` (the one you edited), `roster_template.csv`, `README.md`.
3. Click **Commit changes**.
4. **Settings → Pages** → Branch **main**, folder **/(root)** → **Save**. After 1–2 minutes:
   - Student site: `https://poojan14.github.io/scp-unit3/`
   - Teacher page: `https://poojan14.github.io/scp-unit3/teacher.html`

---

## Part C – Before the first class (5 min)

1. Open the **teacher page** and sign in with poojan.shah@rru.ac.in.
2. **Roster** tab → upload your CSV. It needs a header row with these four columns:

   ```
   email,name,enrollment,class
   26mdsml003@student.rru.ac.in,Kavish Shah,26MDSML003,MTech DSML Sem 1
   ```
   You can export this from Excel with **File → Save As → CSV**. Check the preview – rows with problems (bad email, duplicates, empty cells) are shown in red and skipped – then click **Save … students to roster**.
3. **Topics** tab → all topics start **LOCKED**. When you reach a topic in class, switch **Open for students** on. Students see it within seconds.

### The three switches for each topic

| Switch | On | Off |
|---|---|---|
| **Open for students** | Students see the lessons and can submit | Topic hidden; no submissions possible |
| **Show correct / incorrect on Submit** | Students see right/wrong immediately and can fix and resubmit (practice mode) | **Exam mode** – answers are saved, results hidden |
| **Release results & solutions** | Students who final-submitted see their score and the reference solutions | Hidden |

---

## How students use it

1. Open the student site → **Sign in with Google** with their RRU email.
2. If their email is on the roster, they see a **Check your details** page (name, enrollment, class from your CSV) → tick the box → **Confirm and continue**. This happens only once.
3. Open topics show their lessons; locked topics show a lock.
4. In each lesson: theory → syntax table → runnable examples → practice quick checks → **marked tasks**.
5. Each task: **Run** (as often as they like) → **Submit answer** (saved; can be resubmitted until final).
6. **Final submit** (on each topic's Overview page and at the top of every lesson). They see how many tasks they submitted; blanks get 0. After final submission nothing can be changed.

Students who are not on the roster get “You are not on the class list”.

---

## Teacher page – what else it does

- **Students & marks**: live table of score per topic (F = final-submitted), totals, search, class filter, **Export marks CSV**.
  Click a name to see every task with the student's submitted code, and **Reopen** a topic for that student if needed.
- **Task analysis**: for each task, how many submitted and how many got it right – shows what to revise in class.
- **Roster**: add one student, remove a student, **Reset verification** (after correcting a wrong name/enrollment, the student confirms again on next sign-in; marks are kept), export the roster.
- You can also open the student site yourself: teacher accounts see every topic (even locked ones) in **preview mode**, with a **Check** button and solutions, but cannot submit.

To add another teacher: add the email (lower case) in `firestore.rules` → `isTeacher()` list → **Publish**, and to `TEACHERS` in `config.js` → upload config.js again.

---

## Troubleshooting

| What you see | Fix |
|---|---|
| Sign-in popup: *unauthorized domain* | Part A step 5 – add `poojan14.github.io` to Authorized domains |
| Teacher page: *Not authorised* | Rules not published (Part A step 8), or you signed in with another account |
| Student: *not on the class list* | Their email in the CSV differs from the Google account they used (check spelling / personal Gmail) |
| Student: *Could not save* on the verify page | Roster entry changed while they were verifying – ask them to reload |
| Answer *NOT saved* | Topic is locked or they already final-submitted |
| “Python: failed” | Campus network blocks `cdn.jsdelivr.net`; try another network |
| Page shows *Course content not found* | `content.js` is missing next to index.html in the repository |

## Notes

- Tasks are checked by Python running in the student's browser. The marks are a reliable record for class work, but a technically skilled student could tamper with them, so do not rely on them alone for high-stakes exams.
- Firebase's free plan (Spark) is enough for a class: 50,000 reads and 20,000 writes per day.
- First use of a topic downloads its library once (SciPy and statsmodels are the largest, a few MB each); it is cached afterwards.

## Editing content later

Lessons live in `source/c_scipy.js`, `c_statsmodels.js`, `c_sympy.js`, `c_networkx.js`. After editing, run `source/build.sh`
(needs Node and Python with numpy 2.0.2, pandas 2.2.3, scipy 1.14.1, statsmodels 0.14.4, sympy 1.13.3, networkx 3.4.2).
It checks every reference solution and writes a new `site/content.js`. Upload it to GitHub. Do not rename task IDs after
students have submitted, or their earlier answers will no longer be linked to the task.
