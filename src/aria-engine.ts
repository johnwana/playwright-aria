import {
  getByRole as tlGetByRole,
  getAllByRole as tlGetAllByRole,
  ByRoleOptions,
} from "@testing-library/dom";

export function createAriaEngine() {
  // return the *ByRole functions
  function getByRoleFns(): { getByRole: typeof tlGetByRole, getAllByRole: typeof tlGetAllByRole } {
      if (!(window as any).TestingLibraryDom) {
        //@ts-ignore
        (() => { REPLACE_WITH_TESTING_LIBRARY })();
      }
      return {
        getByRole: (window as any).TestingLibraryDom.queries.getByRole,
        getAllByRole: (window as any).TestingLibraryDom.queries.getAllByRole,
      };
    }

  // parse the params passed to the role
  // currently only support /<regex of name>/
  const parseAriaParams = (params: string): ByRoleOptions => {
    const result: ByRoleOptions = {};
    if (params.startsWith('/')) {
      const lastSlashIndex = params.lastIndexOf('/');
      if (lastSlashIndex !== params.length - 1) {
        throw new Error(`Unsupported regexp modifier: ${params.substring(lastSlashIndex + 1)}`);
      }
      const regexpString = params.substring(1, lastSlashIndex);
      const regexp = new RegExp(regexpString, 'i');
      result.name = regexp;
    } else {
      throw new Error(`Unsupported aria engine params: ${params}`);
    }

    return result;
  }

  // parse the full selector
  // format is <role>(/<regex of name/)
  // where the regex is optional
  // ie. page.locator('aria=button(/done/)') or page.locator('aria=button')
  const parseSelector = (selector: string): { role: string, byRoleOptions: ByRoleOptions } => {
    let role;
    let byRoleOptions: ByRoleOptions = {};

    // see if we have an opening paren
    const firstParenIndex = selector.indexOf('(');
    if (firstParenIndex < 0) {
      // no? we're done
      role = selector;
    } else {
      // grab params in the parens
      role = selector.substring(0, firstParenIndex);
      if (selector[selector.length - 1] !== ')') {
        throw new Error(`Missing ending paren for selector ${selector}`);
      }

      // parse the params
      byRoleOptions = parseAriaParams(selector.substring(firstParenIndex + 1, selector.length - 1));
    }

    return { role, byRoleOptions };
  }

  return {
    query(root: HTMLElement, selector: string) {
      const byRoleFns = getByRoleFns();
      const { role, byRoleOptions } = parseSelector(selector);
      return byRoleFns.getByRole(root, role, byRoleOptions);
    },
  
    queryAll(root: HTMLElement, selector: string) {
      const byRoleFns = getByRoleFns();
      const { role, byRoleOptions } = parseSelector(selector);
      return byRoleFns.getAllByRole(root, role, byRoleOptions);
    }
  }
}