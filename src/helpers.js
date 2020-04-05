export default function debounce(a,b,c){
  var d,e;
  return function(){
    function h(){
      d= null;
      c || (e=a.apply(f,g));
    }
    var f=this,g=arguments;
    return (clearTimeout(d) , d=setTimeout(h,b),c&&!d&&(e=a.apply(f,g)),e)
  }
}

// The content inside of react-quill turns out as an html so basically we need to remote those html tags.
// to show the content at the left side bar.
export function removeHTMLTags (str) {
  return str.replace(/<[^>]*>?/gm, '');
};