import { useEffect, useRef, useState } from "react";

/**
 * Sets the created ref to the `value` passed
 *
 * @remarks
 * After the initial call of this hook, the internal ref is set to the `value` passed to this hook after the component has rendered completely.
 * So the returned ref will not have the updated value while the component renders
 */
export function useRefSync<T>(value: T): React.MutableRefObject<T> {
  const res = useRef(value);
  res.current = value;
  return res;
}

/**
 * Custom React hook for managing and retrieving query parameters from the current URL.
 *
 * @returns {Record<string, string>} An object containing the query parameters where keys are parameter names and values are parameter values.
 *
 * @remarks
 * This hook parses the query parameters from the current URL and returns them as an object. It also removes the query parameters from the URL without affecting the browser history.
 * The returned object reflects the current query parameters after the component has rendered.
 */

export function useQueryParams(): Record<string, string> {
  const [queryParams, setQueryParams] = useState<Record<string, string>>({});

  useEffect(() => {
    const searchParams = new URL(window.location.href).searchParams;
    const params: Record<string, string> = {};

    searchParams.forEach((value, key) => {
      params[key] = value;
    });

    if (Object.keys(params).length > 0) {
      // Remove the query parameters from the URL without affecting the browser history
      const urlWithoutQueryParams = window.location.href.replace(
        window.location.search,
        ""
      );

      window.history.replaceState({}, document.title, urlWithoutQueryParams);
    }

    setQueryParams(params);
  }, []);

  return queryParams;
}
