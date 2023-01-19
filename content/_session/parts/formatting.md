<sub>Section 1</sub>
## General Formatting

[GitHub Markdown] syntax are supported including extras such as [Markdown Math].

### Supported Header Tags
Header tags from `h1` to `h6` are supported.
Though `<h1>` is the largest, it is recommended that you should start with `<h2>` for main general headings.

#### Bolded `h4` through `h6`
These levels the fonts are **bolded**.
Because of their smaller sizes, the bold type will make them stand out.

----

### Quotations

Quotations begin with a `>`. To separate the lines put a space between lines prefixed with `>` or use `<br/>`.

> Thus conscience does make cowards of us all.

> &mdash; Shakespeare

----

### Definition Lists

<dl>
  <dt>Definition List</dt>
  <dd>
    Use <code>&lt;dl&gt;</code> for lists without bullet or numbers
    <code>&lt;dt&gt;</code> for term or name of the definition.
    <code>&lt;dd&gt;</code> for definition.
  </dd>
  <dt>Ordered Lists</dt>
  <dd>
    Use a number followed by a period (<code>1.</code>) to make ordered lists (see below).
  </dd>
  <dt>Unordered Lists</dt>
  <dd>
    Use a <code>-</code> or <code>*</code> to make unordered lists. These types can be mixed.
  </dd>
</dl>

----

### Bullet and Number Lists

- First major
  - First minor
    - First macro
    - Second macro
  - Second minor
- Second major
  > Outside quote

  1. Numbered list under bullet
     1. Alpha under numbered
     2. Second alpha
        > Other quotes

  2. Second number
     > Quotations inside a list

  - Back to bullet


---

<sub>Section 2</sub>
## Special Formatting

Below are special formatting for AskClass Course Theme only.

### Hiding Texts

Use `<samp>` to <samp>hide text</samp>.

----

### Poems

Use <code>&lt;dl class='poem'&gt;</code> for poetry.
The definition will have a hanging indentation like example below.
_Note:_ You need to make the screen narrower to see the hanging indentation.

<dl class='poem'>
  <dt>Hamlet, Act III, Scene I</dt>
  <dd>To sleep: perchance to dream: ay, there's the rub;</dd>
  <dd>For in that sleep of death what dreams may come</dd>
  <dd>When we have shuffled off this mortal coil,</dd>
  <dd>Must give us pause: there's the respect</dd>
  <dd>That makes calamity of so long life;</dd>
</dl>

[Markdown Math]: https://acn.askclass.com/2022/06/20/markdown-math-support
[GitHub Markdown]: https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github
