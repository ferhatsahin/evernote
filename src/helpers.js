// The content inside of react-quill turns out as an html so basically we need to remote those html tags.
// to show the content at the left side bar.
export function removeHTMLTags (str) {
  return str.replace(/<[^>]*>?/gm, '');
};