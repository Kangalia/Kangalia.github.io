# HTML5 FOR WEB DESIGNERS

## THE HISTORY

It was the brainchild of Sir Tim. Inherited from the Standard Generalized 
Markup Language (SGML). First official specification, published by the 
Internet Engineering Task Force was HTML 2.0. The role of the IETF was 
superceded by the W3C, which published the HTML 4.01. The next revision was 
XHTML 1.0 (extensible HTML)
> The XHTML only allowed for tags to be written in small letters. There was 
browser support for CSS

Then there was XHTML 1.1 which couldn’t be served with a mime-type of text/html .

Then there was XHTML 2.0 which was not backward compatible with current content
> Web Hypertext Application Technology Working Group

### HTML5

There are two groups working on HTML5. The WHATWG is
creating an HTML5 specification using its process of “commit
then review.” The W3C HTML Working Group is taking that
specification and putting it through its process of “review then
commit.”
> Design principles of HTML5
>> - Support for previous content
   - Do not reinvent the wheel
   - Pave the cowpaths -> If it is not broken, do not fix it

Personally, I’m okay with the casual syntax of HTML5. I’ve
come to terms with having to enforce my own preferred writ-
ing style myself. But I would like to see more tools that would
allow me to test my markup against a particular style. In the
world of programming, these are called lint tools: programs
that flag up suspect coding practices. A lint tool for markup
would be different than a validator, which checks against a
doctype; but it would be wonderful if the two could be com-
bined into one lean, mean validating linting machine.

## DEPRECATED & *OBSOLETE* ELEMENTS

**DEPRECATED**, it's no longer used
**OBSOLETE**, it's not used in modern browsers but is used anyway for the 
sake of older browsers

Some of the obsolete elements include:

- frame
- frameset
- noframes
- acronym

Presentational elements such as font , big , center , and strike
are obsolete

Similarly, presentational attributes such as bgcolor ,
cellspacing , cellpadding , and valign are obsolete.

The big element is obsolete but the small element isn’t. This
apparent inconsistency has been resolved by redefining what
small means. It no longer has the presentational connotation,
“render this at a small size.” Instead, it has the semantic value,
“this is the small print,” for legalese, or terms and conditions.

The b element used to mean, “render this in bold.” Now it is
used for some text “to be stylistically offset from the normal
prose without conveying any extra importance.” If the text
has any extra importance, then the strong element would be
more appropriate.
Similarly, the i element no longer means “italicize.” It means
the text is “in an alternate voice or mood.” Again, the element
doesn’t imply any importance or emphasis. For emphasis, use
the em element.

The cite element has been redefined in HTML5. Where it
previously meant “a reference to other sources,” it now means
“the title of a work.”

In HTML5, you can wrap multiple elements in a single a
element:

`<a href="/about">
    <h2>About me</h2>
    <p>Find out what makes me tick.</p>
    </a>`
    
## RICH MEDIA

About there being many gaps in the web standards, calling for the use of 
plug-ins to complement these gaps

The use of the "canvas" element to create dynamic images so that when an 
image is served up to the browser it's contents can be dynamically updated
> Just specify within the opening tag the dimensions of the image
> The JavaScript: 
>> var canvas = document.getElementById('my-first-canvas');
>> var context = canvas.getContext('2d');
>> // specify that the stroke color should be red

>> context.strokeStyle = '#990000';

Every document on the web can be described with a Docu-
ment Object Model. This DOM can have many different
nodes, the most important of which are element nodes, text
nodes, and attributes. Those three building blocks are enough
to put together just about any document you can imagine.
The canvas element has no DOM. The content drawn within
canvas cannot be represented as a tree of nodes.
Screen readers and other assistive technology rely on having
access to a Document Object Model to make sense of a docu-
ment. No DOM, no access.