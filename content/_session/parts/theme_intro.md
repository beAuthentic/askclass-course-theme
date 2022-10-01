## Theme Introduction

Using the AskClass Course Theme helps you organize your study material
and host it for free using GitHub Pages.

## File Structure

```
/
│   index.html
│   _config.yml (edit this file)
│   404.html (optional)
│   pwabuilder-sw.js (optional)
│
└── _data/
│   │   course.yml
│   │   syllabus.yml
│   │   sessions.yml
│   │   ...
│   │
└── content/
│   │
│   └── _segment/
│   │   │   week-01.md *
│   │   │   week-02.md *
│   │   │   ...
│   │
│   └── _session/
│   │   │   session-01.md *
│   │   │   assignment-01.md *
│   │   │   quiz-01.md  *
│   │   │   ...
│   │   │
│   │   └── parts/ (optional)
│   │   │   │   overview.md *
│   │   │   │   grading.md *
│   │   │   │   theme_intro.md *
│   │   │   │   ...
```

<small>
`*` Denotes example filenames.
You can use different filenames to organize your content accordingly.
</small>

### `_data` Folder

This folder contains all the meta information about the course.

#### `course.yml`

Key           | Description
:---:         | :---
`id`          | Class ID (e.g. `AC 101`)
`session_tag` | A unit indicating a module or a lesson
`segments`    | How is the course divided (e.g. by week). Segment tag correspond to files in `content/_segment` folder

#### `syllabus.yml`

Key       | Description
:---:     | :---
`title`   | Name of this segment (e.g `Week 1`)
`segment` | Header tag (for index page) and sequence number
`begin`   | When this segment begins
`end`     | When the segment end
`theme`   | Color from `c1` to `c10`
`items`   | List the sessions correspond to `_data/sessions.yml`. Sessions are files in `content/_session` folder

#### `sessions.yml`

Key         | Description
:---:       | :---
`segment`   | Which segment does this session belong to (see `course.yml` above)
`title`     | The title of this session
`icon`      | Icon on the index page (see [Material Symbols] for details)
`header`    | Header for the session usually part of a series (e.g. `Session 1`)
`sequence`  | A sequence number
`url`       | Link to the content of this session
`videos`    | Arrray of YouTube video IDs to render at the top of the session

### `content/_segment` Folder

This folder contain files that correspond to the naming conventions given in `course.yml` configuration file.
These files are used to group sessions into collections.
To add a session to a segment, specify the `segment` value in `sessions.yml` file.
`syllabus.yml` contains information about all the segments.

### `content/_session` Folder

Store your course content in this folder.
Reference them in the `sessions.yml` data file.
You can create a `parts` folder and store fragments of contents there and use `include_relative`
to add them to form a session like how this tutorial is made.

----

Now let's try to put all this together into a project.
On to your first assignment!

[Material Symbols]: https://fonts.google.com/icons?query=bin&icon.style=Outlined&icon.set=Material+Symbols&icon.platform=web
