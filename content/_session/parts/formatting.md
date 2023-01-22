<sub>Section 1</sub>
## General Formatting

[GitHub Markdown] syntax are supported including extras such as [Markdown Math].

### Supported Header Tags
Header tags from `h1` to `h6` are supported.
Though `<h1>` is the largest, it is recommended that you should start with `<h2>` for main general headings.

#### Bolded `h4` through `h6`
These levels the fonts are **bolded**.
Because of their smaller sizes, the bold type will make them stand out.

###### Special `h6`
Last header is special, `<h6>` has a dark theme.

----

### Quotations

Quotations begin with a `>`. To add a line-break use `<br/>`.

> Thus conscience does make cowards of us all.
> <br/>&mdash; Shakespeare

Space them between a blank line to add a small gap:

> As the death-bed whereon it must expire
> <br/>Consumed with that which it was nourish’d by.

> This thou perceivest, which makes thy love more strong,
> <br/>To love that well which thou must leave ere long.


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

###### Sample
- Bullets begin either with a `-` or a `*`
  - Child bullets are indented aligned to the character after the space
    - Subsequent bullets are aligned the same way
      - 4th level bullet
  - You can mix numbered lists under a bullet
    1. This line has a prefix `1.`
       - This is a `-`
       1. This is a `1.`
       2. This is a `2.`

1. Numbered list

   To separate from above list, place an empty line in between.

2. With child lists

   Align blocks texts by indentation to the first character after the space.

   - This line starts with a `-`

   1. This line starts with a `1.`

      Note that it changes to a lowered-case character

      1. Greek alpha under numbered
      2. Second alpha

   2. Second enumerated alpha
      > Quotation

   - Back to bullet

     ```
     - code block
     ```

###### This Course Overview

1. __Segment 1__: _Theme's Overview_
   - Session 1: Syllabus & Course Overview
   - Session 2: AskClass Course Theme Intro
   - Assignment 1
     - Due Oct 7
     - Get AskClass Course Theme Running `part 1`

2. __Segment 2__: _Diving Deeper_
   - Session 3: Formatting Content (this page)
   - Assigment 2
     - <samp>Due Oct 16</samp>
     - Hosting Your Page on GitHub `part 2`
   - Quiz
     - <samp>Due Oct 17</samp>
     - Seek Knowledge & Gain Wisdom

3. __Segment 3__: _Conversations_
   1. Making Conversations
   2. Continuing the Dialog

<hr class='section' />

<sub>Section 2</sub>
## Special Formatting

Below are special formatting for AskClass Course Theme only.

### Hiding Texts

Use `<samp>` to <samp>hide text</samp>.

### Separator Lines

We support `----` for separators but also have 2 additional special classes: `section` and `logo`.

###### Section Separator

```
<hr class="section" />
```

Using the above code will create an ornate separator as you see between sections 1 & 2 above.

###### Logo Separator

```
<hr class="logo" />
```

Similar to above separator but places your logo in the center.
You can customize this image by modifying `_sass/init.scss`:

```
$icon-logo:             url('/assets/logo-icon.svg');
```

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

----

### Blocks of Texts

Normal code block will not wrap `white-space`.
```
<html>
  <head>
    <title>AskClass Theme</title>
  </head>
  <body>
    Welcome friend!
  </body>
</html>
```

If you want to wrap `white-space` use `<pre>`:

<pre>
In me thou see’st the glowing of such fire \ That on the ashes of his youth doth lie, \ As the death-bed whereon it must expire \ Consumed with that which it was nourish’d by.
</pre>

<hr class='logo' />

[Markdown Math]: https://acn.askclass.com/2022/06/20/markdown-math-support
[GitHub Markdown]: https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github
