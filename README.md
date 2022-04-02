# Playwright Aria

Exposes the [`ByRole`](https://testing-library.com/docs/queries/byrole) functions from [Testing Library](https://testing-library.com/) for Playwright.

## Currently supports
- role
- name by regex

## Get started
- Install the package: `npm i -D playwright-aria`
- Look at the files in the test directory for examples. Roughly it's:
  - import the package: `import createAriaEngine from 'playwright-aria';`
  - install the engine: `await selectors.register('aria', createAriaEngine, { contentScript: false });`
    - Note: I often do this in [`test.beforeAll`](https://playwright.dev/docs/api/class-test#test-before-all)
  - use it in a test: `await expect(page.locator('aria=button(/test button/)')).toBeVisible();`

## Examples
- `page.locator('aria=button')  // find all elements with the role "button"`
- `page.locator('aria=button(/test button/)')   // find the element with the role "button" and the name matches the regex /test button/i (all regex are case insensitive for now)`
