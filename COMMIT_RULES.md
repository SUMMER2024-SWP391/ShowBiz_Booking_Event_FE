# COMMIT RULES

## Commit steps

- Do not commit directly to main
  - Can only go from your branch PR to main
  - Create a PR with a reviewer named Ms. Minh or Mr. Diep. After it is approved, it will be merged into main branch

1. Create branch `feature` | `document` from main

2. Commit the code to your `new branch`

3. Create a pull request from the your branch to `main`, tag and set a reviewer as a team member. At least 1 approval is required for 'Squash And Merge' to go into main

## Detailed commit and branch creation standards

### 1. Create a new `BRANCH` from develop

- Create a `new branch` from `main`

- Branch name must be in the form: `<category>/?<reference>/<description-in-kebab-case>`

  - In there:
    - category: `feature`, `bugfix`, `hotfix`, `refactor`, `style`, `test`, `document`
    - reference: `issue/ticket`, `pr`, `no-ref`
    - description-in-kebab-case: brief description of the changed content, lower case, separated by `-`

- Ex: `git branch feature/issue-42/create-new-button-component`
- Ex: `git branch bugfix/issue-342/button-overlap-form-on-mobile`
- Ex: `git branch bugfix/pr-42/fix-button-component`

### 2. `COMMIT` the code to the new branch

- Commit code to `new branch`

- The commit name must be in the form: `<category: do something; do some other things>`

  - In there:
    - category: `feat`, `fix`, `refactor`, `chore`

- `feat` is for adding a new feature
- `fix` is for fixing a bug
- `refactor` is for changing code for performance or convenience purpose (e.g. readability)
- `chore` is for everything else (writing documentation, formatting, adding tests, cleaning useless code etc.)

- Ex: `git commit -m "feat: add new button component; add new button components to templates"`
- Ex: `git commit -m 'fix: add the stop directive to button component to prevent propagation'`
- Ex: `git commit -m 'refactor: rewrite button component in TypeScript'`
- Ex: `git commit -m 'chore: write button documentation'`
