
const fetchHTML = (vurl) => {
  const response_html = fetch(vurl);
  return response_html;
};

class ElementHandler {
  element(element) {
    console.log(element);
    if (element.tagName == "h1") {
      element.setInnerContent("Hey, I am Abbas");
    }
    if (element.tagName == "p") {
      element.setInnerContent("Welcom to my Full-Stack Assignment, It was a lot of fun! Especially Extra Credits");
    }
    if (element.tagName == "a") {
      const attribute = element.getAttribute("href");
      element.setAttribute(
        "href",
        attribute.replace("cloudflare.com", "github.com/iam-abbas")
      );
      element.setInnerContent("Follow me on Github");
    }
  }
}

const htmlRewriter = new HTMLRewriter().on("*", new ElementHandler());

addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request));
});

/**
 * Respond with hello worker text
 * @param {Request} request
 */
async function handleRequest(request) {
  let index = Math.floor(Math.random() * 2)
  let getcookie = request.headers.get('cookie')
  if(getcookie) {
    index = Number(getcookie[getcookie.length-1])
  }
  const url = `https://cfw-takehome.developers.workers.dev/api/variants`;
  const variants = await fetch(url);
  const varJSON = await variants.json();
  const response = await fetchHTML(
    varJSON["variants"][index]
  );
  
  showPiece = await htmlRewriter.transform(response).body
  return new Response(showPiece, {
    headers: { 'Set-Cookie': `variant=${index}` },
  })
}
