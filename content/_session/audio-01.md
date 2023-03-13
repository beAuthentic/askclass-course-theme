---
---

<hr class='section' />

## Play Audio

Include an `audio` field in your `_data/sessions.yml` to add audio to top of content:

<pre>
...
audio:
  - /assets/music-1.mp3
  - /assets/speech-2.ogg
</pre>

To add audio file on-demand use:

<pre>
{&#37; include session/audio.html audio='/assets/music.mp3' &#37;}
</pre>

<hr class='logo' />
